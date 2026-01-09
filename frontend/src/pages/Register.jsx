import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/register/", form);
      alert("Регистрация успешна");
      navigate("/login");
    } catch (err) {
      alert("Ошибка регистрации");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
      <input name="password2" type="password" placeholder="Повтор пароля" onChange={handleChange} />

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
