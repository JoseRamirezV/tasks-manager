import { Center, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import guard from "@/auth/utils/guard";
import { AuthContext } from "@/context/AuthContext";
import { ProfilePage } from "@/task/Pages/ProfilePage";
import TasksPage from "@/task/Pages/TasksPage";
import Header from "@/task/components/Header";
import { useContext } from "react";

export const TaskRouter = () => {
  const { logout, login, id } = useContext(AuthContext);
  const navigate = useNavigate();

  guard().then((res) => {
    if (!res || res?.error) {
      logout();
      navigate("/auth/sign-in", {
        state: res && {
          error: res.error,
        },
      });
    } else if (id === "") {
      const { id, name, email, token } = res;
      login({
        id,
        email,
        name,
        token,
        isLogged: true,
      });
    }
  });

  return (
    <>
      <Header />
      <Container as="main" maxW={"3xl"} position={"relative"}>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path={"profile"} exact element={<ProfilePage />} />
          <Route path={"*"} exact element={<Navigate to={""} />} />
        </Routes>
      </Container>
      <Center>&copy; 2023</Center>
    </>
  );
};
