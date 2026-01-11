import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("users/profile/")
            .then(res => setUser(res.data))
            .catch((err) => {
                alert("Не авторизован!")
                console.error(err);
            });
    }, []);

    if (!user) return <p>Загрузка...</p>

    return (
        <div>
            <h2>Профиль</h2>
            <div className=''>
                <div><img src={user.image} alt="" /></div>
                <div>
                    <p>Имя: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </div>
    )
}