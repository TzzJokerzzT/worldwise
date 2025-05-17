import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import { useAuth } from "../../context/FakeAuthContext";
import Logo from "../Logo/Logo";

const PageNav = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
    logout();
  };
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink
            to={isAuthenticated ? "" : "/login"}
            onClick={isAuthenticated ? handleClick : null}
            className={styles.ctaLink}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
