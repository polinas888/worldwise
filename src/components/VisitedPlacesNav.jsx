import { NavLink } from "react-router-dom";
import styles from "./VisitedPlacesNav.module.css";
import User from "./User";

function VisitedPlacesNav() {
  return (
    <>
      <User></User>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="countries">Countries</NavLink>
          </li>
          <li>
            <NavLink to="cities">Cities</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default VisitedPlacesNav;
