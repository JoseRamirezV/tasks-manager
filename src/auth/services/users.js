const BASE_URL = "http://localhost:5000/api/users";

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/${email}&${password}`, {
    credentials: "include",
  });
  const { token, user, error } = await res.json();
  if (!user) return { error };
  return { userData: user, token };
};

export const signUp = async (data) => {
  const temporalToken = generateTemporalToken();
  const res = await fetch(`${BASE_URL}/signUp`, {
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
    needsVerification.temporalToken = generateTemporalToken();
    needsVerification.verificationUrl = `${window.location.origin}/auth/verify-account?email=${data.email}&token=${needsVerification.temporalToken}`;
  }
  const res = await fetch(`${BASE_URL}/update/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, needsVerification }),
  });
  return await res.json();
};

export const deleteUser = async ({ _id, token, password }) => {
  try {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );
    const res = await fetch(`${BASE_URL}/delete/${_id}&${password}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { ok, error } = await res.json();
    if (error) throw new Error(error);
    return { ok };
  } catch (error) {
    return { error: error.message };
  }
};

export const changePassword = async ({
  token,
  _id,
  oldPassword,
  newPassword,
}) => {
  const res = await fetch(`${BASE_URL}/change-password/${_id}`, {
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

export const passwordRecovery = async ({ email, code, newPassword }) => {
  try {
    const temporalToken = generateTemporalToken();
    const body = code ? { email, code, newPassword } : { email, temporalToken };
    const res = await fetch(`${BASE_URL}/forgot-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const { user, ok, error } = await res.json();
    if (error) throw error;
    return { user, ok };
  } catch (error) {
    throw { error };
  }
};

export const isAuthenticated = async (token) => {
  if (!token) return;
  const res = await fetch(`${BASE_URL}/isLogged/${token}`);
  const { error, ...userData } = await res.json();
  if (error) return { error };
  return userData;
};

export const verify = async (data) => {
  const res = await fetch(`${BASE_URL}/verify`, {
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

const generateTemporalToken = () =>
  Math.floor(Math.random() * (999999 - 100000) + 100000);
