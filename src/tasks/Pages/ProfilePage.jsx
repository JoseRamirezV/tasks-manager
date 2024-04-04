import { UpdateUserData } from "@/tasks/components/UpdateUserData";
import { Divider, Stack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import ChangePassword from "@/tasks/components/ChangePassword";
import { useUser } from "@/tasks/hooks/useUser";
import { DeleteAccount } from "@/tasks/components/DeleteAccount";

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

export default function ProfilePage() {
  const { user, updateUserData, changePassword, deleteAccount } = useUser();

  return (
    <>
      <Helmet>
        <title>Perfil | Taskty</title>
      </Helmet>
      <Stack spacing={6}>
        <UpdateUserData
          currentData={user}
          STATES={BUTTON_STATES}
          updateUserData={updateUserData}
        />
        <Divider borderColor="#bdbdbd" />
        <ChangePassword
          STATES={BUTTON_STATES}
          changePassword={changePassword}
        />
        <Divider borderColor="#bdbdbd" />
        <DeleteAccount deleteAccount={deleteAccount} />
      </Stack>
    </>
  );
}
