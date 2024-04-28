import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Suspense, lazy, useContext } from "react";

const ForgotPassPage = lazy(() => import("@/auth/pages/ForgotPassPage"));
const LoginPage = lazy(() => import("@/auth/pages/LoginPage"));
const VerifyAccount = lazy(() => import("@/auth/pages/VerifyAccount"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));

export default function AuthRouter() {
  const { isLogged, email } = useContext(AuthContext);

  if (isLogged) return <Navigate to={"/"} />;

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
        <Route
          path={"forgot-my-password"}
          exact
          element={
            <Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <ForgotPassPage />
            </Suspense>
          }
        />
        <Route
          path={"sign-up"}
          exact
          element={
            <Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path={"sign-in"}
          exact
          element={
            <Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path={"verify-account"}
          exact
          element={
            <Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <VerifyAccount email={email} />
            </Suspense>
          }
        />
        <Route path={"*"} exact element={<Navigate to={"sign-in"} />} />
      </Routes>
    </Center>
  );
}
