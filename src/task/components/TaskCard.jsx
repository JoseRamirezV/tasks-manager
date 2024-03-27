import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Fade,
  HStack,
  Heading,
  Icon,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAlarm, MdOutlineAlarmOn } from "react-icons/md";

import { TaskForm } from "@/task/components/TaskForm";
import moment from "../config/moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/**
 *
 * @param {TaskCard.PropTypes} task
 * @returns tarjeta con la showTaskFormación de la tarea
 */
export const TaskCard = ({
  task,
  isChecked,
  index,
  checkItem,
  checkedItems,
  editTask,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modal,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [showTaskForm, setShowTaskForm] = useState(false);

  let allowClick = true;

  useEffect(() => {
    if (isChecked) {
      onOpen();
    } else {
      onClose();
    }
  }, [checkedItems]);

  const handleMouseLeave = () => {
    if (isChecked) return;
    onClose();
  };

  const handleMouseEnter = () => {
    onOpen();
  };

  const handleClick = (id) => {
    if (!allowClick) return;
    const newValue = checkedItems[index].checked;
    checkItem(index, !newValue, id);
  };

  const handleEdit = () => {
    setShowTaskForm(true);
    openModal();
  };
  return (
    <>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(task._id)}
        position={"relative"}
        cursor={"pointer"}
        h={'10rem'}
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
        <CardHeader pb={0} pt={3}>
          <Heading as={"h3"} size="md" noOfLines={1} w="85%" py={1}>
            {task.title}
          </Heading>
        </CardHeader>
        <CardBody py={0} overflow={'visible'}>
          <Text
            readOnly
            fontSize="sm"
            noOfLines={3}
            whiteSpace={"pre-line"}
          >
            {task.description}
          </Text>
        </CardBody>
        <CardFooter justify={"space-between"} gap={".5rem"}>
          <Text
            readOnly
            fontStyle={"italic"}
            fontSize={"xs"}
            color={task.daysLeft <= 0 ? "red" : "gray.600"}
          >
            {task.daysLeft < -1 &&
              `Fecha limite venció hace ${task.daysLeft * -1} días`}
            {task.daysLeft === -1 && `Fecha limite venció ayer`}
            {task.daysLeft === 0 && "Ultimo día"}
            {task.daysLeft === 1 && "Queda 1 día"}
            {task.daysLeft > 1 && `Quedan ${task.daysLeft} días`}
          </Text>
          <HStack pos={"absolute"} right={2} bottom={2} gap={1}>
            {task.notify && !task.notified && (
              <Tooltip
                label={`Se notificará ${moment(
                  task.notificationDate
                ).fromNow()}`}
                placement="top-end"
                bg={"gray.50"}
                color={"gray.700"}
                hasArrow
              >
                <span>
                  <Icon
                    as={MdOutlineAlarm}
                    opacity={0.5}
                    my={"auto"}
                    display={"block"}
                    boxSize={5}
                  />
                </span>
              </Tooltip>
            )}
            {task.notify && task.notified && (
              <Tooltip
                label={`Notificado ${moment(task.notificationDate).fromNow()}`}
                placement="top-end"
                bg={"gray.50"}
                color={"gray.700"}
                hasArrow
              >
                <span>
                  <Icon
                    as={MdOutlineAlarmOn}
                    color={"green.500"}
                    my={"auto"}
                    display={"block"}
                    boxSize={5}
                  />
                </span>
              </Tooltip>
            )}
            <Box
              as={"button"}
              onClick={handleEdit}
              p={2}
              transition={"all .2s ease"}
              _focus={{ color: "blue.500", outline: "none" }}
              _hover={{ color: "blue.500" }}
              onMouseOver={() => (allowClick = false)}
              onMouseLeave={() => (allowClick = true)}
            >
              <Icon as={AiOutlineEdit} boxSize={5} display={"block"} />
            </Box>
          </HStack>
        </CardFooter>
      </Card>
      {showTaskForm && (
        <TaskForm
          isOpen={modal}
          onClose={closeModal}
          setShowTaskForm={setShowTaskForm}
          taskToEditData={task}
          editTask={editTask}
        />
      )}
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    daysLeft: PropTypes.number.isRequired,
  }).isRequired,
};
