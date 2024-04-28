import moment from "moment";

const URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`;
const getToken = () => window.localStorage.getItem("token");

function calcDate(limitDate) {
  const limit = moment(moment(limitDate).format("YYYY-MM-DD 23:59"));
  const today = moment().format("YYYY-MM-DD 23:59");
  return limit.diff(today, "day");
}

export const getUserTasks = async (userEmail) => {
  if(!userEmail) return
  try {
    const res = await fetch(`${URL}/${userEmail}`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (res.status === 401) return { error: 401 };
    const tasks = await res.json();
    if (tasks.error) return;
    const userTasks = tasks.reduce((acc, task) => {
      return acc.concat({
        ...task,
        limitDate: moment(task.limitDate).format("YYYY-MM-DD"),
        daysLeft: calcDate(task.limitDate),
        notificationDate:
          task.notificationDate &&
          moment(task.notificationDate).format("YYYY-MM-DD HH:mm"),
      });
    }, []);
    return { userTasks };
  } catch (error) {
    return { error: "No pudimos conectar con el servidor" };
  }
};

export const addNewTask = async (task) => {
  try {
    const res = await fetch(`${URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: JSON.stringify(task),
    });
    if (res.status === 401) return { error: 401 };
    const { error, task: savedTask } = await res.json();
    const daysLeft = calcDate(task.limitDate);
    savedTask.daysLeft = daysLeft;
    savedTask.limitDate = moment(savedTask.limitDate).format("YYYY-MM-DD");
    savedTask.notificationDate =
      savedTask.notificationDate &&
      moment(savedTask.notificationDate).format("YYYY-MM-DD HH:mm");
    return { error, task: savedTask };
  } catch (error) {
    return { error: "No pudimos conectar con el servidor" };
  }
};

export const deleteTasks = async (tasks) => {
  try {
    if (!tasks) return;
    const res = await fetch(`${URL}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: JSON.stringify(tasks),
    });
    if (res.status === 401) return { error: 401 };
    const { error } = await res.json();
    return { error };
  } catch (error) {
    return { error: "No pudimos conectar con el servidor" };
  }
};

export const updateTask = async (_id, newData) => {
  try {
    const res = await fetch(`${URL}/update/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });
    if (!res) return { error: "Error del servidor" };
    if (res.status === 401) return { error: 401 };
    const { error, task, rescheduled } = await res.json();
    if (error) return { error };
    task.daysLeft = calcDate(task.limitDate);
    task.limitDate = moment(task.limitDate).format("YYYY-MM-DD");
    task.notificationDate =
      task.notificationDate &&
      moment(task.notificationDate).format("YYYY-MM-DD HH:mm");
    return { task, rescheduled };
  } catch (error) {
    return { error: "No pudimos conectar con el servidor" };
  }
};
