import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function SellerProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        api.get(`/products/seller/products/${productId}/`)
            .then(res => setProduct(res.data))
            .catch(err => {
                console.error(err);
                alert("Товар не найден");
                navigate("/profile/products");
            })
            .finally(() => setLoading(false));
    }, [productId, navigate]);

    if (loading) return <p>Загрузка...</p>;
    if (!product) return <p>Товар не найден</p>;

    return (
        <div>
            <h2>Мой товар</h2>

            <img src={product.image} alt="" style={{width: "900px"}} />

            <p><b>Цена:</b> {product.price}</p>
            <p><b>Описание:</b> {product.description}</p>

            <h3>Атрибуты</h3>
            {product.attribute_values.length === 0 ? (
                <p>Атрибутов нет</p>
            ) : (
                product.attribute_values.map(attr => (
                    <p key={attr.id}>
                        {attr.attribute}: {attr.value}
                    </p>
                ))
            )}

            <button onClick={() => navigate(`/products/${productId}/edit`)}>
                Редактировать
            </button>
        </div>
    );
}