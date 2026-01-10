import { useAuth } from "../conext/AuthContext";
import "./style.scss"
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const { isAuth, logout } = useAuth();


  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>
          ZX Маркетплейс
        </Link>
      </div>

      <nav style={styles.nav}>

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
      </nav>

      <div style={styles.right}>
        {isAuth ? (
          <>
            <NavLink
              to="/create/root"
              style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Создать товар
            </NavLink>
            <Link to="/users/profile">Профиль</Link>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to={"/login"}>Войти</Link>
            <Link to={"/register"}>Регистрация</Link>
          </>
        )}
        {/* {!isAuth ? (
          <div>
            <Link to="/login">Логин</Link>
            daw
            <Link to="/register">Регистрация</Link>
          </div>
        ) : (
          <Link to="/users/profile">Профиль</Link>
        )} */}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
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
