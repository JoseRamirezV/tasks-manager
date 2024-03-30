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
import { Helmet } from "react-helmet-async";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

import { TaskCard } from "@/task/components/TaskCard";
import { TaskForm } from "@/task/components/TaskForm";
import useTasks from "@/task/hooks/useTasks";

const TasksPage = () => {
  const {
    addTask,
    editTask,
    deleteTasks,
    checkItem,
    checkAllItems,
    data,
    checkedItems,
  } = useTasks();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const allChecked = checkedItems.every((task) => task.checked === true);
  const isIndeterminate =
    checkedItems.some((task) => task.checked === true) && !allChecked;

  const handleCheckAll = (e) => {
    checkAllItems(e.target.checked);
  };

  return (
    <>
      <Helmet>
        <title>Mis tareas | Taskty</title>
      </Helmet>
      <Box as="section" py={4}>
        <HStack justifyContent={"space-between"}>
          <Heading as={"h1"} ps="2" textAlign={"center"}>
            Tareas
          </Heading>
          <HStack>
            <Button
              size={{ base: "xs", sm: "sm" }}
              leftIcon={<AiOutlinePlus />}
              colorScheme="teal"
              variant="solid"
              onClick={onOpen}
            >
              <span style={{ height: "1rem" }}>Add New</span>
            </Button>
            <Button
              size={{ base: "xs", sm: "sm" }}
              leftIcon={<AiOutlineDelete />}
              colorScheme="red"
              variant="solid"
              onClick={deleteTasks}
              isDisabled={checkedItems.every((item) => !item.checked)}
            >
              <span style={{ height: "1rem" }}>Delete Selected</span>
            </Button>
            {checkedItems.some((item) => item.checked) && (
              <Checkbox
                name="checkAll"
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={handleCheckAll}
              >
                <Tag>
                  {[...checkedItems.filter((check) => check.checked)].length}
                </Tag>
              </Checkbox>
            )}
          </HStack>
        </HStack>
        <Divider mt={2} mb={4} borderColor="#bdbdbd" />
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
      </Box>
      <TaskForm isOpen={isOpen} onClose={onClose} addTask={addTask} />
    </>
  );
};

export default TasksPage;
