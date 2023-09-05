import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as LinkRD } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
/**
 * @function Header
 * @description Se encarga de renderizar la barra de navegación prinpal del modulo de tareas.
 * @author HaroldsCode
 */
export const Header = () => {

  const { name, logout } = useContext(AuthContext);

  return (
    <Container
      as="header"
      maxW={"3xl"}
      p={"3"}
      bgColor={"#0f0"}
      display={"flex"}
      flexDir={"row"}
      flexWrap={"nowrap"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Link as={LinkRD} to="/">
        <Text fontWeight={'600'}>Taskty.co</Text>
      </Link>
      <Box as="nav">
        <Flex flexDir={'row'}  flexDirection={'row'} flexWrap={'nowrap'} gap={'1rem'}>
            <Link as={LinkRD} to={''}>Tareas</Link>
            <Link as={LinkRD} to={'profile'}>{name}</Link>
        </Flex>
      </Box>
      <Link onClick={logout}>Cerrar Sesión</Link>
    </Container>
  );
};
