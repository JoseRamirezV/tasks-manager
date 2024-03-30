import {
  changePassword as changePasswordService,
  update,
} from "@/auth/services/users";
import validateEmail from "@/auth/utils/validateEmail";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUser = () => {
  const {
    _id,
    token,
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    email,
    login,
    logout,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateUserData = async ({ data, needsVerification }) => {
    if (!validateEmail(data.email)) {
      toast.error("Error", { description: "Formato de email invalido" });
      return { error: true };
    }
    const { user, error } = await update({
      _id,
      token,
      data,
      needsVerification: needsVerification && { oldEmail: email },
    });
    if (error) {
      toast.error("Error", {
        description: error,
      });
      return { error };
    }
    if (needsVerification) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          logout();
          resolve();
          navigate("/auth/verify-account", { state: { email: data.email } });
        }, 2000);
      });
      toast.promise(promise, {
        loading: "Cerrando sesión...",
        error: () => "Error",
      });
      return { closing: true };
    }
    login({ ...user, token });
    return { user };
  };

  const changePassword = async ({
    oldPassword,
    newPassword,
    passwordVerification,
  }) => {
    if (newPassword !== passwordVerification)
      return toast.error("Error", {
        description: "Los campos de contraseña nueva no coinciden",
      });
    const { ok, error } = await changePasswordService({
      _id,
      token,
      newPassword,
      oldPassword,
    });
    if (error)
      return toast.error("Error", {
        description: error,
      });
    return { ok };
  };

  return {
    updateUserData,
    changePassword,
    user: { firstName, secondName, firstLastName, secondLastName, email },
  };
};
