import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";

export default function CreateProduct() {
  const { typeId } = useParams();
  const navigate = useNavigate();

  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState({});
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  // await api.post("/products/", {
  //   product_type:typeId,
  //   price,
  //   description,
  // })
  // 1️⃣ Загружаем атрибуты
  // useEffect(() => {
  //   api.get(`/products/attributes/${typeId}/`)
  //     .then(res => setAttributes(res.data))
  //     .catch(err => console.error(err));
  // }, [typeId]);
  useEffect(() => {
    if (!typeId) return;
    axios.get(`http://127.0.0.1:8000/api/products/attributes/${typeId}`)
      .then(res => {
        console.log("ATTRIBUTES: ", res.data);
        setAttributes(res.data);
      })
      .catch(err => {
        console.error("ATTR ERROR: ", err);
      })
  }, [typeId])

  // useEffect(() => {
  //   if (attributes.length > 0) {
  //     const initial = {};
  //     attributes.forEach(attr => {
  //       if (attr.field_type === "boolean") {
  //         initial[attr.id] = false;
  //       } else {
  //         initial[attr.id] = "";
  //       }
  //     });
  //     setValues(initial);
  //   }
  // }, [attributes]);


  // 2️⃣ Обновление значений
  const handleChange = (attrId, value) => {
    setValues(prev => ({
      ...prev,
      [attrId]: value
    }));
  };
  

  // 3️⃣ Submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const attributeArray = Object.entries(values).map(
  //     ([attributeId, value]) =>({
  //       attribute: Number(attributeId),
  //       value
  //     })
  //   )
  //   const payload = {
  //     product_type: typeId,
  //     price: price,
  //     description,
  //     attributes: attributeArray
  //   };

  //   try {
  //     console.log("SEND:", {
  //       product_type: Number(typeId),
  //       price,
  //       description,
  //       attributes: payload
  //     });
  //     await api.post("/products/", payload);
  //     alert("Товар создан");
  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Ошибка при создании");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FormData = new FormData();
    FormData.append("product_type", typeId);
    FormData.append("price", price);
    FormData.append("description", description);

    if (image) {
      FormData.append("image", image);
    }

    Object.entries(values).forEach(([attrId, value]) =>{
      FormData.append("attributes", JSON.stringify({
        attributes:attrId,
        value: value
      }));
    });

    const attributeArray = Object.entries(values).map(
      ([attributeId, value]) => ({
        attribute: Number(attributeId),
        value: value
      })
    );

    const payload = {
      seller: 1, // temporary
      product_type: Number(typeId),
      price: price,
      description: description,
      attributes: attributeArray
    };

    console.log("SEND:", payload);
    
    try {
      await api.post("/products/", payload);
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

        {attributes.map(attr => (
          <div key={attr.id}>
            <label>{attr.name}</label>

            <label>Фото товара</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />


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
