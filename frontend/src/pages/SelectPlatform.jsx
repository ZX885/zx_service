import './css/platforms.scss'
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
            <div className='plat'>
                {platforms.map(p => (
                    <div key={p.id}>
                        <img
                            onClick={() => navigate(`/create/categories/${p.id}`)}
                            className="plat_img"
                            src={p.image} alt="" />
                    </div>
                ))}
            </div>

        </div>
    )

}