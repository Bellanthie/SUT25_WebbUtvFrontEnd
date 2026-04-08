import ToDoList from "./ToDoList.jsx";
import "./App.css";

function App() {
  const startTasks = [];
  return <ToDoList title="To-Do-List" initialTasks={startTasks} />;
}
export default App;