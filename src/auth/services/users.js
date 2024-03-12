const URL = 'http://localhost:5000/api/users'

export const login = async (cellphone, password) => {
  const res = await fetch(`${URL}/${cellphone}&${password}`);
  const { token, user, error } = await res.json();
  return { user, token, error };
};

export const isAuthenticated = async (token) => {
  const res = await fetch(`${URL}/isLogged/${token}`)
  return await res.json()
}
