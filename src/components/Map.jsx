import styles from "./Map.module.css";
import { CitiesContext } from "../context/CitiesProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Map = () => {
  const { lat, lng, HandleNavigate } = useContext(CitiesContext);

  return (
    <div className={styles.mapContainer} onClick={() => HandleNavigate("app/form")}>
      <h1>Map</h1>
      <h1>
        Postion: {lat}, {lng}
      </h1>
    </div>
  );
};

export default Map;
