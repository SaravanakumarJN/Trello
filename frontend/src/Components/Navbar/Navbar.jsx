import styles from "./Navbar.module.css";
import { clearToken } from "../../utilities/localStorage";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const handleLogout = () => {
    clearToken();
    window.location.reload();
  };

  const handleNavigateHome = () => {
    history.push("/home");
  };

  return (
    <div className={styles.nav}>
      <div
        className={styles.nav_clickables}
        style={{ fontFamily: "Comforter, cursive", fontSize: "20px" }}
        onClick={handleNavigateHome}
      >
        Trello
      </div>
      <div className={styles.nav_space}></div>
      <div className={styles.nav_clickables} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export { Navbar };
