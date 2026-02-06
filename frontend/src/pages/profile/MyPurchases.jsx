import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyPurchases() {
    const [tab, setTabs] = useState("active")
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        setLoading(true);
        api.get(`/orders/my/purchases/?status=${tab}`)
            .then(res => setOrders(res.data))
            .finally(() => setLoading(false));
    }, [tab]);

    return(
        <div>
            <h2>Мои покупки</h2>
            
            <div>
                <button onClick={() =>setTabs("active")}>
                    Активные
                </button>
                <button onClick={() => setTabs("sold")}>
                    Завершённые
                </button>
            </div>

            {loading && <p>Загрузка...</p>}
            {!loading && orders.length ===0  && <p>Покупок нет </p>}

            {orders.map(order =>(
                <div key={order.id}>
                    <p><b>{order.product_title}</b></p>
                    <p>Цена: {order.price}</p>
                    <p>Статус: {order.status}</p>
                    <hr />
                </div>
            ))}
        </div>
    )

}