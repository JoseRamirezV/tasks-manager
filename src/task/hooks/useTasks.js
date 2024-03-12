import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addNewTask,
  getUserTasks,
  deleteTasks as serviceDeleteTasks,
  updateTask,
} from "@/task/services/tasks";

const useTasks = () => {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([
    {
      id: "",
      checked: false,
    },
  ]);
  const { id } = useParams();

  useEffect(() => {
    getTasks(id);
  }, []);

  // useEffect(() => {
  //     if (data.length > 0) {
  //       setCheckedItems(
  //         new Array(data.length).fill({
  //           id: "",
  //           checked: false,
  //         })
  //       );
  //     }
  //   }, [data]);

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

  const addTask = async (newTask) => {
    try {
      const { id, daysLeft, error } = await addNewTask(newTask);
      if (error) throw new Error();
      const newData = [...data, { id, daysLeft, ...newTask }];
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

  const editTask = async (task) => {
    const taskIndex = data.findIndex((data) => data.id === task.id);
    const { error, task: updatedTask } = await updateTask(task);
    if (error) return;
    setData((prevState) => {
      return [
        ...prevState.slice(0, taskIndex),
        updatedTask,
        ...prevState.slice(taskIndex + 1),
      ];
    });
  };

  const deleteTasks = () => {
    const tasksToDelete = checkedItems.reduce((acc, item) => {
      if (item.checked) acc.push(item.id);
      return acc;
    }, []);
    const { error } = serviceDeleteTasks(tasksToDelete);
    if (error) return;
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
