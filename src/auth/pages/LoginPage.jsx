import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useContext } from "react"
import { Link as LinkRD } from 'react-router-dom'

import { AuthContext } from "../context/AuthContext"
import { Helmet } from 'react-helmet-async'

const LoginPage = () => {

  const { login } = useContext(AuthContext)

  function handleLogin(){
    login({
      name:'Harold',
      token: 'FD564DS5F64AS5FD6545656fds4654df5g46f',
      isLogged: true
    })
  }

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | Taskty</title>
      </Helmet>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={6} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading as="h1" fontSize={'4xl'}>Taskty.co</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>Iniciar Sesión</Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Número de teléfono</FormLabel>
                <Input type="tel" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={8}>
                <Stack
                  direction={'column'}
                  align={'center'}
                  justify={'space-between'}>
                  <Link as={LinkRD} to={'/auth/forgot-my-password'} color={'blue.400'}>Ovidé mi contraseña</Link>
                  <Link as={LinkRD} to={'/auth/sign-up'} color={'blue.400'}>Registrarme</Link>
                </Stack>
                <Button
                  onClick={handleLogin}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Iniciar sesión
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default LoginPage