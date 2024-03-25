import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { login as loginService, signUp } from "@/auth/services/users";
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

  const authenticateUser = async (email, password) => {
    const { user, token, error } = await loginService(email, password);
    if (error) {
      setError(
        "Credenciales incorrectas, por favor verifique su usuario o contraseña"
      );
      return;
    }
    const { _id: id, user: name } = user;
    login({
      id,
      email,
      name,
      token,
      isLogged: true,
    });
  };
  // Se puede hacer de mejor manera, TODO: refactorizar, crear componente para verificacion de cuenta
  const createUser = async (data) => {
    const promise = () =>
      new Promise((resolve, reject) =>
        signUp(data).then(({ exists, ok }) => {
          if (ok) return resolve({ ok });
          reject(exists);
        })
      );
    toast.promise(promise, {
      loading: "Loading...",
      success:
        "Revisa tu cuenta de correo, ahí encontraras el código de activación de cuenta y estarás listo para usar Taskty",
      error: (exists) =>
        exists ?? "Hubo un problema, por favor intenta mas tarde",
    });
  };

  return {
    authenticateUser,
    createUser,
  };
}
