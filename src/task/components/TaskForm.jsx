import {
  Button,
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
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  addTask,
  taskToEditData,
  editTask,
}) {
  const { id } = useContext(AuthContext);
  const initialRef = useRef();

  const randomPlaceholder = Math.floor(
    Math.random() * TASK_PLACEHOLDERS.length
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { title, description, limitDate } = Object.fromEntries(
      new window.FormData(form)
    );
    if (taskToEditData) {
      const { id, userId } = taskToEditData;
      const updatedTask = {
        id,
        userId,
        title,
        description,
        limitDate,
      };
      editTask(updatedTask);
    } else {
      addTask({ id, title, description, limitDate });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new task</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Task Title</FormLabel>
              <Input
                ref={initialRef}
                defaultValue={taskToEditData && taskToEditData.title}
                name="title"
                placeholder={TASK_PLACEHOLDERS[randomPlaceholder].title}
                size="sm"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                defaultValue={taskToEditData && taskToEditData.description}
                name="description"
                placeholder={TASK_PLACEHOLDERS[randomPlaceholder].description}
                size="sm"
                resize="none"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Limit Date</FormLabel>
              <Input
                name="limitDate"
                type="date"
                defaultValue={taskToEditData && taskToEditData.limitDate}
              ></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              {taskToEditData ? "Edit" : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
