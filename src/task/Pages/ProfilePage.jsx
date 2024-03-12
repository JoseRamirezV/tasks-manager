import { Box, Button, FormControl, SimpleGrid } from "@chakra-ui/react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "@/context/AuthContext";
import { MyEditableInput } from "@/task/components/MyEditableInput";

export const ProfilePage = () => {
  const { name, cellphone } = useContext(AuthContext);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, phone, password } = Object.fromEntries(
      new window.FormData(form)
    );
    console.log({ name, phone, password });
  };

  return (
    <>
      <Helmet>
        <title>Perfil | Taskty</title>
      </Helmet>
      <Box>
        <FormControl as="form" onSubmit={handleSaveChanges}>
          <SimpleGrid columns={[1, null, 2]} spacing="30px">
            <MyEditableInput
              defaultValue={name}
              label="Nombre"
              name="name"
            />
            <MyEditableInput
              defaultValue={cellphone}
              label="Numero de teléfono"
              name="phone"
              type="tel"
            />
            <MyEditableInput
              label="Contraseña"
              name="password"
            />
          </SimpleGrid>
          <Button colorScheme="teal" variant="solid" mt={8} type="submit">
            Guardar cambios
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
