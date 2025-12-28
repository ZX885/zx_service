// import "./style.scss"
// import logo from "./logo.png"
// import { Link } from "react-router-dom";
// export default function Navbar(){
//     return (
//         <nav className="nav">
//             <img src={logo} alt="" />
//             <Link to="/">Главная</Link>
//             <Link to="/games">Игры</Link>
//             <Link to="/categories/">платформы</Link>
//             <Link to="/types/">Категории</Link>
//             <Link to="/create/">Создать товар</Link>
//         </nav>
//     )
// }

import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>
          ZX Маркетплейс
        </Link>
      </div>

      <nav style={styles.nav}>
        <NavLink
          to="/games"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Платформы
        </NavLink>

        <NavLink
          to="/categories"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Категории
        </NavLink>
        <NavLink
          to="/types"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Типы
        </NavLink>

        <NavLink
          to="/create"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Создать товар
        </NavLink>
      </nav>

      <div style={styles.right}>
        <NavLink
          to="/login"
          style={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Логин
        </NavLink>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
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
