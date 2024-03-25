import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import moment from "moment";
import { useContext, useRef, useState } from "react";
import { toast } from "sonner";

const TASK_PLACEHOLDERS = [
  {
    title: "Get a new pair of...",
    description: "Must be red and pretty...",
  },
  {
    title: "Hide Body",
    description: "...",
  },
  {
    title: "Find a new hairstylist",
    description: "Preferably near home",
  },
  {
    title: "Don't forget to send... ",
    description: "Very important!!",
  },
];

export function TaskForm({
  isOpen,
  onClose,
  setShowTaskForm,
  addTask,
  taskToEditData,
  editTask,
}) {
  const { email: userEmail } = useContext(AuthContext);
  const [notify, setNotify] = useState(taskToEditData?.notify || false);
  const initialRef = useRef();

  const randomPlaceholder = Math.floor(
    Math.random() * TASK_PLACEHOLDERS.length
  );

  const triggerToast = (message) => {
    toast.warning("Advertencia", {
      description: message,
      duration: 2000,
    });
  };

  const validateDates = (limit, notification) => {
    const today = moment();
    const notified = taskToEditData?.notified;
    const limitDate = moment(limit).format("YYYY-MM-DD");
    const notificationDate = moment(notification).format("YYYY-MM-DD HH:mm");
    const oldNotificationDate = moment(taskToEditData?.notificationDate).format(
      "YYYY-MM-DD HH:mm"
    );
    const validLimitDate = limitDate >= today.format("YYYY-MM-DD");
    const validNotificationDate =
      !notify ||
      (!notified && notificationDate > today.format("YYYY-MM-DD HH:mm")) ||
      (notified && oldNotificationDate < notificationDate);

    if (!validLimitDate)
      triggerToast("Las fecha limite no puede ser días anteriores a hoy");

    if (!validNotificationDate)
      triggerToast(
        "Las fecha y hora de notificación no pueden ser menores a la fecha y hora actual"
      );
    return validLimitDate && validNotificationDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { title, description, limitDate, notify, notificationDate } =
      Object.fromEntries(new window.FormData(form));
    if (!validateDates(limitDate, notificationDate)) return;
    if (taskToEditData) {
      const { _id } = taskToEditData;
      const updatedTask = {
        userEmail,
        title,
        description,
        limitDate,
        notify: !!notify,
        notificationDate: notify ? notificationDate : null,
      };
      editTask(_id, updatedTask);
    } else {
      addTask({
        userEmail,
        title,
        description,
        limitDate,
        notify: !!notify,
        notificationDate: notify ? notificationDate : null,
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (taskToEditData) setShowTaskForm(false);
        onClose();
      }}
      initialFocusRef={initialRef}
      size={{ base: "xs", sm: "md" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"} p={1}>
        <ModalHeader>{taskToEditData ? "Edit task" : "New task"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody display={"flex"} flexDir={"column"} gap={2}>
            <FormControl isRequired>
              <FormLabel>Task Title</FormLabel>
              <Input
                ref={initialRef}
                defaultValue={taskToEditData && taskToEditData.title}
                name="title"
                placeholder={TASK_PLACEHOLDERS[randomPlaceholder].title}
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                defaultValue={taskToEditData && taskToEditData.description}
                name="description"
                placeholder={TASK_PLACEHOLDERS[randomPlaceholder].description}
                size="sm"
                resize="none"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Limit Date</FormLabel>
              <Input
                name="limitDate"
                type="date"
                defaultValue={taskToEditData?.limitDate}
              ></Input>
            </FormControl>

            <FormControl isRequired={notify}>
              <FormLabel>Notification Date</FormLabel>
              <Input
                name="notificationDate"
                type="datetime-local"
                defaultValue={
                  taskToEditData
                    ? moment(taskToEditData?.notificationDate).format('YYYY-MM-DD HH:mm')
                    : moment().add(3, "d").format('YYYY-MM-DD HH:mm')
                }
                isDisabled={!notify}
              ></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2}>
            <Checkbox
              defaultChecked={notify}
              flexGrow={1}
              name="notify"
              value={true}
              onChange={(e) => setNotify(e.currentTarget.checked)}
            >
              Notify me
            </Checkbox>
            <Button
              type="submit"
              colorScheme="blue"
              size={{ base: "xs", sm: "sm" }}
            >
              {taskToEditData ? "Confirm" : "Save"}
            </Button>
            <Button
              onClick={() => {
                if (taskToEditData) setShowTaskForm(false);
                onClose();
              }}
              size={{ base: "xs", sm: "sm" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
