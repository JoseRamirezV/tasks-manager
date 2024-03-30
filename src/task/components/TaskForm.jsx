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
  taskToEditData,
  addTask,
  editTask,
}) {
  const [notify, setNotify] = useState(taskToEditData?.notify || false);
  const initialRef = useRef();
  const { email: userEmail } = useContext(AuthContext);

  const randomPlaceholder = Math.floor(
    Math.random() * TASK_PLACEHOLDERS.length
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { notify, notificationDate, ...rest } = Object.fromEntries(
      new window.FormData(form)
    );

    if (taskToEditData) {
      const { _id } = taskToEditData;
      const updatedTask = {
        userEmail,
        notify: !!notify,
        notificationDate: notify && notificationDate,
        ...rest,
      };
      editTask(_id, updatedTask).then(({ ok }) => {
        if (ok) closeForm();
      });
    } else {
      addTask({
        userEmail,
        notify: !!notify,
        notificationDate: notify ? notificationDate : null,
        ...rest,
      }).then(({ ok }) => {
        if (ok) closeForm();
      });
    }
  };

  const closeForm = () => {
    if (taskToEditData) setShowTaskForm(false);
    setNotify(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeForm}
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
                defaultValue={notify ? taskToEditData?.notificationDate : moment().format("YYYY-MM-DD HH:mm")}
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
              onClick={closeForm}
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
