import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
  const temp = {
    id: uuid(),
    title: "",
    description: "",
    priority: "low",
    status:"added",
    dueDate: "",
  };

  const [task, setTask] = useState(temp);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value, id: uuid() });
  };

  const submitTask = (e) => {
    e.preventDefault();
    setTasks({ ...tasks, added: [...tasks.added, task] });
    const list = { ...tasks, added: [...tasks.added, task]};
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  return (
    <div className="form-container">
      <form onSubmit={submitTask}>
        <div>
          <label className="form-label">Title</label>
          <input
            className="form-control"
            required
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={onChangeHandler}
            value={task?.title}
          />
        </div>

        <div>
          <label className="form-label">Description</label>
          <input
            className="form-control"
            required
            type="text"
            name="description"
            placeholder="Enter Description"
            onChange={onChangeHandler}
            value={task?.description}
          />
        </div>

        <div>
          <label className="form-label">Priority</label>
          <select
            className="form-control"
            required
            name="priority"
            onChange={onChangeHandler}
            value={task?.priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="form-label">Due Date</label>
          <input
            className="form-control"
            required
            type="date"
            name="dueDate"
            onChange={onChangeHandler}
            value={task?.dueDate}
          />
        </div>
        <div>
        <div className="submit-btn-container">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
