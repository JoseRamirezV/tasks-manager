import moment from "moment/moment";

const URL = "http://localhost:5000/api/tasks";

function calcDate(limitDate) {
  let limit = moment(limitDate, "YYYY-MM-DD");
  let today = moment();

  return Math.trunc((limit.diff(today, "hours") + 24) / 24);
}

function getToken() {
  return window.localStorage.getItem("token") || "";
}

export const getUserTasks = async (userId) => {
  const token = getToken();
  const res = await fetch(`${URL}/${userId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const tasks = await res.json();
  return tasks.reduce((acc, task) => {
    return acc.concat({
      id: task._id,
      title: task.title,
      description: task.description,
      limitDate: moment(task.limitDate).format("YYYY-MM-DD"),
      daysLeft: calcDate(task.limitDate),
      notificationDate: task.notificationDate,
      notify: task.notify,
      notified: task.notified,
    });
  }, []);
};

export const addNewTask = async (task) => {
  const token = getToken();
  const res = await fetch(`${URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const { error, id } = await res.json();
  const daysLeft = calcDate(task.limitDate);
  return { error, id, daysLeft };
};

export const deleteTasks = async (tasks) => {
  const token = getToken();
  if (!tasks) return;
  const res = await fetch(`${URL}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tasks),
  });
  const { error } = await res.json();
  return { error };
};

export const updateTask = async (task) => {
  const token = getToken();
  const { id } = task;
  const res = await fetch(`${URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const { error } = await res.json();
  task.daysLeft = calcDate(task.limitDate);
  return { error, task };
};
