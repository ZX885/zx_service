import { useAuth } from "../context/AuthContext";
import "./style.scss"
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const { isAuth, logout } = useAuth();


  return (
    <header className="header">
      
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>
          ZX Маркетплейс
        </Link>
      </div>

      <nav style={styles.nav}>

        <NavLink
          to="/products"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Товары
        </NavLink>
      </nav>

      <div style={styles.right}>
        {isAuth ? (
          <div className="nava">
            <NavLink
              to="/create/root"
              style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Создать товар
            </NavLink>
            <Link className="chats" to="/chats/">Чаты</Link>
            <Link className="orders" to="/seller/orders">Заказы</Link>
            <Link className="profile" to="/users/profile">Профиль</Link>
            <button className="logout" onClick={logout}>Выйти</button>
          </div>
        ) : (
          <>
            <Link to={"/login"}>Войти</Link>
            <Link to={"/register"}>Регистрация</Link>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    
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
