import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  login as loginService,
  passwordRecovery,
  signUp,
  verify,
} from "@/auth/services/users";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error("Error", {
        description: error,
      });
    }

    return () => {
      setError(null);
    };
  }, [error]);

  const authenticateUser = async (email, password) => {
    const { userData, token, error } = await loginService(email, password);
    if (error) {
      setError(
        "Credenciales incorrectas, por favor verifique su usuario o contraseña"
      );
      return;
    }
    login({
      ...userData,
      token,
      isLogged: true,
    });
  };

  const createUser = async (data) => {
    if(data.passwordVerification !== data.password) return setError("Las contraseñas no coinciden")
    const { ok, exists } = await signUp(data);
    if (!ok) {
      setError(exists ?? "Hubo un problema, por favor intenta mas tarde");
      return;
    }
    toast.info("Perfecto!", {
      description:
        "Revisa tu cuenta de correo, ahí encontraras el código de activación de cuenta y estarás listo para usar Taskty",
      onDismiss: () =>
        navigate("/auth/verify-account", {
          state: { email: data.email },
        }),
      onAutoClose: () =>
        navigate("/auth/verify-account", {
          state: { email: data.email },
        }),
    });
  };

  const deleteUser = () => {};

  const forgotPassword = async ({
    email,
    code,
    password,
    passVerification,
  }) => {
    if (password !== passVerification) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const promise = passwordRecovery({ email, code, newPassword: password });
    toast.promise(promise, {
      loading: code ? "Verificando..." : "Enviando...",
      success: ({ ok, user }) => {
        if (user)
          setTimeout(() => {
            navigate("/auth/sign-in");
          }, 2000);
        return ok;
      },
      error: ({ error }) => error,
    });
  };

  const verifyAccount = async (data) => {
    const promise = () =>
      new Promise((resolve, reject) => {
        verify(data).then(({ userData, invalid }) => {
          if (invalid) reject({ invalid });
          resolve(userData);
        });
      });
    toast.promise(promise, {
      loading: "Verificando...",
      success: (userData) => {
        setTimeout(() => {
          login({
            ...userData,
            isLogged: true,
          });
        }, 2000);
        return "Verificado!";
      },
      error: ({ invalid }) =>
        invalid ?? "Parece que hubo un problema, por favor intenta mas tarde",
    });
  };

  return {
    authenticateUser,
    createUser,
    verifyAccount,
    deleteUser,
    forgotPassword,
  };
}
