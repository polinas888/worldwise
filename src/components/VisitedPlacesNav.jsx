import { NavLink } from "react-router-dom";

function VisitedPlacesNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/map/countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="/map/cities">Cities</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default VisitedPlacesNav;
