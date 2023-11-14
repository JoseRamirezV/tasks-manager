import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Fade,
  Heading,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

import PropTypes from "prop-types";
import { useEffect } from "react";
import { TaskForm } from "./TaskForm";

/**
 *
 * @param {TaskCard.PropTypes} task
 * @returns tarjeta con la información de la tarea
 */
export const TaskCard = ({
  task,
  isChecked,
  index,
  checkItem,
  checkedItems,
  editTask
}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modal,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: editFade,
    onOpen: editFadeOn,
    onClose: editFadeOff,
  } = useDisclosure();

  let allowClick = true;

  useEffect(() => {
    if (isChecked) {
      onOpen();
    } else {
      onClose();
    }
  }, [checkedItems]);

  const handleMouseLeave = () => {
    editFadeOff();
    if (isChecked) return;
    onClose();
  };

  const handleMouseOver = () => {
    onOpen();
    editFadeOn();
  };

  const handleClick = (id) => {
    if (!allowClick) return;
    const newValue = checkedItems[index].checked;
    checkItem(index, !newValue, id);
  };

  const handleEdit = () => {
    openModal();
  };

  return (
    <>
      <Card
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(task.id)}
        position={"relative"}
        cursor={"pointer"}
        transition={"all 0.2s ease"}
        _hover={{ transform: "scale(1.03)" }}
      >
        <Fade
          in={isOpen}
          style={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          <Checkbox
            isChecked={isChecked}
            id={task.id}
            style={{ pointerEvents: "none" }}
          />
        </Fade>
        <CardHeader>
          <Heading as={"h3"} size="md">
            {task.title}
          </Heading>
          <Text
            readOnly
            fontStyle={"italic"}
            pt="2"
            fontSize="xs"
            color={task.daysLeft <= 0 && "red"}
          >
            {task.daysLeft < 0 &&
              `Fecha limite venció hace ${task.daysLeft * -1} días`}
            {task.daysLeft === 0 &&
              "Hoy se cumple el tiempo límite para finalizar tu tarea"}
            {task.daysLeft === 1 && "Queda 1 día"}
            {task.daysLeft > 1 && `Quedan ${task.daysLeft} días`}
          </Text>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Text readOnly pt="2" fontSize="sm">
                {task.description}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <Fade
          in={editFade}
          style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
        >
          <Button
            borderRadius={"50%"}
            height={10}
            width={10}
            padding={0}
            onClick={handleEdit}
            onMouseOver={() => (allowClick = false)}
            onMouseLeave={() => (allowClick = true)}
          >
            <AiOutlineEdit />
          </Button>
        </Fade>
      </Card>
      <TaskForm isOpen={modal} onClose={closeModal} taskToEditData={task} editTask={editTask}/>
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    daysLeft: PropTypes.number.isRequired,
  }).isRequired,
};
