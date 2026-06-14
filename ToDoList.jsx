import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

// REACT används för uppdatering av webbsidan automatiskt
// Komponenter->återanvändbara bitar av kod(mallar).TodoItem ritas om exakt likadant för varje uppgift
// Props-parametrar (task, index, onToggle, OnRemove)--> komponenterna kan prata med varandra
// useState->REACTS minne->sätt att komma ihåg saker mellan varje rendering/uppdatering
// useEffect-> "larmet"-när något specifikt förändras, spara det i localStorage
// Event->händelse användaren skapar:
// klicka (onClick), skriva i fält(onChange), trycker Enter(onKeyDown)

function TodoList({ title, initialTasks }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function removeTask(index) {
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
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
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
      <h1>{title}</h1>

      <TodoInput
        newTask={newTask}
        onInputChange={handleInputChange}
        onAddTask={addTask}
      />

      <ol>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            task={task}
            index={index}
            onToggle={toggleTaskCompleted}
            onRemove={removeTask}
            onMoveUp={moveTaskUp}
            onMoveDown={moveTaskDown}
          />
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
