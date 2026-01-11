import "./css/selectcategory.scss"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";



export default function SelectCategory() {

    const { platformId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        api.get(`/catalog/categories/${platformId}/`)
            .then(res => setCategory(res.data))
    }, [platformId]);

    return (
        <div>
            <h2>Выберите Категорию</h2>
            <div className="wrapper">
                {category.map(c => (
                    <button
                        className="button"
                        key={c.id}
                        onClick={() => navigate(`/create/type/${c.id}`)}
                    >
                        {c.title}
                    </button>
                ))}
            </div>

        </div>
    )

}