import axios from "axios";

const API = "URL";

export const getTasks = (userId) => axios.get(`${API}/tasks/${userId}`);

export const addTaks = (task) => axios.post(`${API}/add`, task)

export const modifyTask = (taskId, newContent) => axios.put(`${API}/task/${taskId}`, newContent)

export const deleteTask = (taskId) => axios.delete(`${API}/task/${taskId}`)