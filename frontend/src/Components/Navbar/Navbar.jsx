import { useHistory } from "react-router-dom";

import styles from "./Navbar.module.css";
import { clearItem } from "../../utilities/localStorage";

const Navbar = () => {
  const history = useHistory();

  const handleLogout = () => {
    clearItem("token");
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
