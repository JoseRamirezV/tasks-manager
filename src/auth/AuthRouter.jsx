import { Center } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";

import ForgotPassPage from "@/auth/pages/ForgotPassPage";
import LoginPage from "@/auth/pages/LoginPage";

import VerifyAccount from "@/auth/pages/VerifyAccount";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import SignUpPage from "./pages/SignUpPage";

export default function AuthRouter() {
  const { isLogged, email } = useContext(AuthContext);

  if (isLogged) return <Navigate to={'/'}/>;

  return (
    <Center
      as="main"
      minH={"100vh"}
      bgGradient={
        "linear-gradient(to-r,#80808011 1px,transparent 1px),linear-gradient(to bottom,#80808011 1px,transparent 1px)"
      }
      bgSize={"14px 24px"}
    >
      <Routes>
        <Route path={"forgot-my-password"} exact element={<ForgotPassPage />} />
        <Route path={"sign-up"} exact element={<SignUpPage />} />
        <Route path={"sign-in"} exact element={<LoginPage />} />
        <Route
          path={"verify-account"}
          exact
          element={<VerifyAccount email={email} />}
        />
        <Route path={"*"} exact element={<Navigate to={"sign-in"}/>} />
      </Routes>
    </Center>
  );
}
