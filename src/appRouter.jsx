import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TaskRouter } from "./task/TaskRouter";
import { AuthContextPovider } from "./auth/context/AuthContext";
import { AuthRuter } from "./auth/AuthRuter";
import { Helmet } from "react-helmet-async";

export default function AppRouter() {
  return (
    <>
      <Helmet>
        <title>Taskty</title>
      </Helmet>
      <AuthContextPovider>
        <BrowserRouter>
          <Routes>
            <Route path={"auth/*"} element={<AuthRuter />} />
            <Route path={"/*"} element={<TaskRouter />} />
            <Route path={"*"} element={<h1>Error</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextPovider>
    </>
  );
}
