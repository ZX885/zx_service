import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {api} from "../api/axios";

export default function Categories() {
  const { gameId } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    api
      .get(`/games/${gameId}/categories/`)
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [gameId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Категории</h2>

      {categories.map(cat => (
        <div key={cat.id}>
          <Link to={`/products/types/${cat.id}`}>
            {cat.title}
          </Link>
        </div>
      ))}
    </div>
  );
}








// import {useParams, Link} from "react-router-dom";
// import { useEffect, useState } from "react";
// import {api} from "../api/axios";

// export default function Categories(){
//     const {gameId} = useParams();
//     const [categories, setCategories] = useState([]);   
//     const [loading, setLoading] = useState(true)
//     useEffect(()=>{
//         api.get(`/games/${gameId}/categories`)
//             .then(res => {
//                 setCategories(res.data);
//                 setLoading(false);
//             })
//             .catch(err =>{
//                 console.error(err);
//                 setLoading(false)
//             });
//     }, [gameId]);
//     if (loading) return <p>Loading...</p>

//     return (
//         <div>
//             <h2>Категории</h2>
//             {categories.map(cat =>(
//                 <div key={cat.id}>
//                     <Link to={`/categories/${cat.id}/types`}>
//                         {cat.title}
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     )
// }
