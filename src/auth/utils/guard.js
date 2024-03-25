import { isAuthenticated } from "@/auth/services/users";
import Cookies from "js-cookie";

export default async function guard() {
  const { token } = Cookies.get();
  const res = await isAuthenticated(token);
  if (!res) return;
  const { id, name, email, error } = res;
  if (error) return { error: "Se desconectó del servidor, por favor inicie sesión de nuevo" };
  return { id, name, email, token };
}