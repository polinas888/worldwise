import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import VisitedPlacesNav from "./VisitedPlacesNav";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <VisitedPlacesNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className="copyright">
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
