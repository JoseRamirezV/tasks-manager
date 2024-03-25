import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import ForgotPassPage from "@/auth/pages/ForgotPassPage";
import LoginPage from "@/auth/pages/LoginPage";
import SignUpPage from "@/auth/pages/SignUpPage";
import { isAuthenticated } from "@/auth/services/users";

export const AuthRouter = () => {
  const { isLogged, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    isAuthenticated(token).then((authenticated) => {
      if (authenticated && isLogged) navigate("/");
    });
  });

  return (
    <Container as="main">
      <Routes>
        <Route path={"forgot-my-password"} exact element={<ForgotPassPage />} />
        <Route path={"sign-up"} exact element={<SignUpPage />} />
        <Route path={"sign-in"} exact element={<LoginPage />} />
        <Route path={""} exact element={<Navigate to={"sign-in"} />} />
      </Routes>
    </Container>
  );
};
