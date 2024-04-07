const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/${email}&${password}`, {
    credentials: "include",
  });
  const { user, error } = await res.json();
  if (!user) return { error };
  return { userData: user };
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
      verificationUrl: `${window.location.origin}/tasks-manager/#/auth/verify-account?email=${data.email}&token=${temporalToken}`,
    }),
  });
  return await res.json();
};

export const update = async ({ _id, data, needsVerification }) => {
  if (needsVerification) {
    needsVerification.temporalToken = generateTemporalToken();
    needsVerification.verificationUrl = `${window.location.origin}/auth/verify-account?email=${data.email}&token=${needsVerification.temporalToken}`;
  }
  const res = await fetch(`${BASE_URL}/update/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ ...data, needsVerification }),
  });
  return await res.json();
};

export const deleteUser = async ({ _id, password }) => {
  try {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3000)
    );
    const res = await fetch(`${BASE_URL}/delete/${_id}&${password}`, {
      method: "DELETE",
      credentials: "include",
    });
    const { ok, error } = await res.json();
    if (error) throw new Error(error);
    return { ok };
  } catch (error) {
    return { error: error.message };
  }
};

export const changePassword = async ({ _id, oldPassword, newPassword }) => {
  const res = await fetch(`${BASE_URL}/change-password/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
    const { ok, user, error } = await res.json();
    if (error) throw new Error(error);
    return { user, ok };
  } catch (error) {
    return { error: error.message };
  }
};

export const verifyToken = async () => {
  const res = await fetch(`${BASE_URL}/isLogged`, {
    credentials: "include",
  });
  return await res.json();
};

export const verifyAccount = async (data) => {
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
