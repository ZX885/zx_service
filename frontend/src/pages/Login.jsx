import "./css/login_style.scss"
import axios from "axios";
import api from "../api/axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"


export default function Login() {
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const navigate = useNavigate()

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {

    //         const res = await axios.post(
    //             "http://127.0.0.1:8000/api/token/",
    //             { username, password, }

    //         )
    //         localStorage.setItem("access", res.data.access);
    //         localStorage.setItem("refresh", res.data.refresh);
    //         alert("Успешный вход")
    //         navigate("/profile")

    //     } catch (err) {
    //         alert("Неверный логин или пароль!")
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/users/token/", {
                username,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            navigate("/");
        } catch (err) {
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
                        onChange={e => SetUsername(e.target.value)}
                        value={username} />
                    <input
                        type="password"
                        placeholder="Пароль"
                        onChange={e => SetPassword(e.target.value)}
                        value={password} />
                    <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    )
}