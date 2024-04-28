import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { Suspense, lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import PlusIcon from "@/icons/PlusIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import NoTasks from "@/tasks/components/NoTasks";
import TaskCard from "@/tasks/components/TaskCard";
import useTasks from "@/tasks/hooks/useTasks";
import TaskFormSkeleton from "../components/TaskFormSkeleton";

const TaskForm = lazy(() => import("@/tasks/components/TaskForm"));

export default function TasksPage() {
  const {
    getTasks,
    deleteTasks,
    addTask,
    editTask,
    checkItem,
    checkAllItems,
    data,
    checkedItems,
    email,
  } = useTasks();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderForm, setRenderForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allChecked = checkedItems.every((task) => task.checked === true);
  const isIndeterminate =
    checkedItems.some((task) => !!task.checked) && !allChecked;
  const selectedTasks = checkedItems.filter((check) => check.checked).length;

  useEffect(() => {
    if (email !== "") getTasks();
  }, [email]);

  const handleCheckAll = (e) => {
    checkAllItems(e.target.checked);
  };

  const handleDeleteTasks = () => {
    setIsLoading(true);
    deleteTasks().finally(() => setIsLoading(false));
  };

  const openForm = () => {
    setRenderForm(true);
    onOpen();
  };

  return (
    <>
      <Helmet>
        <title>Mis tareas | Taskty</title>
      </Helmet>
      <Box as="section" py={4}>
        <HStack justifyContent={"space-between"}>
          <Heading
            as={"h1"}
            ps="2"
            textAlign={"center"}
            fontSize={{ base: "lg", sm: "3xl" }}
          >
            Tareas
          </Heading>
          <HStack>
            <Button
              size={{ base: "xs", sm: "sm" }}
              leftIcon={<PlusIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={openForm}
            >
              Nueva
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={`Borrando${
                selectedTasks > 1 ? " selección" : ""
              }...`}
              size={{ base: "xs", sm: "sm" }}
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              variant="solid"
              onClick={handleDeleteTasks}
              isDisabled={checkedItems.every((item) => !item.checked)}
            >
              Eliminar {selectedTasks > 1 && "selección"}
            </Button>
            {checkedItems.some((item) => item.checked) && (
              <Tag>
                <Checkbox
                  name="checkAll"
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={handleCheckAll}
                >
                  {selectedTasks}
                </Checkbox>
              </Tag>
            )}
          </HStack>
        </HStack>
        <Divider mt={2} mb={4} borderColor="gray.400" />
        {data.length > 0 ? (
          <SimpleGrid columns={[1, null, 2]} spacing="2rem">
            {data.length > 0 &&
              data.map((data, i) => (
                <TaskCard
                  key={data._id}
                  index={i}
                  isChecked={checkedItems[i].checked}
                  task={data}
                  checkItem={checkItem}
                  checkedItems={checkedItems}
                  editTask={editTask}
                />
              ))}
          </SimpleGrid>
        ) : (
          <NoTasks />
        )}
      </Box>
      <Suspense fallback={<TaskFormSkeleton />}>
        {renderForm && (
          <TaskForm isOpen={isOpen} onClose={onClose} addTask={addTask} />
        )}
      </Suspense>
    </>
  );
}
