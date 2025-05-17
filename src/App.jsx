import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import ProtectedRoute from "./pages/ProtectedRoute";
import { City, CityList, CountryList, Form } from "./routes/lazyComponents";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
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
};

export default App;
