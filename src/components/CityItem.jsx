import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formatDate } from "../utils";
import { useCities } from "../slices/citiesSlice/CitiesContext";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={{
          pathname: `${id}`,
          search: `?lat=${position.lat}&lng=${position.lng}`,
        }}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
