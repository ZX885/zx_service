import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductType(){
    const {categoryId} = useParams();
    const[types, setTypes] =useState();

    useEffect(()=>{
        api.get(`products/types/${categoryId}`)
            .then(res => setTypes(res.data))
            .catch(err => console.error(err));
    }, [categoryId]);

    return(
        <div>
            <h2>Типы продуктов</h2>

            {types.map(t =>(
                <div key={t.id}>
                    <Link to={`/products/${t.id}`}>
                        {t.title}
                    </Link>
                    {" | "}
                    <Link to={`/create/${t.id}`}>Создать товар</Link>
                </div>
            ))}
        </div>
    )
}