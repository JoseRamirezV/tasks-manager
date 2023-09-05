import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"

import { Guard } from "./utils/Guard"
import LoginPage from "./pages/LoginPage"

export const AuthRuter = () => {
  if (Guard()) return <Navigate to={"/"}/>

  return (
    <Container as="main">
      <Routes>
        <Route path={"forgot-my-password"} exact element={<h1>forgot-my-password</h1>} />
        <Route path={"register"} exact element={<h1>register</h1>} />
        <Route path={"login"} exact element={<LoginPage/>} />
        <Route path={""} exact element={<Navigate to={'login'}/>} />
      </Routes>
    </Container>      
  )
}
