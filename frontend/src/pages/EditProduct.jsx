import "./css/edit_product.scss"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}/edit/`).then(res => {
            setPrice(res.data.price);
            setDescription(res.data.description);
            setAttributes(res.data.attribute_values);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("price", price);
        formData.append("description", description);

        if (image) {
            formData.append("image", image);
        }

        attributes.forEach(attr => {
            formData.append(
                "attribute_values",
                JSON.stringify({
                    id: attr.id,
                    value: attr.value,
                })
            );
        });

        await api.patch(`/products/${id}/edit/`, formData);
        navigate("/users/profile");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Редактировать товар</h2>
            <div className="cards">
                <div className="card-basic">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <div>

                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />

                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                </div>
                {attributes.map((attr, i) => (
                    <div key={attr.id}>
                        <label>{attr.attribute}</label>
                        <input
                            value={attr.value}
                            onChange={e => {
                                const copy = [...attributes];
                                copy[i] = { ...copy[i], value: e.target.value };
                                setAttributes(copy);
                            }}
                        />
                    </div>
                ))}
                <div>
                <button className="button" type="submit">Сохранить</button>

                </div>
            </div>
        </form>
    );
}
