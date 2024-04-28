import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@/icons/EyeIcons";

export default function ChangePassword({ STATES, changePassword }) {
  const [buttonState, setButtonState] = useState(STATES.default);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    verification: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { oldPassword, newPassword, passwordVerification } =
      Object.fromEntries(new window.FormData(form));
    setButtonState(STATES.loading);
    const { ok } = await changePassword({
      oldPassword,
      newPassword,
      passwordVerification,
    });
    if (!ok) {
      setButtonState(STATES.error);
      setTimeout(() => {
        setButtonState(STATES.default);
      }, 2000);
      return;
    }
    setButtonState(STATES.success);
    form.reset()
  };

  return (
    <Stack as={"form"} onSubmit={handleSubmit} spacing={5}>
      <span>
        <Heading as={"h2"} size={"md"} mb={2}>
          Cambio de contraseña
        </Heading>
      </span>
      <HStack spacing={5}>
        <FormControl isRequired>
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>
            Contraseña actual
          </FormLabel>
          <InputGroup>
            <Input
              size={{ base: "sm", sm: "md" }}
              name="oldPassword"
              textOverflow={"ellipsis"}
              type={showPassword.old ? "text" : "password"}
              placeholder={"Contraseña"}
              _placeholder={{ textOverflow: "ellipsis" }}
            />
            <InputRightElement boxSize={{ base: 8, sm: 10 }}>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Toggle password visibility"
                isRound
                tabIndex={-1}
                icon={
                  showPassword.old ? (
                    <Icon as={EyeSlashIcon} />
                  ) : (
                    <Icon as={EyeIcon} />
                  )
                }
                onClick={() =>
                  setShowPassword((showPassword) => ({
                    ...showPassword,
                    old: !showPassword.old,
                  }))
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>
            Nueva contraseña
          </FormLabel>
          <InputGroup>
            <Input
              size={{ base: "sm", sm: "md" }}
              name="newPassword"
              textOverflow={"ellipsis"}
              type={showPassword.new ? "text" : "password"}
              placeholder={"Nueva contraseña"}
              _placeholder={{ textOverflow: "ellipsis" }}
            />
            <InputRightElement boxSize={{ base: 8, sm: 10 }}>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Toggle password visibility"
                isRound
                tabIndex={-1}
                icon={
                  showPassword.new ? (
                    <Icon as={EyeSlashIcon} />
                  ) : (
                    <Icon as={EyeIcon} />
                  )
                }
                onClick={() =>
                  setShowPassword((showPassword) => ({
                    ...showPassword,
                    new: !showPassword.new,
                  }))
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack spacing={5} align={"end"} flexDir={"row-reverse"}>
        <FormControl flex={"0 1 50%"} isRequired>
          <InputGroup>
            <Input
              size={{ base: "sm", sm: "md" }}
              name="passwordVerification"
              textOverflow={"ellipsis"}
              type={showPassword.verification ? "text" : "password"}
              placeholder="Repite la nueva contraseña"
              _placeholder={{ textOverflow: "ellipsis" }}
            />
            <InputRightElement boxSize={{ base: 8, sm: 10 }}>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Toggle password visibility"
                isRound
                tabIndex={-1}
                icon={
                  showPassword.verification ? (
                    <Icon as={EyeSlashIcon} />
                  ) : (
                    <Icon as={EyeIcon} />
                  )
                }
                onClick={() =>
                  setShowPassword((showPassword) => ({
                    ...showPassword,
                    verification: !showPassword.verification,
                  }))
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          flex={"0 1 50%"}
          size={{ base: "sm", sm: "md" }}
          colorScheme={buttonState.schema}
          loadingText="Guardando cambios..."
          isLoading={buttonState === STATES.loading}
          isDisabled={
            buttonState === STATES.success || buttonState === STATES.error
          }
        >
          {buttonState.message}
        </Button>
      </HStack>
    </Stack>
  );
}
