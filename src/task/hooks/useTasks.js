import { AuthContext } from "@/context/AuthContext";
import {
  addNewTask,
  getUserTasks,
  deleteTasks as serviceDeleteTasks,
  updateTask,
} from "@/task/services/tasks";
import { useContext, useEffect, useState } from "react";

const useTasks = () => {
  const { email, token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([
    {
      id: "",
      checked: false,
    },
  ]);

  useEffect(() => {
    if (email !== "") getTasks();
  }, [email]);

  const getTasks = async () => {
    const userTasks = await getUserTasks(email, token);
    if (!userTasks) return;
    setData(userTasks);
    setCheckedItems(
      new Array(userTasks.length).fill({
        id: "",
        checked: false,
      })
    );
  };

  const addTask = async (newTask) => {
    try {
      const { _id, daysLeft, error } = await addNewTask(newTask, token);
      if (error) throw new Error();
      const newData = [...data, { _id, daysLeft, ...newTask }];
      setData(newData);

      setCheckedItems(
        new Array(newData.length).fill({
          id: "",
          checked: false,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (_id, newData) => {
    const { error, task } = await updateTask(_id, newData, token);
    if (error) return;
    const taskIndex = data.findIndex((data) => data._id === task._id);
    setData((prevState) => {
      return [
        ...prevState.slice(0, taskIndex),
        task,
        ...prevState.slice(taskIndex + 1),
      ];
    });
  };

  const deleteTasks = () => {
    const tasksToDelete = checkedItems.reduce((acc, item) => {
      if (item.checked) acc.push(item.id);
      return acc;
    }, []);
    const { error } = serviceDeleteTasks(tasksToDelete, token);
    if (error) return;
    setData([...data.filter((task) => !tasksToDelete.includes(task._id))]);
    checkAllItems(false);
  };

  const checkItem = (i, checked, id) => {
    setCheckedItems((prevState) =>
      [...prevState].toSpliced(i, 1, {
        id,
        checked,
      })
    );
  };

  const checkAllItems = (checked) => {
    const allTasks = data.map((task) => ({
      id: task._id,
      checked,
    }));
    setCheckedItems(allTasks);
  };

  return {
    getTasks,
    addTask,
    deleteTasks,
    checkItem,
    checkAllItems,
    editTask,
    checkedItems,
    data,
  };
};

export default useTasks;
