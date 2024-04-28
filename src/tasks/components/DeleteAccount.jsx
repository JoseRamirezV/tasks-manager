import {
  Button,
  FormControl,
  FormHelperText,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@/icons/EyeIcons";

const BUTTON_STATES = {
  default: {
    message: "Borrar cuenta",
    schema: "red",
  },
  success: {
    message: "Cuenta eliminada!",
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

export default function DeleteAccount({ deleteAccount }) {
  const [buttonState, setButtonState] = useState(BUTTON_STATES.default);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState(BUTTON_STATES.loading);
    const form = e.currentTarget;
    const password = new window.FormData(form).get("password");
    const { error } = await deleteAccount({ password });
    if (error) return setButtonState(BUTTON_STATES.error);
    setButtonState(BUTTON_STATES.success);
  };

  return (
    <Stack w={{ sm: "60%" }} bg={"red.100"} rounded={"lg"} p={5}>
      <Heading as={"h2"} size={"md"} color="red.500">
        Eliminar cuenta
      </Heading>
      <Stack
        as={"form"}
        direction={{ base: "column", sm: "row" }}
        align={"end"}
        rowGap={4}
        columnGap={2}
        onSubmit={handleSubmit}
      >
        <FormControl flex={"0 0 65%"} isRequired>
          <FormHelperText mb={2}>
            Por favor ingrese su contraseña para poder eliminar su cuenta
          </FormHelperText>
          <InputGroup>
            <Input
              type={showPassword ? "type" : "password"}
              name="password"
              placeholder={"Contraseña"}
              variant="filled"
              bg={"gray.50"}
              _hover={{}}
              _focusVisible={{ bg: "white", outlineStyle: "none" }}
              onChange={() => {
                if (buttonState !== BUTTON_STATES.default)
                  setButtonState(BUTTON_STATES.default);
              }}
            />
            <InputRightElement>
              <IconButton
                size={"sm"}
                variant={"ghost"}
                aria-label="Toggle password visibility"
                isRound
                tabIndex={-1}
                icon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme={buttonState.schema}
          type="submit"
          flexGrow={1}
          w={{ base: "100%", sm: "auto" }}
          isLoading={buttonState === BUTTON_STATES.loading}
          isDisabled={
            buttonState === BUTTON_STATES.success ||
            buttonState === BUTTON_STATES.error
          }
        >
          {buttonState.message}
        </Button>
      </Stack>
    </Stack>
  );
}
