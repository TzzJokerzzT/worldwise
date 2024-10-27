import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Spinner from "./components/Spinner";
import Form from "./components/Form";
import { Navigate } from "react-router-dom";
//Lazy Loading Components
const CityList = lazy(() => import("./components/CityList"));
const CountryList = lazy(() => import("./components/CountryList"));
const City = lazy(() => import("./components/City"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <Navigate replace to="cities" />
              </Suspense>
            }
          />
          <Route
            path="cities"
            element={
              <Suspense fallback={<Spinner />}>
                <CityList />
              </Suspense>
            }
          />
          <Route
            path="cities/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <City />
              </Suspense>
            }
          />
          <Route
            path="countries"
            element={
              <Suspense fallback={<Spinner />}>
                <CountryList />
              </Suspense>
            }
          />
          <Route
            path="form"
            element={
              <Suspense fallback={<Spinner />}>
                <Form />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
