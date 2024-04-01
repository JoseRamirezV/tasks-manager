import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5} mt={4}>
        <span>
          <Heading as={"h2"} size={"md"} mb={2}>
            Cambio de contraseña
          </Heading>
          <Divider />
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
              <InputRightElement>
                <Button
                  variant={"ghost"}
                  tabIndex={-1}
                  onClick={() =>
                    setShowPassword((showPassword) => ({
                      ...showPassword,
                      old: !showPassword.old,
                    }))
                  }
                >
                  {showPassword.old ? (
                    <Icon as={AiOutlineEye} />
                  ) : (
                    <Icon as={AiOutlineEyeInvisible} />
                  )}
                </Button>
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
              <InputRightElement>
                <Button
                  variant={"ghost"}
                  tabIndex={-1}
                  onClick={() =>
                    setShowPassword((showPassword) => ({
                      ...showPassword,
                      new: !showPassword.new,
                    }))
                  }
                >
                  {showPassword.new ? (
                    <Icon as={AiOutlineEye} />
                  ) : (
                    <Icon as={AiOutlineEyeInvisible} />
                  )}
                </Button>
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
              <InputRightElement>
                <Button
                  variant={"ghost"}
                  tabIndex={-1}
                  onClick={() =>
                    setShowPassword((showPassword) => ({
                      ...showPassword,
                      verification: !showPassword.verification,
                    }))
                  }
                >
                  {showPassword.verification ? (
                    <Icon as={AiOutlineEye} />
                  ) : (
                    <Icon as={AiOutlineEyeInvisible} />
                  )}
                </Button>
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
            isDisabled={buttonState === STATES.success || buttonState === STATES.error}
          >
            {buttonState.message}
          </Button>
        </HStack>
      </Stack>
    </form>
  );
}
