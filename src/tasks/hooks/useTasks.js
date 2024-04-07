import { AuthContext } from "@/context/AuthContext";
import {
  addNewTask,
  getUserTasks,
  deleteTasks as serviceDeleteTasks,
  updateTask,
} from "@/tasks/services/tasks";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import moment from "moment";
import { validateDates } from "@/tasks/utils/datesValidator";

const useTasks = () => {
  const { email, token, verified, logout } = useContext(AuthContext);
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
    const {userTasks, error} = await getUserTasks(email, token);

    if (error === '401') return toast.error("Error",{
      description: 'Acceso no autorizado, por favor vuelva a iniciar sesión',
      onDismiss: () => logout(),
      onAutoClose: () => logout()
    });

    if (error) return triggerToast(error);

    if(JSON.stringify(userTasks) === JSON.stringify(data)) return
    setData(userTasks);
    setCheckedItems(
      new Array(userTasks.length).fill({
        id: "",
        checked: false,
      })
    );
  };

  const addTask = async (newTask) => {
    if (!verified && newTask.notify) {
      triggerToast(
        "Debes verificar tu cuenta para poder programar notificaciones"
      );
      return;
    }
    const limitDate = moment(newTask.limitDate).format("YYYY-MM-DD 23:59");
    const notificationDate =
      newTask.notificationDate &&
      moment(newTask.notificationDate).format("YYYY-MM-DD HH:mm");
    const today = moment().format("YYYY-MM-DD HH:mm");

    const validDates = validateDates(
      {
        today,
        limitDate,
        notificationDate,
        notify: newTask.notify,
      },
      triggerToast
    );
    if (!validDates) return {};

    newTask.limitDate = limitDate;

    const { task: savedTask, error } = await addNewTask(newTask, token);
    if (error === '401') return toast.error("Error",{
      description: 'Acceso no autorizado, por favor vuelva a iniciar sesión',
      onDismiss: () => logout(),
      onAutoClose: () => logout()
    });

    if (error) {
      triggerToast(error);
      return {};
    }
    const newData = [...data, { ...savedTask }];

    setData(newData);
    setCheckedItems(
      new Array(newData.length).fill({
        id: "",
        checked: false,
      })
    );
    return { ok: true };
  };

  const editTask = async (_id, newData) => {
    if (!verified && newData.notify) {
      triggerToast(
        "Debes verificar tu cuenta para poder programar notificaciones"
      );
      return;
    }
    const limitDate = moment(newData.limitDate).format("YYYY-MM-DD 23:59");
    const notificationDate =
      newData.notificationDate &&
      moment(newData.notificationDate).format("YYYY-MM-DD HH:mm");
    const today = moment().format("YYYY-MM-DD HH:mm");

    const validDates = validateDates(
      {
        today,
        limitDate,
        notificationDate,
        notify: newData.notify,
      },
      triggerToast
    );

    if (!validDates) return {};
    newData.limitDate = limitDate;
    const { error, task } = await updateTask(_id, newData, token);
    if (error === '401') return toast.error("Error",{
      description: 'Acceso no autorizado, por favor vuelva a iniciar sesión',
      onDismiss: () => logout(),
      onAutoClose: () => logout()
    });
    if (error) {
      triggerToast(error);
      return {};
    }
    const taskIndex = data.findIndex((data) => data._id === task._id);
    setData((prevState) => {
      return [
        ...prevState.slice(0, taskIndex),
        task,
        ...prevState.slice(taskIndex + 1),
      ];
    });
    return { ok: "Created" };
  };

  const deleteTasks = () => {
    const tasksToDelete = checkedItems.reduce((acc, item) => {
      if (item.checked) acc.push(item.id);
      return acc;
    }, []);
    const { error } = serviceDeleteTasks(tasksToDelete, token);
    if (error === '401') return toast.error("Error",{
      description: 'Acceso no autorizado, por favor vuelva a iniciar sesión',
      onDismiss: () => logout(),
      onAutoClose: () => logout()
    });
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
    toast.error("Error", {
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
