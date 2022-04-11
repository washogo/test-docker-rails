import { CloseIcon } from "@chakra-ui/icons";
import { Checkbox, Flex, Text } from "@chakra-ui/react";

type Props = {
  id: number;
  name: string;
  is_done: boolean;
  index: number;
  toggleIsDone: (index: number, id: number) => void;
  destroyTask: (id: number) => void;
}

export const Task = (props: Props) => {
  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox
        isChecked={props.is_done}
        colorScheme="blue"
        size="lg"
        onChange={() => {
          props.toggleIsDone(props.index, props.id);
        }}
      >
        <Text>{props.name}</Text>
      </Checkbox>
      <CloseIcon onClick={() => props.destroyTask(props.id)} />
    </Flex>
  );
};