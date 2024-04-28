const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const getToken = () => window.localStorage.getItem("token");

export const login = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/${email}&${password}`);
    if (!res) throw new Error("No pudimos conectar con el servidor");
    const { user, error, token } = await res.json();
    if (error) throw new Error(error);
    window.localStorage.setItem("token", token);
    return { userData: user };
  } catch (error) {
    console.log(error)
    if(error instanceof TypeError) return {error: "Algo salió mal..."}
    return { error: error.message };
  }
};

export const signUp = async (data) => {
  try {
    const temporalToken = generateTemporalToken();
    const res = await fetch(`${BASE_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        temporalToken,
        verificationUrl: `${window.location.origin}/#/auth/verify-account?email=${data.email}&token=${temporalToken}`,
      }),
    });
    if (!res.ok) throw new Error("No pudimos conectar con el servidor");
    const { success, error } = await res.json();
    if (error) throw new Error(error);
    return { success };
  } catch (error) {
    return { error: error.message };
  }
};

export const update = async ({ _id, data, needsVerification }) => {
  try {
    if (needsVerification) {
      needsVerification.temporalToken = generateTemporalToken();
      needsVerification.verificationUrl = `${window.location.origin}/#/auth/verify-account?email=${data.email}&token=${needsVerification.temporalToken}`;
    }
    const res = await fetch(`${BASE_URL}/update/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ ...data, needsVerification }),
    });
    if (!res) throw new Error("No pudimos conectar con el servidor");
    const { user, error } = await res.json();
    if (error) throw new Error(error);
    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteUser = async ({ _id, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/delete/${_id}&${password}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) throw new Error("No pudimos conectar con el servidor");
    const { ok, error } = await res.json();
    if (error) throw new Error(error);
    return { ok };
  } catch (error) {
    return { error: error.message };
  }
};

export const changePassword = async ({ _id, oldPassword, newPassword }) => {
  try {
    const res = await fetch(`${BASE_URL}/change-password/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    if (!res) throw new Error("No pudimos conectar con el servidor");
    const { ok, error} = await res.json();
    if(error) throw new Error(error)
    return { ok };
  } catch (error) {
    return { error: error.message };
  }
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
    if (!res.ok) throw new Error("No pudimos conectar con el servidor");
    const { ok, user, error } = await res.json();
    if (error) throw new Error(error);
    return { user, ok };
  } catch (error) {
    return { error: error.message };
  }
};

export const verifyToken = async () => {
  try {
    const res = await fetch(`${BASE_URL}/isLogged/${getToken()}`);
    if (res.status === 401) throw new Error("Acceso no autorizado");
    if (!res.ok) throw new Error("No pudimos conectar con el servidor");
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const verifyAccount = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res) throw new Error("No pudimos conectar con el servidor");
    const { error, user, token } = await res.json();
    if (error) throw new Error(error);
    window.localStorage.setItem("token", token);
    return { userData: user };
  } catch (error) {
    return { error: error.message };
  }
};

const generateTemporalToken = () =>
  Math.floor(Math.random() * (999999 - 100000) + 100000);
