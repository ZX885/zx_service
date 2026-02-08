import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
// import ProductCard

export default function MyProducts() {
    const [tab, setTabs] = useState("active");
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        api.get(`/products/my/products/?status=${tab}`)
            .then(res => setProducts(res.data))
            .finally(() => setLoading(false));
    }, [tab])


    const deleteProduct = async (id) => {
        if (!window.confirm("Удалить товар?")) return;
        await api.delete(`/products/${id}/delete`);
        setProducts(products.filter(p => p.id !== id));
    }

    return (
        <div>
            <h2>Мои товары</h2>
            <div>
                <button onClick={() => setTabs("active")}>
                    Активные
                </button>
                <button onClick={() => setTabs("sold")}>
                    Завершённые
                </button>
            </div>

            {loading && <p>Загрузка...</p>}
            {!loading && products.length === 0 && <p>Товаров нет</p>}

            <div className="product-wrapper">
                {products.map(p => (
                    <div className="products">

                        <div key={p.id} className="product">
                            <Link to={`/seller/products/${p.id}`}>
                                <img className="product-img" decoding="async" src={p.image} alt="" />
                            </Link>
                            <b className="price">{p.price}</b>
                            <b>{p.title}</b>
                            <div className="product-settings">
                                <button onClick={() => deleteProduct(p.id)}>Удалить</button>
                                <Link to={`/products/${p.id}/edit`}> Редактировать</Link>
                            </div>
                        </div>

                    </div>
                ))}
            </div>


        </div>
    )

}