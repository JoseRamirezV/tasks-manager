import moment from "moment/moment";
import tasksList from "../data.json";

function calcDate(limitDate) {
  let limit = moment(limitDate, "YYYY-MM-DD");
  let today = moment();

  return Math.trunc((limit.diff(today, "hours") + 24) / 24);
}

export const getUserTasks = async (id) => {
  // const res = await fetch("../data.json", {
  //   headers: { "Content-Type": "application/json", Accept: "application/json" },
  // });
  // if (!res.ok) return;
  // const data = await res.json();

  // if (data.length === 0) return data;

  // return data.reduce((acc, task) => {
  //   if (task.userId === id) {
  //     return acc.concat({
  //       id: task._id,
  //       title: task.title,
  //       description: task.description,
  //       daysLeft: calcDate(task.limitDate),
  //     });
  //   }
  //   return acc;
  // }, []);
  return tasksList.reduce((acc, task) => {
    if (task.userId === id) {
      return acc.concat({
        id: task._id,
        userId: task.userId,
        title: task.title,
        description: task.description,
        limitDate: task.limitDate,
        daysLeft: calcDate(task.limitDate),
      });
    }
    return acc;
  }, []);
};

export const addNewTask = async ({ userId, title, description, limitDate }) => {
  try {
    const res = {ok: 'ok'}
    if(!res.ok) throw new Error('Hubo un problema')
    const id = crypto.randomUUID();
    const newTask = {
      id,
      userId,
      title,
      description,
      limitDate,
      daysLeft: calcDate(limitDate),
    };
    return newTask;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTasks = (taskId) => {
  if (!taskId) return
  return {ok: 'Task deleted'};
};

export const updateTask = (task) => {
  task.daysLeft = calcDate(task.limitDate)
  return task
}
