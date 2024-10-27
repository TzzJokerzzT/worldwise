import { useContext } from "react";
import { CitiesContext } from "../context/CitiesProvider";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
const CityList = () => {
  //Context
  const { cities } = useContext(CitiesContext);
  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
