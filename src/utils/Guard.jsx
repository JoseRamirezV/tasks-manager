import { verifyToken } from "@/auth/services/users";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Guard() {
  const { login, logout, isLogged } = useContext(AuthContext);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      if (!token) return isLogged && logout();
      try {
        const res = await verifyToken();
        if (!res) throw new Error("Hubo una falla de conexión con el servidor");
        const { error, user } = res;
        if (error) throw new Error(error);
        login({ ...user, isLogged: true });
      } catch (error) {
        logout();
        navigate("/auth/sign-in", {
          state: {
            error: error.message,
          },
        });
        return;
      }
    })();
  }, []);

  if (!token) return <Navigate to={"auth/sign-in"} />;

  return <Outlet />;
}
