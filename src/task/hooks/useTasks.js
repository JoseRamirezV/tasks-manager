import {
  addNewTask,
  getUserTasks,
  deleteTasks as serviceDeleteTasks,
  updateTask,
} from "../services/tasks";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const useTasks = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([
    {
      id: "",
      checked: false,
    },
  ]);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    getTasks(id);
  }, []);

  const getTasks = async (id) => {
    const userTasks = await getUserTasks(id);
    setData(userTasks);
    setCheckedItems(
      new Array(userTasks.length).fill({
        id: "",
        checked: false,
      })
    );
  };

  const addTask = async ({ id, title, description, limitDate }) => {
    try {
      const newTask = await addNewTask({
        userId: id,
        title,
        description,
        limitDate,
      });

      const newData = [...data, newTask];
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

  const editTask = (task) => {
    const id = task.id;
    const taskIndex = data.findIndex((task) => task.id === id);
    updateTask(task);
    setData((prevState) => {
      return [
        ...prevState.slice(0, taskIndex),
        task,
        ...prevState.slice(taskIndex + 1),
      ];
    });
  };

  const deleteTasks = () => {
    const tasksToDelete = checkedItems.reduce((acc, check) => {
      if (check.checked) acc.push(check.id);
      return acc;
    }, []);
    if (!serviceDeleteTasks().ok) return;
    setData([...data.filter((task) => !tasksToDelete.includes(task.id))]);
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
      id: task.id,
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
