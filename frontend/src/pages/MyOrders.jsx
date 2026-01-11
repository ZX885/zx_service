import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        api.get("/orders/my/")
        .then(res => setOrders(res.data))
        .catch(console.error);
    }, [])

    return (
        <div>
            <h2> Мои Заказы</h2>

            {orders.map(o =>(
                <div key={o.id}>
                    <img src={o.image} alt="" />
                    <p>Товар: {o.product}</p>
                    <p>Цена: {o.price}</p>
                    <p>Статус: {o.status}</p>
                </div>
            ))}

        </div>
    );

}