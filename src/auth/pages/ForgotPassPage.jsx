import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
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

import validateEmail from "@/auth/utils/validateEmail";
import { useLogin } from "@/auth/hooks/useLogIn";
import { EyeIcon, EyeSlashIcon } from "@/icons/EyeIcons";

export default function ForgotPassPage() {
  const { forgotPassword } = useLogin();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isInvalid, setIsInvalid] = useState();
  const [showPassword, setShowPassword] = useState({
    password: false,
    verification: false,
  });
  const pinInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password, passVerification } = Object.fromEntries(
      new window.FormData(form)
    );
    if (!validateEmail(email)) return setIsInvalid(true);
    const code = pinInput.current;
    const { error } = await forgotPassword({
      email,
      code,
      password,
      passVerification,
    });
    if (error) return;
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
          w={{ base: "xs", sm: "md" }}
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
              <FormControl isInvalid={isInvalid} isReadOnly={showCodeInput}>
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
                  <Stack spacing={4} px={1}>
                    <FormControl
                      id="code"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <PinInput
                        size={{ base: "sm", sm: "lg" }}
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
                      <InputGroup>
                        <Input
                          name="password"
                          type={showPassword.password ? "text" : "password"}
                          textAlign={"center"}
                          placeholder="Contraseña"
                        />
                        <InputRightElement>
                          <IconButton
                            size={"sm"}
                            variant={"ghost"}
                            aria-label="Toggle password visibility"
                            isRound
                            tabIndex={-1}
                            onClick={() =>
                              setShowPassword((showPassword) => ({
                                ...showPassword,
                                password: !showPassword.password,
                              }))
                            }
                            icon={
                              showPassword.password ? (
                                <Icon as={EyeSlashIcon} />
                              ) : (
                                <Icon as={EyeIcon} />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <Input
                          name="passVerification"
                          type={showPassword.verification ? "text" : "password"}
                          textAlign={"center"}
                          placeholder="Contraseña"
                        />
                        <InputRightElement>
                          <IconButton
                            size={"sm"}
                            variant={"ghost"}
                            aria-label="Toggle password visibility"
                            isRound
                            tabIndex={-1}
                            onClick={() =>
                              setShowPassword((showPassword) => ({
                                ...showPassword,
                                verification: !showPassword.verification,
                              }))
                            }
                            icon={
                              showPassword.verification ? (
                                <Icon as={EyeSlashIcon} />
                              ) : (
                                <Icon as={EyeIcon} />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
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
