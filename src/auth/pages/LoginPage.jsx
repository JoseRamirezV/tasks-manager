import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link as LinkRD, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";

import Hero from "@/auth/components/Hero";
import { useLogin } from "@/auth/hooks/useLogIn";
import validateEmail from "@/auth/utils/validateEmail";
import { EyeIcon, EyeSlashIcon } from "@/icons/EyeIcons";

const LoginPage = () => {
  const { authenticateUser } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.error) {
      toast.error("Error", {
        description: state.error,
      });
      window.history.replaceState({}, "");
    }
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const { email, password } = Object.fromEntries(new window.FormData(form));
    if (!validateEmail(email)) {
      setIsInvalid(true);
      return;
    }
    setIsLoading(true);
    authenticateUser(email, password).finally(() => setIsLoading(false));
  }

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | Taskty</title>
      </Helmet>
      <Flex
        direction={{ base: "column", md: "row" }}
        w={"90%"}
        rowGap={8}
        p={4}
        m={4}
        align={"start"}
        justify={"space-around"}
        position={"relative"}
      >
        <Hero />
        <VStack
          rounded={"lg"}
          shadow={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          p={8}
        >
          <Heading fontSize={"lg"} py={2} color={"gray.600"}>
            Inicia Sesión
          </Heading>
          <form onSubmit={handleLogin}>
            <Flex direction={"column"} gap={4}>
              <FormControl isRequired isInvalid={isInvalid}>
                <FormLabel requiredIndicator={null}>
                  Correo electrónico
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  onChange={() => {
                    if (isInvalid) setIsInvalid(false);
                  }}
                />

                <FormErrorMessage>Email invalido</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel sx={{ "&>span": { display: "none" } }}>
                  Contraseña
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      p={2}
                      size="sm"
                      variant="ghost"
                      aria-label="Toggle password visibility"
                      tabIndex={-1}
                      isRound
                      icon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex
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
              </Flex>
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                Iniciar sesión
              </Button>
            </Flex>
          </form>
        </VStack>
        <span style={{ position: "absolute" }}>
          <Toaster richColors />
        </span>
      </Flex>
    </>
  );
};

export default LoginPage;
