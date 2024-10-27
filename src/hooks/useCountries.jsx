import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000/cities";
// const BASE_URL = "https://restcountries.com/v3.1/";
// export const useCountries = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async (name) => {
//       const response = await fetch(`${BASE_URL}name/${name}`);
//       const data = await response.json();
//       setCountries(data);
//     };

//     fetchCountries();
//   }, []);

//   return { countries };
// };

export const useCountries = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, isLoading };
};
