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

export default function TaskForm({
  isOpen,
  onClose,
  taskToEditData,
  addTask,
  editTask,
}) {
  const { email: userEmail } = useContext(AuthContext);
  const initialRef = useRef();
  const [notify, setNotify] = useState(taskToEditData?.notify || false);
  const [isLoading, setIsLoading] = useState(false);

  const randomPlaceholder = Math.floor(
    Math.random() * TASK_PLACEHOLDERS.length
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { notify, notificationDate, ...rest } = Object.fromEntries(
      new window.FormData(form)
    );

    setIsLoading(true);

    if (taskToEditData) {
      const { _id } = taskToEditData;
      const updatedTask = {
        userEmail,
        notify: !!notify,
        notificationDate: notify && notificationDate,
        ...rest,
      };
      editTask(_id, updatedTask)
        .then(({ ok }) => {
          if (ok) closeForm();
        })
        .finally(() => setIsLoading(false));
    } else {
      addTask({
        userEmail,
        notify: !!notify,
        notificationDate: notify ? notificationDate : null,
        ...rest,
      })
        .then(({ ok }) => {
          if (ok) closeForm();
        })
        .finally(() => setIsLoading(false));
    }
  };

  const closeForm = () => {
    onClose();
    if (taskToEditData && taskToEditData.notify) return;
    setNotify(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeForm}
      initialFocusRef={initialRef}
      size={{ base: "xs", sm: "sm", xl: "md" }}
      preserveScrollBarGap={{ base: false, sm: true }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent rounded={"xl"} p={1}>
        <ModalHeader>{taskToEditData ? "Edición" : "Nueva tarea"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody display={"flex"} flexDir={"column"} gap={2}>
            <FormControl isRequired>
              <FormLabel>Titulo</FormLabel>
              <Input
                ref={initialRef}
                defaultValue={taskToEditData && taskToEditData.title}
                name="title"
                placeholder={TASK_PLACEHOLDERS[randomPlaceholder].title}
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                defaultValue={taskToEditData && taskToEditData.description}
                name="description"
                placeholder={TASK_PLACEHOLDERS[randomPlaceholder].description}
                size="sm"
                resize="none"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Fecha limite</FormLabel>
              <Input
                name="limitDate"
                type="date"
                defaultValue={taskToEditData?.limitDate}
                size="sm"
              />
            </FormControl>

            <FormControl isRequired={notify}>
              <FormLabel>Fecha de notificación</FormLabel>
              <Input
                name="notificationDate"
                type="datetime-local"
                isDisabled={!notify}
                size="sm"
                defaultValue={
                  notify && taskToEditData?.notificationDate
                    ? taskToEditData.notificationDate
                    : moment().format("YYYY-MM-DD HH:mm")
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2} pt={2}>
            <Checkbox
              defaultChecked={notify}
              flexGrow={1}
              name="notify"
              value={true}
              onChange={(e) => setNotify(e.currentTarget.checked)}
            >
              Notifícame
            </Checkbox>
            <Button
              isLoading={isLoading}
              loadingText="Guardando..."
              type="submit"
              colorScheme="blue"
              size={{ base: "xs", sm: "md" }}
            >
              Guardar
            </Button>
            <Button onClick={closeForm} size={{ base: "xs", sm: "md" }}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
