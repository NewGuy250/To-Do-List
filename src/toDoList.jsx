import React, { useEffect, useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);
  function handleInputChange(e) {
    setNewTask(e.target.value);
  }
  function handleAddTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }
  function handleDeleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }
  function handleMoveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function handleMoveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
            <button
              className="move-btn"
              onClick={() => handleMoveTaskUp(index)}
            >
              UP
            </button>
            <button
              className="move-btn"
              onClick={() => handleMoveTaskDown(index)}
            >
              DOWN
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default ToDoList;