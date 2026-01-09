import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function SelectProductType() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    api.get("/products/types/")
      .then(res => setTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Выберите тип товара</h2>

      {types.map(type => (
        <div
          key={type.id}
          style={{
            border: "1px solid #333",
            padding: 12,
            marginBottom: 10,
            borderRadius: 6
          }}
        >
          <h4>{type.title}</h4>

          <Link to={`/create/${type.id}`}>
            ➕ Создать товар
          </Link>
        </div>
      ))}
    </div>
  );
}
