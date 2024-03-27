import {
  Button,
  Flex,
  FormControl,
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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { firstName, secondName, firstLastName, secondLastName, ...data } =
      Object.fromEntries(new window.FormData(form));
    setIsLoading(true);
    await createUser({
      firstName: firstToUpperCase(firstName),
      secondName: firstToUpperCase(secondName),
      firstLastName: firstToUpperCase(firstLastName),
      secondLastName: firstToUpperCase(secondLastName),
      ...data,
    });
    setIsLoading(false);
  };

  const firstToUpperCase = (word) => {
    if(!word) return
    return word.replace(word[0], word[0].toUpperCase())
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
                <Input type="email" name="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? (
                        <Icon as={AiOutlineEye} />
                      ) : (
                        <Icon as={AiOutlineEyeInvisible} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Continuar
                </Button>
              </Stack>
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
