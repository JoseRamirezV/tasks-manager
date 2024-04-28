import { Center, Container, Spinner } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";

import Header from "@/tasks/components/Header";
import Guard from "@/utils/Guard";

const TasksPage = lazy(() => import("@/tasks/pages/TasksPage"));
const ProfilePage = lazy(() => import("@/tasks/pages/ProfilePage"));

export default function TaskRouter() {
  return (
    <>
      <Header />
      <Container as="main" maxW={"3xl"} position={"relative"}>
        <Routes>
          <Route element={<Guard />}>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <Center>
                      <Spinner />
                    </Center>
                  }
                >
                  <TasksPage />
                </Suspense>
              }
            />
            <Route
              path={"profile"}
              exact
              element={
                <Suspense
                  fallback={
                    <Center>
                      <Spinner size={"xl"} />
                    </Center>
                  }>
                  <ProfilePage />
                </Suspense>
              }
            />
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
