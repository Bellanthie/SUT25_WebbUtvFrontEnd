import ToDoList from "./ToDoList.jsx";
import "./App.css";

//root component renders into the root-div
//imports and renders TODO-LIST showing the title
//and the empty and ready tasks.
function App() {
  const startTasks = [];
  return <ToDoList title="To-Do-List" initialTasks={startTasks} />;
}
export default App;
