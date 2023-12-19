import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks";

import PropTypes from "prop-types";

const TaskContext = createContext();

export const UseTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks mush be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async() => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }

  }

  const  createTask = async (task) => {
    const res = await createTaskRequest(task)
    console.log(res)
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
