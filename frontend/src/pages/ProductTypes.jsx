import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function ProductType(){
    const {categoryId} = useParams();
    const[types, setTypes] =useState();

    useEffect(()=>{
        api.get(`product-types/${categoryId}/`)
            .then(res => setTypes(res.data));
    }, [categoryId]);

    return(
        <div>
            <h2>Типы продуктов</h2>
            {types.map(t =>(
                <div key={t.id}>
                    <Link to={`/create/${t.id}`}>
                        {t.id}
                    </Link>
                </div>
            ))}
        </div>
    )
}