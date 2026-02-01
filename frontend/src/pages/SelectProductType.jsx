import "./css/selectcategory.scss"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SelectProductType() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    api.get(`/products/types/${categoryId}`)
      .then(res => setTypes(res.data))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div>

      <h2>Тип товара</h2>
      <div className="wrapper">

        {types.map(t => (
          <button
          className="button"
            key={t.id}
            onClick={() => navigate(`/create/product/${t.id}`)}
          >
            {t.title}
          </button>
        ))}
      </div>
    </div>
  );
}
