import {
  Heading,
  Highlight,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import CircleCheck from "@/icons/CircleCheck";

export default function Hero() {
  return (
    <VStack spacing={{ base: 4, sm: 8 }} flexBasis={"50%"}>
      <span>
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }}>
          <Highlight query={["Taskty.co!"]} styles={{ color: "blue.500" }}>
            Bienvenido a Taskty.co!
          </Highlight>
        </Heading>
        <Text fontSize={{ base: "lg", sm: "xl" }} mt={2}>
          ¿Alguna vez te has sentido abrumado por la cantidad de tareas
          pendientes que tienes? ¡No te preocupes más! Con nuestra plataforma,
          puedes guardar todas tus tareas pendientes de manera organizada y
          programar notificaciones que recibirás por correo electrónico para
          mantenerte al tanto de tus responsabilidades.
        </Text>
      </span>
      <List spacing={2} w={"full"}>
        <ListItem>
          <ListIcon as={CircleCheck} fill={"green.400"} />
          Mantente notificado
        </ListItem>
        <ListItem>
          <ListIcon as={CircleCheck} fill={"green.400"} />
          ¡Aumenta tu productividad
        </ListItem>
        <ListItem>
          <ListIcon as={CircleCheck} fill={"green.400"} />
          Reduce el estrés
        </ListItem>
      </List>
    </VStack>
  );
}
