import { useContext } from "react";
import { Link } from "react-router-dom";
import { CitiesContext } from "../context/CitiesProvider";
import styles from "./CityItem.module.css";

const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;

  //Context
  const { formatDate, currentCity, deleteCity } = useContext(CitiesContext);

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
