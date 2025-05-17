import { useContext, useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { CitiesContext } from "../context/CitiesProvider";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  emoji: "",
  isLoadingGeocoding: false,
  geoCodingError: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "cityName":
      return {
        ...state,
        cityName: action.payload,
      };
    case "country":
      return {
        ...state,
        country: action.payload,
      };
    case "date":
      return {
        ...state,
        date: action.payload,
      };
    case "notes":
      return {
        ...state,
        notes: action.payload,
      };
    case "emoji":
      return {
        ...state,
        emoji: action.payload,
      };
    case "isLoadingGeocoding":
      return {
        ...state,
        isLoadingGeocoding: action.payload,
      };
    case "geoCodingError":
      return {
        ...state,
        geoCodingError: action.payload,
      };
    default:
      state;
  }
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Form = () => {
  const [
    {
      cityName,
      country,
      date,
      notes,
      emoji,
      isLoadingGeocoding,
      geoCodingError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { createCity, isLoading, navigate } = useContext(CitiesContext);

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (!lat && !lng) return;

    const fetchData = async () => {
      try {
        dispatch({ type: "isLoadingGeocoding", payload: true });
        dispatch({ type: "geoCodingError", payload: "" });
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
        );
        const data = await response.json();
        dispatch({
          type: "cityName",
          payload: data.city || data.locality || "",
        });
        dispatch({ type: "country", payload: data.countryName });
        dispatch({ type: "emoji", payload: convertToEmoji(data.countryCode) });
        if (!data.countryCode)
          throw new Error("No country found, please click somewhere else");
      } catch (error) {
        dispatch({ type: "geoCodingError", payload: error.message });
      } finally {
        dispatch({ type: "isLoadingGeocoding", payload: false });
      }
    };
    fetchData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "cityName", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => dispatch({ type: "date", payload: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "notes", payload: e.target.value })}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
};

export default Form;
