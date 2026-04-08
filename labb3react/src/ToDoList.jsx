import { useEffect, useState } from "react"; // (object destructuring) useState hook from its location of 'react'

function ToDoList({ title, initialTasks }) {
  // 2 state variables --> permanent components we will always need:
  //tasks state variable
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Functions needed throughout program:
  function handleInputChange(event) {
    setNewTask(event.target.value); // in order to see what we're writing within 'enter a task...'
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
      //set it to be an emptry string to reset the users input
      // if i try and add an empty task--> the task won't add.
      // newTask.trim = clear all white spaces
    }
  }

  function removeTask(index) {
    // 'index' parameter-> logic for removing önskad task
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleTaskCompleted(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      //array desctructuring
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
    // 'index' parameter -> logic to move task up or down the priority list
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      //array desctructuring
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>{title}</h1>

      <div>
        <input
          id="new-task"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          //   use of Enter keyboardbutton
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTask();
            }
          }}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className={task.completed ? "text completed" : "text"}>
              {task.text}
            </span>
            <button onClick={() => toggleTaskCompleted(index)}>Done</button>
            <button className="remove-button" onClick={() => removeTask(index)}>
              🗑️
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              ⬆️
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              ⬇️
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default ToDoList;
