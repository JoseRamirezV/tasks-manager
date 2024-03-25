import moment from "moment";

const URL = "http://localhost:5000/api/tasks";

function calcDate(limitDate) {
  const limit = moment(limitDate, "YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");
  return limit.diff(today, "day");
}

export const getUserTasks = async (userEmail, token) => {
  if (!token) return;
  const res = await fetch(`${URL}/${userEmail}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const tasks = await res.json();
  if (tasks.error) return;
  return tasks.reduce((acc, task) => {
    return acc.concat({
      ...task,
      limitDate: moment(task.limitDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
      daysLeft: calcDate(task.limitDate),
      notificationDate: moment(task.notificationDate).format(
        "YYYY-MM-DD HH:mm"
      ),
    });
  }, []);
};

export const addNewTask = async (task, token) => {
  if (!token) return;
  const res = await fetch(`${URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const { error, _id } = await res.json();
  const daysLeft = calcDate(task.limitDate);
  return { error, _id, daysLeft };
};

export const deleteTasks = async (tasks, token) => {
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

export const updateTask = async (_id, newData, token) => {
  if (!token) return;
  const res = await fetch(`${URL}/update/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });
  const { error, task, rescheduled } = await res.json();
  task.limitDate = moment(task.limitDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  task.notificationDate = moment(task.notificationDate).format(
    "YYYY-MM-DD HH:mm"
  );
  task.daysLeft = calcDate(task.limitDate);
  return { error, task, rescheduled };
};
