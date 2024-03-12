import { Center, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { isAuthenticated } from "@/auth/services/users";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { ProfilePage } from "@/task/Pages/ProfilePage";
import TasksPage from "@/task/Pages/TasksPage";
import Header from "@/task/components/Header";

export const TaskRouter = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      logout()
      return navigate("/auth/sign-in",{ state: { error: "Tiempo de espera superado, por favor vuelva a iniciar sesión" } })
    }
    isAuthenticated(token).then((authenticated) => {
      if (!authenticated) {
        logout()
        return navigate("/auth/sign-in",{ error: "Tiempo de espera superado, por favor vuelva a iniciar sesión" })
      }
    });
  });

  return (
    <>
      <Header />
      <Container as="main" maxW={"3xl"} position={"relative"}>
        <Routes>
          <Route path="/:id" element={<TasksPage />} />
          <Route path={"profile"} exact element={<ProfilePage />} />
          <Route path={"*"} exact element={<Navigate to={""} />} />
        </Routes>
      </Container>
      <Center>&copy; 2023</Center>
    </>
  );
};
