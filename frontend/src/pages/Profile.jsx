import "./css/profile.scss"
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/users/profile/")
            .then(res => setUser(res.data))
            .catch((err) => {
                alert("Не авторизован!")
                console.error(err);
            })

        api.get("/products/my/")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, []);

    const deleteProduct = async (id) => {
        if (!window.confirm("Удалить товар?")) return;
        await api.delete(`/products/${id}/delete`);
        setProducts(products.filter(p =>p.id !== id));
    }

    if (!user) return <p>Загрузка...</p>

    return (
        <div>
            <h2>Профиль</h2>
            <h3>Баланс</h3>
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
            <h3>Мои товары </h3>

            {products.length === 0 && <p>У вас пока нет товаров</p>}
            <div className="products">
                {products.map(p => (
                    <div key={p.id} className="product">
                        <Link to={`/products/${p.id}`}>
                            <img className="product-img" decoding="async" src={p.image} alt="" />
                            <b>{p.title}</b>
                        </Link>
                        <p>Цена: {p.price}</p>
                        <button onClick={()=>deleteProduct(p.id)}>Удалить</button>
                        <Link to={`/products/${p.id}/edit`}> Редактировать</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}