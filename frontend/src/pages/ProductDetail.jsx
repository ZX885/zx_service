import "./css/productdetail_style.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    const buyProduct = async () => {
        try {
            await api.post("/orders/create/", {
                product_id: productId,
            });
            alert("Заказ создан!.")
        }
        catch (e) {
            alert("Ошибка при покупке");
            console.error(e.response?.data);
        }
    };

    useEffect(() => {
        api.get(`/products/${productId}/`)
            .then(res => {
                console.log("PODUCT DATA", res.data);
                setProduct(res.data)
            })
            .catch(err => console.error(err));
    }, [productId]);

    if (!product) return <p>Загрузка товара...</p>

    return (
        <div>
            <h2>Товар</h2>
            <div className="pr-detail">
                <div>
                    <img className="product-img" src={product.image} alt="" />
                </div>
                <div>

                    <p id="price"><b>{product.price}</b></p>

                    <button onClick={buyProduct}>
                        Купить
                    </button>

                    <p><b>Описание: </b>{product.description}</p>
                    <p><b>Продавец: </b>{product.seller}</p>

                    <h3>Характеристики</h3>

                    <ul>
                        {product.attribute_values?.length > 0 ? (
                            product.attribute_values.map(attr => (
                                <p key={attr.id}>
                                    <b>{attr.attribute}</b>: {attr.value}
                                </p>
                            ))
                        ) : (
                            <p>Атрибутов нет</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}