import { useContext } from "react";
import ContextProvider from "../utilities/ContextProvider";

const useContextValue = () => {
  const value = useContext(ContextProvider);
  return value;
};

export default useContextValue;
