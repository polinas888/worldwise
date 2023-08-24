import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map position: lat={lat} lng={lng}
    </div>
  );
}

export default Map;
