import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

/**
 *
 * @param {TaskCard.PropTypes} task
 * @returns tarjeta conl ainformación de la tarea
 */
export const TaskCard = ({ task }) => {
  return (
    <Card key={task.id}>
      <CardHeader>
        <Heading as={'h3'} size="md">{task.title}</Heading>
        <Text readOnly fontStyle={'italic'} pt="2" fontSize="xs">
              { 
                task.leftDays === 0 
                ? "Hoy se cumple el tiempo ímite para finalizar tu tarea"
                : task.leftDays === 1
                  ? 'Queda 1 día'
                  : `Quedan ${task.leftDays} días`
              }
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
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    leftDays: PropTypes.number.isRequired,
  }).isRequired,
};
