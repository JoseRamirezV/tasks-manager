import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link as LinkRD, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useLogin } from "../hooks/useLogIn";

export default function VerifyAccount() {
  const { state } = useLocation();
  const { verifyAccount } = useLogin();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const [data, setData] = useState({
    email: queryParameters.get("email"),
    code: queryParameters.get("token"),
  });

  useEffect(()=>{
    if (!state) {
      verifyAccount(data)
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new window.FormData(form).get("email");
    verifyAccount({ email, code: data.code });
  };

  return (
    <>
      <Helmet>
        <title>Verifica tu cuenta | Taskty</title>
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
              PIN de verificación
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  value={state ? state.email : data.email}
                  name="email"
                  size={"lg"}
                  opacity={0.5}
                  readOnly
                />
              </FormControl>
              <FormControl id="code" display={"flex"} gap={2} py={4}>
                <PinInput
                  value={data.code}
                  onChange={(value) =>
                    setData({ email: data.email, code: value })
                  }
                  size={"lg"}
                >
                  <PinInputField
                    required
                    readOnly={!state}
                    opacity={!state && 0.5}
                  />
                  <PinInputField
                    required
                    readOnly={!state}
                    opacity={!state && 0.5}
                  />
                  <PinInputField
                    required
                    readOnly={!state}
                    opacity={!state && 0.5}
                  />
                  <PinInputField
                    required
                    readOnly={!state}
                    opacity={!state && 0.5}
                  />
                  <PinInputField
                    required
                    readOnly={!state}
                    opacity={!state && 0.5}
                  />
                  <PinInputField
                    required
                    readOnly={!state}
                    opacity={!state && 0.5}
                  />
                </PinInput>
              </FormControl>
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
                Verificar
              </Button>
            </form>
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
