
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";


export default function Profile() {
    const [roots, setRoots] = useState([]);

    useEffect(() => {
        api.get("users/profile")
            .then(res => setRoots(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Профиль</h2>
            <div className=''>
                {roots.map(root => (
                    <div className="card" key={root.id}>
                        {/* <Link to={``}> */}
                            <h1>{root.title}</h1>
                            {/* <p>{root.slug}</p> */}
                            <img className='plat-img' src={root.image} alt="" />
                        {/* </Link> */}
                    </div>
                ))}
            </div>
        </div>
    )
}