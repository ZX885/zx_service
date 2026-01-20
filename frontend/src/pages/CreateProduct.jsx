// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function CreateProduct() {
//   const { typeId } = useParams();
//   const navigate = useNavigate();

//   const [attributes, setAttributes] = useState([]);
//   const [values, setValues] = useState({});
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     api.get(`/products/attributes/${typeId}/`)
//       .then(res => setAttributes(res.data))
//       .catch(err => console.error(err));
//   }, [typeId]);

//   const handleChange = (attrId, value) => {
//     setValues(prev => ({
//       ...prev,
//       [attrId]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("product_type", typeId);
//     formData.append("price", price);
//     formData.append("description", description);

//     if (image) {
//       formData.append("image", image);
//     }

//     const attributeValues = Object.entries(values).map(
//       ([attrId, value]) => ({
//         attribute: attrId,
//         value: value
//       })
//     );

//     formData.append("attribute_values", JSON.stringify(attributeValues));

//     await api.post("/products/", formData, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     alert("Товар создан")

//     navigate("/users/profile");
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

//         <input
//           type="file"
//           accept="image/*"
//           onChange={e => setImage(e.target.files[0])}
//         />

//         <hr />

//         {attributes.map(attr => (
//           <div key={attr.id}>
//             <label>{attr.name}</label>

//             {attr.field_type === "text" && (
//               <input
//                 type="text"
//                 onChange={e => handleChange(attr.id, e.target.value)}
//               />
//             )}

//             {attr.field_type === "number" && (
//               <input
//                 type="number"
//                 onChange={e => handleChange(attr.id, e.target.value)}
//               />
//             )}

//             {attr.field_type === "boolean" && (
//               <input
//                 type="checkbox"
//                 onChange={e => handleChange(attr.id, e.target.checked)}
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
      .then(res => setAttributes(res.data))
      .catch(err => console.error(err));
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

    if (image) {
      formData.append("image", image);
    }

    // ✅ ГЛАВНОЕ ИСПРАВЛЕНИЕ
    const attributeValuesArray = Object.entries(values).map(
      ([attrId, value]) => ({
        attribute: Number(attrId),
        value: String(value),
      })
    );

    formData.append(
      "attribute_values",
      JSON.stringify(attributeValuesArray)
    );

    try {
      await api.post("/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Товар создан");
      navigate("/users/profile");
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

        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
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