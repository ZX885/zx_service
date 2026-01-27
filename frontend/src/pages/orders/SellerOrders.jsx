import "./sellerorders.scss"
import { useEffect, useState } from "react";
import { getSellerOrders, sellerConfirmOrder } from "../../api/orders";

export default function SellerOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getSellerOrders().then(res => setOrders(res.data));
    }, []);

    const confirm = async (id) => {
        await sellerConfirmOrder(id);
        setOrders(o =>
            o.map(order =>
                order.id === id
                    ? { ...order, status: "Подтверждение продавца" }
                    : order
            )
        );
    };

    return (
        <div>
            <h2>Мои Заказы</h2>
            <div className="orders">
                {orders.map(order =>(
                    <div key={order.id} className="orders-card">
                        <p><b>{order.product.title}</b></p>
                        <p>Покупатель: {order.buyer_username}</p>
                        <p>Цена: {order.price}</p>
                        <p>Статус: {order.status}</p>

                        {order.status === "Ожидание" &&(
                            <button onClick={() => confirm(order.id)}>
                                Подтвердить выполнение
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

}