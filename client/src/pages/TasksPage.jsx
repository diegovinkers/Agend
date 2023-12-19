import { useEffect } from "react";
import { UseTasks } from "../context/TaskContext";

function TaskPage() {
  const { getTasks, tasks } = UseTasks();
  useEffect(() => {
    getTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (tasks.length == 0) return (<h1>No tasks</h1>)
  
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <h1>{task.title}</h1> 
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskPage;
