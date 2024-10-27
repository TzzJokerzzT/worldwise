import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CitiesProvider } from "./context/CitiesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CitiesProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CitiesProvider>
  </BrowserRouter>
);
