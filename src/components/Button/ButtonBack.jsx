import { useContext } from "react";
import { CitiesContext } from "../../context/CitiesProvider";
import Button from "./Button";

const ButtonBack = () => {
  const { navigate } = useContext(CitiesContext);
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
};

export default ButtonBack;
