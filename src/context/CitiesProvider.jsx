import { createContext } from "react";
import { useCountries } from "../hooks/useCountries";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const { cities } = useCountries();
  //Search Params
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  //Navigate
  const navigate = useNavigate();
  //Handler Functions
  const HandleNavigate = (path) => {
    navigate(path);
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
      value={{ cities, formatDate, lat, lng, HandleNavigate }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
