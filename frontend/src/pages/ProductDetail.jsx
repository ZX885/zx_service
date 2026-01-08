import "./css/productdetail_style.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const buyProduct = async ()=>{
        try{
            await api.post("orders/create/", {
                productId:productId
            });
            alert("Заказ создан!.")
        }
        catch(e){
            alert("Ошибка при покупке");
        }
    };

    useEffect(() => {
        api.get(`/products/${productId}`)
            .then(res => setProduct(res.data))
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
                        {product.attributes.map((attr, i) => (
                            <li key={i}>
                                {attr.name}: {String(attr.value)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

//     return (
//     <div style={{ display: "flex", gap: 40 }}>
//       <img
//         src={product.image}
//         alt=""
//         style={{ width: 400, borderRadius: 12 }}
//       />

//       <div>
//         <h2>{product.description}</h2>
//         <h3>{product.price} ₸</h3>
//         <p>Продавец: {product.seller}</p>

//         <h4>Характеристики</h4>
//         <ul>
//           {product.attributes.map(attr => (
//             <li key={attr.id}>
//               <b>{attr.attribute_name}:</b> {attr.value}
//             </li>
//           ))}
//         </ul>

//         <button style={{ padding: 12, fontSize: 16 }}>
//           Купить
//         </button>
//       </div>
//     </div>
//   );
}