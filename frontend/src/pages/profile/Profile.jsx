import "../css/profile.scss"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [balance, setBalance] = useState(0)
    const [tab, setTabs] = useState("active")


    // useEffect(() =>{
    //     api.get(`/products/my/?status=${tab}`)
    // }, [tab])
    useEffect(() => {
        
        api.get("/users/profile/")
            .then(res => setUser(res.data))
            .catch((err) => {
                alert("Не авторизован!")
                console.error(err);
            })

        api.get(`/users/balance/`)
            .then(res => setBalance(res.data))

        api.get("/products/my/products/")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, []);

    

    if (!user) return <p>Загрузка...</p>

    return (
        <div>
            <h2>Профиль</h2>
            <div className="profile-box">
                {balance && (
                    <div className="balance-box">
                        <p><b>Баланс:</b> {balance.balance} </p>
                        <p>В сделках:{balance.frozen_balance} </p>
                    </div>
                )}
            </div>

            <hr />

            <div className="profile-actions">
                <button disabled>💳 Пополнить (скоро)</button>
                <button disabled>⚙️ Настройки (скоро)</button>
            </div>
            <div className='profile'>
                <div className="profile-img">
                    <img src={user.image} alt="" />
                </div>
                <div className="profile-detail">
                    <p>Имя: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
            <div>
                <Link to='/profile/settingss'>
                    ⚙️Настройки
                </Link>
            </div>

            <hr />
            {/* {products.length === 0 && <p>У вас пока нет товаров</p>}
            <div className="products">
                {products.map(p => (
                    <div key={p.id} className="product">
                        <Link to={`/seller/products/${p.id}`}>
                            <img className="product-img" decoding="async" src={p.image} alt="" />
                            <b>{p.title}</b>
                        </Link>
                        <p>Цена: {p.price}</p>
                        <p>Описание: {p.description}</p>
                        <button onClick={() => deleteProduct(p.id)}>Удалить</button>
                        <Link to={`/products/${p.id}/edit`}> Редактировать</Link>
                    </div>
                ))}
            </div> */}
            <div>
                <nav>
                    <Link to={"products"}>Мои товары</Link>
                    <Link to={"purchases"}>Мои покупки</Link>
                </nav>

                <Outlet />
            </div>
        </div>
    )
}