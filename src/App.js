import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import { useState, useEffect } from "react";

function App() {
  const initialState = {
    added: [],
    pending: [],
    completed: [],
  };
  const [tasks, setTasks] = useState(initialState);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    setTasks(tasks ? JSON.parse(tasks) : initialState);
  }, []);

  return (
    <div className="app-container">
      <h2 className="app-header">Task Management</h2>
      <div className="submit-btn-container">
        <button
          className={`${toggle ? "close-btn" : "add-btn"}`}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <span> &times; Close</span> : "+ Add New"}
        </button>
      </div>
      {toggle && <CreateTask tasks={tasks} setTasks={setTasks} />}
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
