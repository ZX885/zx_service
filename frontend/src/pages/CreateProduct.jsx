// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function CreateProduct() {
//   const { typeId } = useParams();
//   const navigate = useNavigate();

//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   // ⬅️ здесь будут атрибуты + их значения
//   const [attributeValues, setAttributeValues] = useState([]);

//   // 1️⃣ Загружаем атрибуты для типа продукта
//   useEffect(() => {
//     if (!typeId) return;

//     api.get(`/products/attributes/${typeId}/`)
//       .then(res => {
//         // приводим к формату, который ждёт backend
//         const prepared = res.data.map(attr => ({
//           attribute: attr.id,   // ID атрибута
//           name: attr.name,      // для UI
//           field_type: attr.field_type,
//           value: ""             // значение, которое введёт юзер
//         }));

//         setAttributeValues(prepared);
//       })
//       .catch(err => {
//         console.error("Ошибка загрузки атрибутов", err);
//       });
//   }, [typeId]);

//   // 2️⃣ Изменение значения атрибута
//   const handleAttributeChange = (index, newValue) => {
//     const copy = [...attributeValues];
//     copy[index] = {
//       ...copy[index],
//       value: newValue
//     };
//     setAttributeValues(copy);
//   };

//   // 3️⃣ Отправка формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("product_type", typeId);
//     formData.append("price", price);
//     formData.append("description", description);

//     if (image) {
//       formData.append("image", image);
//     }

//     // ⬅️ КЛЮЧЕВОЙ МОМЕНТ
//     formData.append(
//       "attribute_values",
//       JSON.stringify(attributeValues));

//     try {
//       await api.post("/products/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Товар создан");
//       navigate("/");
//     } catch (err) {
//       console.error(err.response?.data || err);
//       alert("Ошибка при создании товара");
//     }
//   };

//   return (
//     <div>
//       <h2>Создание товара</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Цена"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           required
//         />

//         <textarea
//           placeholder="Описание"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           required
//         />

//         <hr />

//         <label>Фото товара</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={e => setImage(e.target.files[0])}
//         />

//         <hr />

//         {/* 🔽 Атрибуты */}
//         {attributeValues.map((attr, index) => (
//           <div key={attr.attribute}>
//             <label>{attr.name}</label>

//             {attr.field_type === "text" && (
//               <input
//                 type="text"
//                 value={attr.value}
//                 onChange={e =>
//                   handleAttributeChange(index, e.target.value)
//                 }
//               />
//             )}

//             {attr.field_type === "number" && (
//               <input
//                 type="number"
//                 value={attr.value}
//                 onChange={e =>
//                   handleAttributeChange(index, e.target.value)
//                 }
//               />
//             )}

//             {attr.field_type === "boolean" && (
//               <input
//                 type="checkbox"
//                 checked={!!attr.value}
//                 onChange={e =>
//                   handleAttributeChange(index, e.target.checked)
//                 }
//               />
//             )}
//           </div>
//         ))}

//         <button type="submit">Создать</button>
//       </form>
//     </div>
//   );
// }
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
    api.get(`/products/attributes/${typeId}/`)
      .then(res => setAttributes(res.data));
  }, [typeId]);

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

    if (image) formData.append("image", image);

    const attribute_values = Object.entries(values).map(
      ([attribute, value]) => ({
        attribute: Number(attribute),
        value
      })
    );

    formData.append(
      "attribute_values",
      JSON.stringify(attribute_values)
    );

    await api.post("/products/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/users/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Описание"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input type="file" onChange={e => setImage(e.target.files[0])} />

      {attributes.map(attr => (
        <div key={attr.id}>
          <label>{attr.name}</label>

          {attr.field_type === "text" && (
            <input onChange={e => handleChange(attr.id, e.target.value)} />
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
  );
}
