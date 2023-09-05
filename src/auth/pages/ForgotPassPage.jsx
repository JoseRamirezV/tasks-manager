import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Link as LinkRD } from 'react-router-dom'

export default function ForgotPassPage() {
  return (
    <>
      <Helmet>
        <title>Olvidé mi contraseña | Taskty</title>
      </Helmet>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack
          spacing={6}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Stack align={'center'}>
            <Heading as="h1" fontSize={'4xl'}>Taskty.co</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>Has olvidado tu contraseña?</Text>
          </Stack>
          <FormControl id="email">
            <Input
              textAlign={'center'}
              placeholder="3161581011"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={4} align={'center'}>
            <Button
              width={'100%'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Realizar petición
            </Button>
            <Link
              as={LinkRD}
              to={'/auth/sign-in'}
              color={'blue.400'}>
              Cancelar
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}
