import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
// import { useState } from "react";

import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

export function MyEditableInput({
  type = "text",
  label,
  name,
  defaultValue = "",
}) {
  // const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => setShowPassword(!showPassword);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<AiOutlineCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<AiOutlineClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="md"
          icon={<AiOutlineEdit />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={defaultValue}
      fontSize="lg"
      isPreviewFocusable={false}
    >
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <HStack>
        <Input
          name={name}
          type={type}
          id={label}
          autoComplete="off"
          as={EditableInput}
        />
        <EditablePreview border="1px solid" p="1" width="75%" height="2.4rem" />
        <EditableControls />
      </HStack>
    </Editable>
  );
}
