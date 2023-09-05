import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"

import { Guard } from "./utils/Guard"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ForgotPassPage from "./pages/ForgotPassPage"

export const AuthRuter = () => {
  if (Guard()) return <Navigate to={"/"}/>

  return (
    <Container as="main">
      <Routes>
        <Route path={"forgot-my-password"} exact element={<ForgotPassPage/>} />
        <Route path={"sign-up"} exact element={<SignupPage/>} />
        <Route path={"sign-in"} exact element={<LoginPage/>} />
        <Route path={""} exact element={<Navigate to={'sign-in'}/>} />
      </Routes>
    </Container>      
  )
}
