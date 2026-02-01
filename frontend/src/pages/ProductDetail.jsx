import "./css/productdetail_style.scss"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const navigrate = useNavigate()
    const [balance, setBalance] = useState(0)
    
    useEffect(() => {
        api.get(`/products/${productId}/`)
        .then(res => {
            console.log("PODUCT DATA", res.data);
            setProduct(res.data)
        })
        .catch(err => console.error(err));
    }, [productId]);
    useEffect(() =>{
        api.get("users/balance/")
            .then(res => setBalance(Number(res.data.balance)))
    }, [])
    
    const canBuy = balance >= Number(product.price)
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

                    {/* <button onClick={() => navigrate(`/products/${product.id}/buy/`)}>
                        Купить
                    </button> */}
                    <button
                    className="buy-btn"
                        disabled={!canBuy}
                        onClick={() => navigrate(`/products/${product.id}/buy`)}
                    >
                        {canBuy ?"Купить" :"Недостаточно средств"}
                    </button>


                    <p><b>Название: </b>{product.title}</p>
                    <p><b>Описание: </b>{product.description}</p>
                    <p><b>Продавец: </b>{product.seller_username}</p>

                    <h3>Характеристики</h3>

                    <ul>
                        {product.attribute_values && product.attribute_values.length > 0
                            ? product.attribute_values.map(attr => (
                                <li key={attr.id}>
                                    <b>{attr.attribute_name}</b>: {attr.value}
                                </li>
                            ))
                            : [<li key="no-attrs">Атрибутов нет</li>]
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}