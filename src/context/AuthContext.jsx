import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

/**
 * @description Estado inicial y objeto que define el contexto de autenticación
 */
const InitialState = {
  _id: "",
  email: "",
  user: "",
  firstName: "",
  secondName: "",
  firstLastName: "",
  secondLastName: "",
  verified: false,
  isLogged: false,
};

/**
 * @context AuthContext
 * @description Contexto de la autorización de los usuarios
 * @param state estado de la autenticación
 */
export const AuthContext = createContext(InitialState);

/**
 * @function reducer
 * @description Manipula el estado de la autenticación de los usuarios
 * @param {InitialState} state estado de la autorización de os usuarios
 * @param {{payload: InitialState, type: ''}} action tipo de acción a realizar e información a cambiar
 * @returns {InitialState} nuevo estado de la autenticación
 */

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return structuredClone(InitialState);
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, InitialState);

  function login(userSession) {
    dispatch({
      type: "LOGIN",
      payload: userSession,
    });
  }

  function logout() {
    Cookies.remove("token");
    dispatch({
      type: "LOGOUT",
    });
  }
  
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
