import {useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import {api} from "../api/axios";

export default function Categories(){
    const {platformId} = useParams();
    const [categories, setCategories] = useState();

    useEffect(()=>{
        api.get(`categories/${platformId}/`)
            .then(res => setCategories(res.data));
    }, [platformId]);

    return (
        <div>
            <h2>Категории</h2>
            {categories.map(cat =>(
                <div key={cat.id}>
                    <Link to={`/types/${cat.id}`}>
                        {cat.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}