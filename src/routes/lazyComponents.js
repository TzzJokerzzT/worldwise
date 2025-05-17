import { lazy } from "react";

export const CityList = lazy(() => import("../components/City/CityList"));
export const CountryList = lazy(
  () => import("../components/Country/CountryList"),
);
export const City = lazy(() => import("../components/City/City"));
export const Form = lazy(() => import("../components/Form/Form"));
