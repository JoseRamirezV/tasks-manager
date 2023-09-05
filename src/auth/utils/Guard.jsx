import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Guard(){
  const { isLogged } = useContext(AuthContext)
  return isLogged
}