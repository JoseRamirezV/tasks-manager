import { createContext, useReducer } from "react"

/**
 * @description Estado inicial y objeto que define el contexto de autenticación
 */
export const InitialState = {
  name:'',
  token: '',
  isLogged: false
}

/**
 * @context AuthContext
 * @description Contexto de la autorización de los usuarios
 * @param state estado de la autenticación
 */
export const AuthContext = createContext(InitialState)

/**
 * @function reducer
 * @description Manupula el estado de la autentcación de los usuarios
 * @param {InitialState} state estadp de la autrización de os usuarios
 * @param {{payload: InitialState, type: ''}} action tipo de acción a realizar e información a cambiar
 * @returns {InitialState} nuevo estado de la autenticación
*/
// eslint-disable-next-line react-refresh/only-export-components
export function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return {...action.payload}
    case 'LOGOUT': return structuredClone(InitialState)
    default: throw Error('Unknown action: ' + action.type);
  }
}

// eslint-disable-next-line react/prop-types
export function AuthContextPovider({children}){
  const [state, dispatch] = useReducer(reducer, InitialState)

  function login(userSesion){
    dispatch({
      type: 'LOGIN',
      payload: userSesion
    })
  }

  function logout(){
    dispatch({
      type: 'LOGOUT',
    })
  }
  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout
    }}>{children}</AuthContext.Provider>
  )
}