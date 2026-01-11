import './css/game_style.scss'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


export default function SelectRoot() {
    const [roots, setRoots] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/catalog/root-categories/`)
            .then(res => setRoots(res.data));
    }, []);

    return (
        <div>

            <h2>Выберите раздел</h2>
            <div className='game_wr'>
                {roots.map(r => (
                    <div className='card'>
                        <button
                        className='button'
                            key={r.id}
                            onClick={() => navigate(`/create/platforms/${r.id}`)}
                        >
                            {r.title}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )


}