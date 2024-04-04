import { Heading, Text, VStack } from "@chakra-ui/react";

export default function NoTasks() {
  return (
    <>
      <VStack mt={10}>
        <Heading size={{base: 'sm', sm: 'md'}}>Aun no tienes tareas</Heading>
        <Text color={'gray'} textAlign={'center'}>Comienza a añadir presionando el botón &quot;Nueva&quot;</Text>
      </VStack>
    </>
  );
}
