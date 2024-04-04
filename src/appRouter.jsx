import { Helmet } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "@/context/AuthContext";
import AuthRouter from "@/auth/AuthRouter";
import TaskRouter from "@/tasks/TaskRouter";

export default function AppRouter() {
  return (
    <>
      <Helmet>
        <title>Taskty</title>
      </Helmet>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"auth/*"} element={<AuthRouter />} />
            <Route path={"/*"} element={<TaskRouter />} />
            <Route path={"*"} element={<h1>Error</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}
