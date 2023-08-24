import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./VisitedPlaces.module.css";

function VisitedPlaces() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default VisitedPlaces;
