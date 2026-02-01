import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";


export default function PurchaseProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(true);

    // Загружаем товар + поля покупателя
    useEffect(() => {
        Promise.all([
            api.get(`/products/${id}/`),
            api.get(`/orders/attributes/${id}/`)
        ])
            .then(([productRes, attrRes]) => {
                setProduct(productRes.data);
                setAttributes(attrRes.data);

                const initialValues = {};
                attrRes.data.forEach(attr => {
                    if (attr.required) {
                        initialValues[attr.id] = "";
                    }
                });
                setValues(initialValues)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    // Обработка изменений
    const handleChange = (attrId, value) => {
        setValues(prev => ({
            ...prev,
            [attrId]: value
        }));
    };

    //  Сабмит
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔴 ПРОВЕРКА REQUIRED
        for (const attr of attributes) {
            if (attr.required) {
                const val = values[attr.id];

                if (
                    val === undefined ||
                    val === null ||
                    val === ""
                ) {
                    alert(`Поле "${attr.name}" обязательно`);
                    return;
                }
            }
        }

        const attributeValuesArray = Object.entries(values).map(
            ([attrId, value]) => ({
                attribute: Number(attrId),
                value: String(value),
            })
        );

        try {
            await api.post("/orders/create/", {
                product_id: id,
                attribute_values: attributeValuesArray
            });

            alert("Заказ создан!");
            navigate("/orders/my");
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Ошибка при покупке!");
        }
    };



    if (loading) return <p>Загрузка...</p>
    if (!product) return <p>Товар не найден</p>

    return (
        <div>
            <h2>Покупка товара</h2>
            <h3>{product.title}</h3>
            <h3>{product.description}</h3>
            <h3>Цена: {product.price}</h3>
            <hr />

            <form onSubmit={handleSubmit}>
                {attributes.map(attr => (
                    <div key={attr.id} >
                        <label>
                            {attr.name}
                            {attr.required && "*"}
                        </label>
                        {attr.field_type === "text" && (
                            <input type="text"
                                required={attr.required}
                                value={values[attr.id] || ""}
                                onChange={e => handleChange(attr.id, e.target.value)} />
                        )}

                        {attr.field_type === "number" && (
                            <input
                                type="number"
                                required={attr.required}
                                value={values[attr.id] || ""}
                                onChange={e => handleChange(attr.id, e.target.value)
                                }
                            />
                        )}

                        {attr.field_type === "boolean" && (
                            <input
                                type="checkbox"
                                checked={!!values[attr.id]}
                                onChange={e => handleChange(attr.id, e.target.checked)
                                }
                            />
                        )}


                    </div>
                ))}

                <button type="submit">Купить</button>
            </form>
        </div>
    )
}