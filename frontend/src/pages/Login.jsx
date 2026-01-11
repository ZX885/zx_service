import "./css/login_style.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // ✅ ВАЖНО

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/token/", {
                username,
                password,
            });

            login(res.data.access, res.data.refresh);
            navigate("/users/profile");
        } catch (err) {
            console.error(err);
            alert("Неверный логин или пароль");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Вход</h2>

                <div className="login">
                    <input
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    );
}
