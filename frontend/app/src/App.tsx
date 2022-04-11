import React, { useState, useEffect } from "react";
import { Task } from "./component/Task";
import { Center, Box, CheckboxGroup, Text, Flex, Input, Button } from "@chakra-ui/react";
import axios from "axios";

type Task = {
  id: number;
  name: string;
  is_done: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    await axios.get("http://localhost:3001/tasks").then((res) => {
      setTasks(res.data);
    })
  };

  const createTask = async () => {
    await axios.post("http://localhost:3001/tasks", {
      name: name,
      is_done: false,
    });
    setName("");
    fetch();
  };

  const destroyTask = async (id: number) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  const toggleIsDone = async (index: number, id: number) => {
    const isDone = tasks[index].is_done;
    await axios.put(`http://localhost:3001/tasks/${id}`, {
      is_done: !isDone,
    });
    fetch();
  };

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <Flex mb="24px">
            <Input
              placeholder="タスク名を入力"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={task.id}
                  index={index}
                  id={task.id}
                  name={task.name}
                  is_done={task.is_done}
                  toggleIsDone={toggleIsDone}
                  destroyTask={destroyTask}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};


export default App;