import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "sonner";

import InfoCircle from "@/icons/InfoCircle";

export default function UpdateUserData({
  currentData,
  STATES,
  updateUserData,
}) {
  const [buttonState, setButtonState] = useState(STATES.default);
  const [showHelper, setShowHelper] = useState(false);

  const firstToUpperCase = (words) => {
    if (!words) return;
    for (const property in words) {
      const word = words[property];
      words[property] = `${word.charAt(0).toUpperCase()}${word
        .slice(1)
        .toLowerCase()}`;
    }
    return words;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, ...formData } = Object.fromEntries(
      new window.FormData(form)
    );
    const data = { ...firstToUpperCase(formData), email };
    const needsVerification = currentData.email !== email;
    if (JSON.stringify(data) === JSON.stringify(currentData)) {
      toast.info("Hmmm", {
        description: "No encuentro cambios a realizar 🤔",
      });
      return;
    }
    setButtonState(STATES.loading);
    const { error } = await updateUserData({
      data,
      needsVerification,
    });
    if (error) {
      setButtonState(STATES.error);
      setTimeout(() => {
        setButtonState(STATES.default);
      }, 2000);
      return;
    }
    setButtonState(STATES.success);
  };

  const resetButtonState = () => {
    if (buttonState !== STATES.loading) setButtonState(STATES.default);
  };

  return (
    <Stack as={"form"} spacing={4} mt={5} onSubmit={handleSubmit}>
      <span>
        <Heading as={"h2"} size={"md"} mb={2}>
          Datos Personales
        </Heading>
      </span>
      <HStack spacing={5}>
        <FormControl id="firstName" isRequired>
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>
            Primer nombre
          </FormLabel>
          <Input
            size={{ base: "sm", sm: "md" }}
            type="text"
            name="firstName"
            autoCapitalize="words"
            defaultValue={currentData.firstName}
            onChange={resetButtonState}
          />
        </FormControl>
        <FormControl id="middleName">
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>
            Segundo nombre
          </FormLabel>
          <Input
            size={{ base: "sm", sm: "md" }}
            type="text"
            name="secondName"
            autoCapitalize="words"
            defaultValue={currentData.secondName}
            onChange={resetButtonState}
          />
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl id="firstLastName" isRequired>
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>
            Primer apellido
          </FormLabel>
          <Input
            size={{ base: "sm", sm: "md" }}
            type="text"
            name="firstLastName"
            autoCapitalize="words"
            defaultValue={currentData.firstLastName}
            onChange={resetButtonState}
          />
        </FormControl>
        <FormControl id="secondLastName">
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>
            Segundo apellido
          </FormLabel>
          <Input
            size={{ base: "sm", sm: "md" }}
            type="text"
            name="secondLastName"
            autoCapitalize="words"
            defaultValue={currentData.secondLastName}
            onChange={resetButtonState}
          />
        </FormControl>
      </HStack>
      <HStack spacing={5} align={"end"}>
        <FormControl flex={"0 1 50%"} isRequired>
          <FormLabel fontSize={{ base: "sm", sm: "md" }}>Email</FormLabel>
          <InputGroup>
            <Input
              size={{ base: "sm", sm: "md" }}
              type="email"
              name="email"
              defaultValue={currentData.email}
              autoComplete="off"
              onChange={(e) => {
                resetButtonState();
                setShowHelper(e.currentTarget.value !== currentData.email);
              }}
            />
            <InputRightElement
              onClick={() => setShowHelper(!showHelper)}
              boxSize={{ base: 8, sm: 10 }}
              cursor={"pointer"}
            >
              <Tooltip
                label="Ten en cuenta que una vez modificado tu correo electrónico se cerrará sesión y deberás volver a verificar tu cuenta"
                rounded={"lg"}
                px={3}
                py={2}
                placement="top"
                isOpen={showHelper}
                shouldWrapChildren
                hasArrow
              >
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Mostrar advertencia de cambio de cuenta"
                  isRound
                  tabIndex={-1}
                  icon={<InfoCircle />}
                />
              </Tooltip>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          flex={"0 1 50%"}
          size={{ base: "sm", sm: "md" }}
          colorScheme={buttonState.schema}
          loadingText={STATES.loading.message}
          isLoading={buttonState === STATES.loading}
          isDisabled={
            buttonState === STATES.success || buttonState === STATES.error
          }
        >
          {buttonState.message}
        </Button>
      </HStack>
    </Stack>
  );
}
