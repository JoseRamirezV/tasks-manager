import { Helmet } from "react-helmet-async";
import { HashRouter, Route, Routes } from "react-router-dom";

import AuthRouter from "@/auth/AuthRouter";
import { AuthContextProvider } from "@/context/AuthContext";
import TaskRouter from "@/tasks/TaskRouter";

export default function AppRouter() {
  return (
    <>
      <Helmet>
        <title>Taskty</title>
      </Helmet>
      <AuthContextProvider>
        <HashRouter>
          <Routes>
            <Route path={"auth/*"} element={<AuthRouter />} />
            <Route path={"/*"} element={<TaskRouter />} />
            <Route path={"*"} element={<h1>Error</h1>} />
          </Routes>
        </HashRouter>
      </AuthContextProvider>
    </>
  );
}
