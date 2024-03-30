import {
  Box,
  Flex,
  Link,
  Text,
  HStack,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext } from "react";
import { Link as LinkRD } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

/**
 * @function Header
 * @description Se encarga de renderizar la barra de navegación principal del modulo de tareas.
 * @author HaroldsCode
 */
export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(AuthContext);

  return (
    <Box
      bg={isOpen ? "gray.100" : "none"}
      px={4}
      as="header"
      maxW={"3xl"}
      mx={"auto"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box display={{ md: "none" }}>
          {isOpen ? (
            <AiOutlineClose onClick={isOpen ? onClose : onOpen} />
          ) : (
            <RxHamburgerMenu onClick={isOpen ? onClose : onOpen} />
          )}
        </Box>
        <HStack spacing={8} alignItems={"center"}>
          <Link as={LinkRD} to={"/"}>
            <Text fontWeight={"600"} color={"blue.400"}>
              Taskty.co
            </Text>
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link as={LinkRD} to={"profile"} fontWeight="bold" whiteSpace={'nowrap'} maxw={'8rem'} overflowX={'hidden'} textOverflow={'ellipsis'}>
              {user}
            </Link>
            <Link as={LinkRD} to={'/'}>
              Tareas
            </Link>
          </HStack>
        </HStack>
        <Link as={AiOutlineLogout} onClick={()=>{
          logout()
        }}></Link>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Link as={LinkRD} to={""}>
              Tareas
            </Link>
            <Link as={LinkRD} to={"profile"}>
              {user}
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
