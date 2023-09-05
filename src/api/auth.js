import axios from "axios";

const API = "URL";

export const registerRequest = (user) => axios.post(`${API}/add`, user);