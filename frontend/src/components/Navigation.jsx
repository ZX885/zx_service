import "./style.scss"
import logo from "./logo.png"
import { Link } from "react-router-dom";
export default function Navbar(){
    return (
        <nav className="nav">
            <img src={logo} alt="" />
            <Link to="/">Главная</Link>
            <Link to="/games">Игры</Link>
            <Link to="/create/:typeId">Создать товар</Link>
        </nav>
    )
}