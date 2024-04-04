import { Center, Container } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

import { AuthContext } from "@/context/AuthContext";
import guard from "@/auth/utils/guard";
import ProfilePage from "@/tasks/Pages/ProfilePage";
import TasksPage from "@/tasks/Pages/TasksPage";
import Header from "@/tasks/components/Header";

export default function TaskRouter() {
  const { logout, login, _id } = useContext(AuthContext);
  const navigate = useNavigate();

  guard().then((res) => {
    if (!res || res?.error) {
      logout();
      navigate("/auth/sign-in", {
        state: res && {
          error: res.error,
        },
      });
    } else if (_id === "") {
      const userData = res;
      login({
        ...userData,
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
      <Center mt={10} mb={5}>
        &copy; 2023
      </Center>
      <Toaster richColors expand closeButton />
    </>
  );
}
