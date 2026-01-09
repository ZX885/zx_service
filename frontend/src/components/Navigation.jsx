import "./style.scss"
import { Link, NavLink, useNavigate } from "react-router-dom";
import {logout} from "../utils/auth"

export default function Navbar() {
  const isAuth = !!localStorage.getItem("access")
  // function LogoutButton(){
  //   const navigate = useNavigate();

  //   const handleLogout =() =>{
  //     logout();
  //     navigate("/login");
  //   };

  //   return <button onClick={handleLogout}>Выйти</button>

  // }

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>
          ZX Маркетплейс
        </Link>
      </div>

      <nav style={styles.nav}>
        <NavLink
          to="/catalog"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Платформы
        </NavLink>

        <NavLink
          to="/orders"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Покупки
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Товары
        </NavLink>

        <NavLink
          to="/create/5"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Создать товар
        </NavLink>
      </nav>

      <div style={styles.right}>
        {!isAuth ? (
          <Link to="/login">Логин</Link>
        ):(
          <Link to="/users/profile">Профиль</Link>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    padding: "15px 30px",
    borderRadius: "10px",
    borderBottom: "1px solid #222",
    background: "#0f0f0f",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  logoText: {
    color: "#fff",
    textDecoration: "none",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  right: {
    display: "flex",
    gap: "15px",
  },

  link: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "15px",
  },

  activeLink: {
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
    borderBottom: "2px solid #fff",
    paddingBottom: "4px",
  },
};
