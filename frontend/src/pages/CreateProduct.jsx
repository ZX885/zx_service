import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function CreateProduct() {
  const { typeId } = useParams();
  const navigate = useNavigate();

  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState({});
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // 1️⃣ Загружаем атрибуты
  useEffect(() => {
    api.get(`/products/attributes/${typeId}/`)
      .then(res => setAttributes(res.data))
      .catch(err => console.error(err));
  }, [typeId]);

  // 2️⃣ Обновление значений
  const handleChange = (attrId, value) => {
    setValues(prev => ({
      ...prev,
      [attrId]: value
    }));
  };

  // 3️⃣ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product_type: typeId,
      price,
      description,
      attributes: Object.entries(values).map(([attr, value]) => ({
        attribute: attr,
        value: String(value)
      }))
    };

    try {
      await api.post("/products/", payload);
      alert("Товар создан");
      navigate("/");
    } catch (err) {
      console.error(err);
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


// //////////////////////////////////////////////////////////////////
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { api } from "../api/axios";

// export default function CreateProduct() {
//   const { typeId } = useParams();

//   const [attributes, setAttributes] = useState([]);
//   const [form, setForm] = useState({
//     price: "",
//     description: "",
//     values: {}
//   });

//   useEffect(() => {
//     api.get(`products/attributes/${typeId}/`)
//       .then(res => {
//         setAttributes(res.data);
//       })
//       .catch(err => console.error(err));
//   }, [typeId]);

//   const handleChange = (attrId, value) => {
//     setForm(prev => ({
//       ...prev,
//       values: {
//         ...prev.values,
//         [attrId]: value
//       }
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       product_type: typeId,
//       price: form.price,
//       description: form.description,
//       attributes: form.values
//     };

//     console.log("SEND TO API:", payload);
//     // тут позже будет POST
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Создать товар</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Цена"
//           value={form.price}
//           onChange={e => setForm({ ...form, price: e.target.value })}
//         />

//         <br /><br />

//         <textarea
//           placeholder="Описание"
//           value={form.description}
//           onChange={e => setForm({ ...form, description: e.target.value })}
//         />

//         <h3>Характеристики</h3>

//         {attributes.map(attr => (
//           <div key={attr.id}>
//             <label>{attr.name}</label><br />
//             <input
//               type="text"
//               onChange={e => handleChange(attr.id, e.target.value)}
//             />
//           </div>
//         ))}

//         <br />
//         <button type="submit">Создать</button>
//       </form>
//     </div>
//   );
// }
