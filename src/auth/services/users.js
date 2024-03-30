const URL = "http://localhost:5000/api/users";

export const login = async (email, password) => {
  const res = await fetch(`${URL}/${email}&${password}`, {
    credentials: "include",
  });
  const { token, user, error } = await res.json();
  if (!user) return { error };
  return { userData: user, token };
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

export const update = async ({ token, _id, data, needsVerification }) => {
  if (needsVerification) {
    needsVerification.temporalToken = generateTemporalToken(100000, 999999);
    needsVerification.verificationUrl = `${window.location.origin}/auth/verify-account?email=${data.email}&token=${needsVerification.temporalToken}`;
  }
  const res = await fetch(`${URL}/update/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, needsVerification }),
  });
  return await res.json();
};

export const changePassword = async ({
  token,
  _id,
  oldPassword,
  newPassword,
}) => {
  const res = await fetch(`${URL}/change-password/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  const status = await res.json();
  return status;
};

export const isAuthenticated = async (token) => {
  if (!token) return;
  const res = await fetch(`${URL}/isLogged/${token}`);
  const { error, ...userData } = await res.json();
  if (error) return { error };
  return userData;
};

export const verify = async (data) => {
  const res = await fetch(`${URL}/verify`, {
    method: "PUT",
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
