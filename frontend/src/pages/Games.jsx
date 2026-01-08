import './css/game_style.scss'
import { useEffect, useState } from "react";
import api  from "../api/axios";
import { Link } from "react-router-dom";


export default function Games() {
    const [roots, setRoots] = useState([]);

    useEffect(() => {
        api.get("catalog/root-categories/")
            .then(res => setRoots(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Категории</h2>
            <div className='game_wr'>
                {roots.map(root => (
                    <div className="card" key={root.id}>
                        <Link to={`platforms/${root.id}/`}>
                            <h1>{root.title}</h1>
                            {/* <p>{root.slug}</p> */}
                            <img className='plat-img' src={root.image} alt="" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}