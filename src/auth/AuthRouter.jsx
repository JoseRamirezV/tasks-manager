import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"

import { Guard } from "./utils/Guard"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ForgotPassPage from "./pages/ForgotPassPage"

export const AuthRouter = () => {
  if (Guard()) return <Navigate to={"/"}/>

  return (
    <Container as="main">
      <Routes>
        <Route path={"forgot-my-password"} exact element={<ForgotPassPage/>} />
        <Route path={"sign-up"} exact element={<SignUpPage/>} />
        <Route path={"sign-in"} exact element={<LoginPage/>} />
        <Route path={""} exact element={<Navigate to={'sign-in'}/>} />
      </Routes>
    </Container>      
  )
}
