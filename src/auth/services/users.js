const URL = 'http://localhost:5000/api/users'

export const login = async (email, password) => {
  const res = await fetch(`${URL}/${email}&${password}`,{
    credentials: "include"
  });
  const { token, user, error } = await res.json();
  return { user, token, error };
};

export const isAuthenticated = async (token) => {
  if (!token) return
  const res = await fetch(`${URL}/isLogged/${token}`)
  const { _id: id, email, user: name, error } = await res.json()
  return {id, name, email, token, error }
}

export const signUp = async (data) => {
  const res = await fetch(`${URL}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await res.json()
};

