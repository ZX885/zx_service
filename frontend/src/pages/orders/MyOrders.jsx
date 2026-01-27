// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function MyOrders() {
//     const [orders, setOrders] = useState([]);

//     useEffect(() =>{
//         api.get("/orders/my/")
//         .then(res => setOrders(res.data))
//         .catch(console.error);
//     }, [])

//     return (
//         <div>
//             <h2> Мои Заказы</h2>

//             {orders.map(o =>(
//                 <div key={o.id}>
//                     <img src={o.image} alt="" />
//                     <p>Товар: {o.product}</p>
//                     <p>Цена: {o.price}</p>
//                     <p>Статус: {o.status}</p>
//                 </div>
//             ))}

//         </div>
//     );

// }
import "./myorder.scss"
import { useEffect, useState } from "react";
import { getMyOrders, buyerConfirmOrder } from '../../api/orders.js'

export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders().then(res => setOrders(res.data));
    }, []);

    const confirm = async (id) => {
        await buyerConfirmOrder(id);
        setOrders(o =>
            o.map(order =>
                order.id === id
                    ? { ...order, status: "Завершён" }
                    : order
            )
        )
    };

    return (
        <div>
            <h2>Мои покупки</h2>
            <div className="order-container">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <p><b>{order.product_title}</b></p>
                        <p>Цена: {order.price}</p>
                        <p>Статус: {order.status}</p>
                        
                        {order.status === "Продавец подтвердил" && (
                            <button onClick={() => confirm(order.id)}>
                                Подтвердить получение
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

}