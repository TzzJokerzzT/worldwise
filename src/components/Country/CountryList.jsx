import { useContext } from "react";
import { CitiesContext } from "../context/CitiesProvider";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
const CountryList = () => {
  //Context
  const { cities } = useContext(CitiesContext);
  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((items) => items.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
