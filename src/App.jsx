import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Spinner from "./components/Spinner";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
//Lazy Loading Components
const CityList = lazy(() => import("./components/CityList"));
const CountryList = lazy(() => import("./components/CountryList"));
const City = lazy(() => import("./components/City"));

const App = () => {
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
