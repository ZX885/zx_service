import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateProduct() {
  const { typeId } = useParams();
  const navigate = useNavigate();

  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState({});
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!typeId) return;
    api.get(`http://127.0.0.1:8000/api/products/attributes/${typeId}`)
      .then(res => {
        console.log("ATTRIBUTES: ", res.data);
        setAttributes(res.data);
      })
      .catch(err => {
        console.error("ATTR ERROR: ", err);
      })
  }, [typeId])


  // 2️⃣ Обновление значений
  const handleChange = (attrId, value) => {
    setValues(prev => ({
      ...prev,
      [attrId]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_type", typeId);
    formData.append("price", price);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    Object.entries(values).forEach(([attrId, value]) => {
      formData.append(
        "attributes",
        JSON.stringify({
          attribute: Number(attrId),
          value: value
        })
      );
    });

    try {
      await api.post("/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Товар создан");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Ошибка при создании");
    }
  };

  return (
    <div>
      <h2>Создание товара</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <hr />
        <label>Фото товара</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {attributes.map(attr => (
          <div key={attr.id}>
            <label>{attr.name}</label>



            {attr.field_type === "text" && (
              <input
                type="text"
                onChange={e => handleChange(attr.id, e.target.value)}
              />
            )}

            {attr.field_type === "number" && (
              <input
                type="number"
                onChange={e => handleChange(attr.id, e.target.value)}
              />
            )}

            {attr.field_type === "boolean" && (
              <input
                type="checkbox"
                onChange={e => handleChange(attr.id, e.target.checked)}
              />
            )}
          </div>
        ))}

        <button type="submit">Создать</button>
      </form>
    </div>
  );
}