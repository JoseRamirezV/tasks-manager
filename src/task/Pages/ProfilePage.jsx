import { UpdateUserData } from "@/task/components/UpdateUserData";
import { Stack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import ChangePassword from "../components/ChangePassword";
import { useUser } from "../hooks/useUser";

const BUTTON_STATES = {
  default: {
    message: "Guardar cambios",
    schema: "blue",
    hover: "blue.500",
  },
  success: {
    message: "Actualizada!",
    schema: "green",
    hover: "green.500",
  },
  error: {
    message: "Algo salió mal",
    schema: "red",
    hover: "red.600",
  },
  loading: {
    message: "Cargando...",
    schema: "blackAlpha",
    hover: "gray.800",
  },
};

export const ProfilePage = () => {
  const { user, updateUserData, changePassword } = useUser();

  return (
    <>
      <Helmet>
        <title>Perfil | Taskty</title>
      </Helmet>
      <Stack spacing={5}>
        <UpdateUserData currentData={user} STATES={BUTTON_STATES} updateUserData={updateUserData} />
        <ChangePassword STATES={BUTTON_STATES} changePassword={changePassword} />
      </Stack>
    </>
  );
};
