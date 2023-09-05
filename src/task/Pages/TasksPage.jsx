import { Box } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

const TasksPage = () => {
  return (
    <>
      <Helmet>
        <title>Mis tareas | Taskty</title>
      </Helmet>
      <Box as="section">Tareas</Box>
    </>
  )
}

export default TasksPage