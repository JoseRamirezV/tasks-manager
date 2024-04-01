import { UpdateUserData } from "@/task/components/UpdateUserData";
import { Stack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import ChangePassword from "../components/ChangePassword";
import { useUser } from "../hooks/useUser";
import { DeleteAccount } from "../components/DeleteAccount";

const BUTTON_STATES = {
  default: {
    message: "Guardar cambios",
    schema: "blue",
  },
  success: {
    message: "Actualizada!",
    schema: "green",
  },
  error: {
    message: "Algo salió mal",
    schema: "red",
  },
  loading: {
    message: "Cargando...",
    schema: "blackAlpha",
  },
};

export const ProfilePage = () => {
  const { user, updateUserData, changePassword, deleteAccount } = useUser();

  return (
    <>
      <Helmet>
        <title>Perfil | Taskty</title>
      </Helmet>
      <Stack spacing={5}>
        <UpdateUserData currentData={user} STATES={BUTTON_STATES} updateUserData={updateUserData} />
        <ChangePassword STATES={BUTTON_STATES} changePassword={changePassword} />
        <DeleteAccount deleteAccount={deleteAccount}/>
      </Stack>
    </>
  );
};
