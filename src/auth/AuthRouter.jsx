import { Center } from "@chakra-ui/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import ForgotPassPage from "@/auth/pages/ForgotPassPage";
import LoginPage from "@/auth/pages/LoginPage";


import SignUpPage from "./pages/SignUpPage";
import VerifyAccount from "@/auth/pages/VerifyAccount";
import { isAuthenticated } from "@/auth/services/users";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

export default function AuthRouter() {
  const { isLogged, token, email } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    isAuthenticated(token).then((authenticated) => {
      if (authenticated && isLogged) navigate("/");
    });
  });

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
        <Route path={""} exact element={<Navigate to={"sign-in"} />} />
      </Routes>
    </Center>
  );
}
