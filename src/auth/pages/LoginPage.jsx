import { Link as LinkRD } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogIn";

import {
  Box,
  Button,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Toaster } from "sonner";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const LoginPage = () => {
  const { authenticateUser } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const { cellphone, password } = Object.fromEntries(
      new window.FormData(form)
    );
    authenticateUser(cellphone, password);
  }

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | Taskty</title>
      </Helmet>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading as="h1" fontSize={"4xl"}>
              Taskty.co
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Iniciar Sesión
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleLogin}>
              <Stack spacing={4}>
                <FormControl id="phoneNumber" isRequired>
                  <FormLabel>Número de teléfono</FormLabel>
                  <Input type="tel" name="cellphone" autoComplete="off" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                    />
                    <InputRightElement>
                      <IconButton 
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        p={2}
                        size="sm"
                        variant='ghost'
                        aria-label="Toggle password visibility"
                        isRound
                        icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={8}>
                  <Stack
                    direction={"column"}
                    align={"center"}
                    justify={"space-between"}
                  >
                    <Link
                      as={LinkRD}
                      to={"/auth/forgot-my-password"}
                      color={"blue.400"}
                    >
                      Olvidé mi contraseña
                    </Link>
                    <Link as={LinkRD} to={"/auth/sign-up"} color={"blue.400"}>
                      Registrarme
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Iniciar sesión
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Toaster richColors closeButton position="top-center"/>
      </Flex>
    </>
  );
};

export default LoginPage;
