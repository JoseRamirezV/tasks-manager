import {
  changePassword as changePasswordService,
  update,
  deleteUser,
} from "@/auth/services/users";
import validateEmail from "@/auth/utils/validateEmail";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUser = () => {
  const {
    _id,
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
      toast.error("Formato de email invalido");
      return { error: true };
    }
    const { user, error } = await update({
      _id,
      data,
      needsVerification: needsVerification && { oldEmail: email },
    });
    if (error) {
      toast.error(error);
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
    login({ ...user });
    return { user };
  };

  const changePassword = async ({
    oldPassword,
    newPassword,
    passwordVerification,
  }) => {
    if (newPassword !== passwordVerification)
      return toast.error("Los campos de contraseña nueva no coinciden");
    const { ok, error } = await changePasswordService({
      _id,
      newPassword,
      oldPassword,
    });
    if (error)
      return toast.error(error);
    return { ok };
  };

  const deleteAccount = async ({ password }) => {
    const { ok, error } = await deleteUser({ _id, password });
    if (ok) {
      const promise = new Promise((resolve) =>
        setTimeout(() => {
          resolve(ok);
        }, 2000)
      );
      toast.promise(promise, {
        loading: "Cerrando sesión...",
        success: (ok) => `${ok}, adios 😢`,
        onAutoClose: () => logout(),
      });
      return {};
    }
    toast.error(error);
    return { error };
  };

  return {
    updateUserData,
    changePassword,
    deleteAccount,
    user: { firstName, secondName, firstLastName, secondLastName, email },
  };
};
