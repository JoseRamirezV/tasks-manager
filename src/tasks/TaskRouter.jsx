import { Center, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import ProfilePage from "@/tasks/Pages/ProfilePage";
import TasksPage from "@/tasks/Pages/TasksPage";
import Header from "@/tasks/components/Header";
import Guard from "@/utils/Guard";

export default function TaskRouter() {
  return (
    <>
      <Header />
      <Container as="main" maxW={"3xl"} position={"relative"}>
        <Routes>
          <Route element={<Guard />}>
            <Route path="/" element={<TasksPage />} />
            <Route path={"profile"} exact element={<ProfilePage />} />
          </Route>
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
