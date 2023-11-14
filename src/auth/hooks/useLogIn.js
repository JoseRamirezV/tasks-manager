import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUser } from "../services/users";
import { toast } from "sonner";

export function useLogin() {
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }

    return () => {
      setError(null);
    };
  });

  const authenticateUser = async (cellphone, password) => {
    if (isNaN(cellphone)) {
      setError("Debe ingresar un numero de teléfono, nada de letras");
      return;
    }
    const userFound = await getUser(cellphone, password);
    if (!userFound) {
      setError(
        "Credenciales incorrectas, por favor verifique su usuario o contraseña"
      );
      return;
    }
    const { _id: id, name, token } = userFound;
    login({
      id,
      cellphone,
      name,
      token,
      isLogged: true,
    });
  };

  return {
    authenticateUser,
  };
}
