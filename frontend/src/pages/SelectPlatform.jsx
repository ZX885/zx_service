import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";


export default function SelectPlatform() {

    const { rootId } = useParams();
    const navigate = useNavigate();
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        api.get(`/catalog/platforms/${rootId}`)
            .then(res => setPlatforms(res.data));
    }, [rootId]);

    return (
        <div>
            <h2>Выберите платформу</h2>

            {platforms.map(p => (
                <button
                    key={p.id}
                    onClick={() => navigate(`/create/categories/${p.id}`)}
                >
                    {p.title}
                </button>
            ))}

        </div>
    )

}