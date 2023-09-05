import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import useTasks from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";

const TasksPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTasks()
      .then(res => setData(res))
      .catch(() => setData([]))

    return () => {
      setData([]);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Mis tareas | Taskty</title>
      </Helmet>
      <Box as="section" py={4}>
        <Heading as={'h1'} width={'100%'} pb={6} textAlign={'center'}> Tareas </Heading>
        <SimpleGrid columns={[1, null, 2]} spacing="2rem">
          {data.length > 0 && data.map((data) => (<TaskCard key={data.id} task={data}/>))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default TasksPage;
