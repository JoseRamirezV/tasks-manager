import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link as LinkRD } from "react-router-dom";
import { Toaster } from "sonner";
import { useLogin } from "../hooks/useLogIn";
import validateEmail from "../utils/validateEmail";

export default function SignUpPage() {
  const { createUser } = useLogin();
  const [showPassword, setShowPassword] = useState({
    password: false,
    verification: false,
  });
  const [isInvalid, setIsInvalid] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const firstToUpperCase = (words) => {
    if (!words) return;
    for (const property in words) {
      const word = words[property];
      words[property] = `${word.charAt(0).toUpperCase()}${word
        .slice(1)
        .toLowerCase()}`;
    }
    return words;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password, passwordVerification, ...userName } =
      Object.fromEntries(new window.FormData(form));
    if (!validateEmail(email)) return setIsInvalid(true);
    setIsLoading(true);
    await createUser({
      ...firstToUpperCase(userName),
      email,
      password,
      passwordVerification,
    });
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Registrarme | Taskty</title>
      </Helmet>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading as="h1" fontSize={"4xl"}>
              Taskty.co
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Sign Up
            </Text>
          </Stack>
          <Stack
            spacing={4}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <HStack>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Primer nombre</FormLabel>
                  <Input type="text" name="firstName" />
                </FormControl>
                <FormControl id="middleName">
                  <FormLabel>Segundo nombre</FormLabel>
                  <Input type="text" name="secondName" />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl id="firstLastName" isRequired>
                  <FormLabel>Primer apellido</FormLabel>
                  <Input type="text" name="firstLastName" />
                </FormControl>
                <FormControl id="secondLastName">
                  <FormLabel>Segundo apellido</FormLabel>
                  <Input type="text" name="secondLastName" />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={() => {
                    if (isInvalid) setIsInvalid(false);
                  }}
                />
                <FormErrorMessage>Correo invalido</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      tabIndex={-1}
                      onClick={() =>
                        setShowPassword((showPassword) => ({
                          ...showPassword,
                          password: !showPassword.password,
                        }))
                      }
                    >
                      {showPassword.password ? (
                        <Icon as={AiOutlineEye} />
                      ) : (
                        <Icon as={AiOutlineEyeInvisible} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup mt={4}>
                  <Input
                    type={showPassword.verification ? "text" : "password"}
                    name="passwordVerification"
                    placeholder="Verifica contraseña"
                  />
                  <InputRightElement h={"full"}>
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
                isLoading={isLoading}
                type="submit"
                loadingText="Submitting"
                size="lg"
                w="full"
                mt={4}
                colorScheme="blue"
              >
                Registrarse
              </Button>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                ¿Ya tienes una cuenta?{" "}
                <Link color={"blue.400"} as={LinkRD} to={"/auth/sign-in"}>
                  Iniciar sesión
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Toaster richColors closeButton />
    </>
  );
}
