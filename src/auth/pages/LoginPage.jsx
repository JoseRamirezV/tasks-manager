import { Box, Button } from "@chakra-ui/react"
import { useContext } from "react"

import { AuthContext } from "../context/AuthContext"

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
    <Box as="section">
      <Button onClick={handleLogin}>login</Button>
    </Box>
  )
}

export default LoginPage