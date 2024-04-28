import { Modal, ModalContent, Skeleton, Spacer, Stack } from "@chakra-ui/react";

export default function TaskFormSkeleton() {
  return (
    <Modal isOpen={true} size={{ base: "xs", sm: "sm", xl: "md" }} preserveScrollBarGap={{ base: false, sm: true }}>
      <ModalContent>
        <Stack p={6} spacing={4}>
          <Skeleton h={"2rem"} w={"8rem"} rounded={"lg"} />
          <Skeleton h={"4rem"} rounded={"lg"} />
          <Skeleton h={"6rem"} rounded={"lg"} />
          <Skeleton h={"4rem"} rounded={"lg"} />
          <Skeleton h={"4rem"} rounded={"lg"} />
          <Stack direction={"row"}>
            <Skeleton h={"2rem"} w={"6rem"} rounded={"lg"} />
            <Spacer />
            <Skeleton h={"2rem"} w={"4rem"} rounded={"lg"} />
            <Skeleton h={"2rem"} w={"4rem"} rounded={"lg"} />
          </Stack>
        </Stack>
      </ModalContent>
    </Modal>
  );
}
