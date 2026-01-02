import "./css/platforms.scss"
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link, useParams } from "react-router-dom";


export default function Platforms(){
    const {rootId} = useParams()
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.get(`catalog/platforms/${rootId}`)
            .then(res =>{
                setPlatforms(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false)
            });
    }, [rootId]);

    if (loading) return <p>Загрузка...</p>;

    return (
        <div>
            <h2>Платформы</h2>
            <div className="plat">
             {platforms.map(plat =>(
                <div key={plat.id}>

                    <Link to={`/games/${plat.id}/categories`}>
                        <img className="plat_img" src={plat.image} alt="" />
                        <h1>{plat.title}</h1>
                    </Link>
                    </div>
             ))}
            </div>    
        </div>
    )
}




// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { api } from "../api/axios";

// export default function Platforms(){
//     const{rootId} = useParams();
//     const[platforms, setPlatforms] = useState([])
    
//     useEffect(()=>{
//         api.get(`catalog/platforms/${rootId}/`)
//         .then(res =>{
//             setPlatforms(res.data);
//         })
//         .catch(err =>{
//             console.error(err);
//         })
//     }, [rootId])

//     return (
//         <div>
//             <h2>Платформы</h2>
//             {platforms.map(plat =>(
//                 <div key={plat.id}>
//                     <Link >
//                         {plat.title}
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     )
// }
