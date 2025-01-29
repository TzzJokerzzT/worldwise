import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/cities";
// const BASE_URL = "https://restcountries.com/v3.1/";
export const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "loading":
      return {
        ...state,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  //Navigate
  const navigate = useNavigate();

  //UseEffect
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "isLoading" });
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
        alert(error);
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "isLoading" });
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching loading data...",
      });
      alert(error);
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "isLoading" });
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (errorr) {
      dispatch({
        type: "error",
        payload: "There was an error creating a city.",
      });
      alert(error);
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "isLoading" });
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "error",
        payload: "There was an error deleting a city.",
      });
      alert(error);
    }
  };

  //Functions
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  return (
    <CitiesContext.Provider
      value={{
        getCity,
        currentCity,
        cities,
        isLoading,
        formatDate,
        navigate,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
