const URL = "http://localhost:5000/api/users";

export const login = async (email, password) => {
  const res = await fetch(`${URL}/${email}&${password}`, {
    credentials: "include",
  });
  const { token, user, error } = await res.json();
  if (!user) return { error };
  return { userData: user, token };
};

export const isAuthenticated = async (token) => {
  if (!token) return;
  const res = await fetch(`${URL}/isLogged/${token}`);
  const { _id, email, user, verified, error } = await res.json();
  return { _id, user, email, token, verified, error };
};

export const signUp = async (data) => {
  const temporalToken = generateTemporalToken(100000, 999999);
  const res = await fetch(`${URL}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      temporalToken,
      verificationUrl: `${window.location.origin}/auth/verify-account?email=${data.email}&token=${temporalToken}`,
    }),
  });
  return await res.json();
};

export const verify = async (data) => {
  const res = await fetch(`${URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const { invalid, user } = await res.json();
  return { invalid, userData: user };
};

const generateTemporalToken = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);