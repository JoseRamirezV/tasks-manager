import { AuthContext } from "@/context/AuthContext";
import {
  addNewTask,
  getUserTasks,
  deleteTasks as serviceDeleteTasks,
  updateTask,
} from "@/task/services/tasks";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import moment from "moment";
import { validateDates } from "../utils/datesValidator";

const useTasks = () => {
  const { email, token, isVerified } = useContext(AuthContext);
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
    if (!isVerified && newTask.notify) {
      triggerToast('Debes verificar tu cuenta para poder programar notificaciones')
      return
    }
    newTask.limitDate = moment(newTask.limitDate).format("YYYY-MM-DD 23:59")
    newTask.notificationDate = newTask.notificationDate && moment(newTask.notificationDate).format("YYYY-MM-DD HH:mm")
    const today = moment().format("YYYY-MM-DD HH:mm");
    
    const validDates = validateDates({
      today,
      limitDate: newTask.limitDate,
      notificationDate: newTask.notificationDate,
      notify: newTask.notify,
    }, triggerToast);

    if (!validDates) return;
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
  };

  const editTask = async (_id, newData) => {
    if (!isVerified && newData.notify) {
      triggerToast('Debes verificar tu cuenta para poder programar notificaciones')
      return
    }
    newData.limitDate = moment(newData.limitDate).format("YYYY-MM-DD 23:59")
    newData.notificationDate = newData.notificationDate && moment(newData.notificationDate).format("YYYY-MM-DD HH:mm")
    const today = moment().format("YYYY-MM-DD HH:mm");
    
    const validDates = validateDates({
      today,
      limitDate: newData.limitDate,
      notificationDate: newData.notificationDate,
      notify: newData.notify,
    }, triggerToast);

    if (!validDates) return {};

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
    return {ok: 'Created'}
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

  const triggerToast = (message) => {
    toast.warning("Advertencia", {
      description: message,
      duration: 2000,
    });
  };

  return {
    getTasks,
    addTask,
    deleteTasks,
    editTask,
    checkItem,
    checkAllItems,
    checkedItems,
    data,
  };
};

export default useTasks;
