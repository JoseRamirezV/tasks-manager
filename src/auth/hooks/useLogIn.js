import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { login as loginService } from "@/auth/services/users";
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
    const {user, token, error} = await loginService(cellphone, password);
    if (error) {
      setError(
        "Credenciales incorrectas, por favor verifique su usuario o contraseña"
      );
      return;
    }
    window.localStorage.setItem('token', token)
    const { _id: id, user: name } = user;
    login({
      id,
      cellphone,
      name,
      token,
      isLogged: true
    });
  };

  return {
    authenticateUser,
  };
}
