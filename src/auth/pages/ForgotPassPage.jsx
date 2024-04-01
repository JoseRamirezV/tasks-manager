import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  Link,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link as LinkRD } from "react-router-dom";
import { Toaster } from "sonner";
import { useLogin } from "../hooks/useLogIn";
import validateEmail from "../utils/validateEmail";

export default function ForgotPassPage() {
  const { forgotPassword } = useLogin();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isInvalid, setIsInvalid] = useState();
  const pinInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password, passVerification } = Object.fromEntries(
      new window.FormData(form)
    );
    if (!validateEmail(email)) return setIsInvalid(true);
    const code = pinInput.current;
    forgotPassword({ email, code, password, passVerification });
    setShowCodeInput(true);
  };

  return (
    <>
      <Helmet>
        <title>Olvidé mi contraseña | Taskty</title>
      </Helmet>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          spacing={6}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Stack align={"center"} justify={"center"}>
            <Heading as="h1" fontSize={"4xl"}>
              Taskty.co
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Has olvidado tu contraseña?
            </Text>
            <Stack as={"form"} onSubmit={handleSubmit} w={"85%"} spacing={4}>
              <FormControl isInvalid={isInvalid}>
                <Input
                  name="email"
                  type="email"
                  textAlign={"center"}
                  placeholder="example@mail.com"
                  onChange={() => {
                    if (isInvalid) setIsInvalid(false);
                  }}
                />
                <FormErrorMessage>Correo invalido</FormErrorMessage>
                {showCodeInput && (
                  <FormHelperText>
                    Revisa tu correo, ahí encontrarás el código de verificación
                  </FormHelperText>
                )}
              </FormControl>
              <Collapse in={showCodeInput}>
                {showCodeInput && (
                  <Stack spacing={4}>
                    <FormControl
                      id="code"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <PinInput
                        size={"lg"}
                        onComplete={(value) => (pinInput.current = value)}
                      >
                        <PinInputField
                          required
                          readOnly={!showCodeInput}
                          opacity={!showCodeInput && 0.5}
                        />
                        <PinInputField
                          required
                          readOnly={!showCodeInput}
                          opacity={!showCodeInput && 0.5}
                        />
                        <PinInputField
                          required
                          readOnly={!showCodeInput}
                          opacity={!showCodeInput && 0.5}
                        />
                        <PinInputField
                          required
                          readOnly={!showCodeInput}
                          opacity={!showCodeInput && 0.5}
                        />
                        <PinInputField
                          required
                          readOnly={!showCodeInput}
                          opacity={!showCodeInput && 0.5}
                        />
                        <PinInputField
                          required
                          readOnly={!showCodeInput}
                          opacity={!showCodeInput && 0.5}
                        />
                      </PinInput>
                    </FormControl>
                    <FormControl>
                      <Input
                        name="password"
                        type="password"
                        textAlign={"center"}
                        placeholder="Contraseña"
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        name="passVerification"
                        type="password"
                        textAlign={"center"}
                        placeholder="Contraseña"
                      />
                    </FormControl>
                  </Stack>
                )}
              </Collapse>
              <Button
                type="submit"
                width={"100%"}
                mb={2}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                {showCodeInput ? "Verificar" : "Realizar petición"}
              </Button>
            </Stack>
            <Link as={LinkRD} to={"/auth/sign-in"} color={"blue.400"}>
              Cancelar
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Toaster richColors />
    </>
  );
}
