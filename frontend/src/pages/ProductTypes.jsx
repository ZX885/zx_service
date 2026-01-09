// import { useParams,Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function ProductType(){
//     const {categoryId} = useParams();
//     const[types, setTypes] =useState([]);

//     useEffect(()=>{
//         api.get(`products/types/${categoryId}`)
//             .then(res => setTypes(res.data))
//             .catch(err => console.error(err));
//     }, [categoryId]);

//     return(
//         <div>
//             <h2>Типы продуктов</h2>

//             {types.map(t =>(
//                 <div key={t.id}>
//                     <Link to={`/products/${t.id}`}>
//                         {t.title}
//                     </Link>
//                     {" | "}
//                     <Link to={`/create/${t.id}`}>Создать товар</Link>
//                 </div>
//             ))}
//         </div>
//     )
// }


import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductType() {
  const { categoryId } = useParams();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/types/${categoryId}/`)
      .then(res => {
        setTypes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("TYPE ERROR:", err);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <p>Загрузка типов...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Типы товаров</h2>

      {types.length === 0 && (
        <p>Для этой категории типы ещё не добавлены</p>
      )}

      {types.map(type => (
        <div
          key={type.id}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #333",
            borderRadius: "6px",
          }}
        >
          <h4>{type.title}</h4>

          <Link
            to={`/products/${type.id}`}
            style={{ marginRight: "15px" }}
          >
            Смотреть товары
          </Link>

          <Link to={`/create/${type.id}`}>
            Создать товар
          </Link>
        </div>
      ))}
    </div>
  );
}
