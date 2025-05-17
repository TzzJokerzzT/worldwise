import { useContext } from "react";
import { useAuth } from "../context/FakeAuthContext";
import { CitiesContext } from "../context/CitiesProvider";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { navigate } = useContext(CitiesContext);

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
