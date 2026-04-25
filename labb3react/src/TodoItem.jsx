// props-> info som skickas IN i en komponent utifrån.
function TodoItem({ task, index, onToggle, onRemove, onMoveUp, onMoveDown }) {
  return (
    <li>
      <span className={task.completed ? "text completed" : "text"}>
        {task.text}
      </span>
      <button onClick={() => onToggle(index)}>Done</button>
      <button className="remove-button" onClick={() => onRemove(index)}>
        🗑️
      </button>
      <button className="move-button" onClick={() => onMoveUp(index)}>
        ⬆️
      </button>
      <button className="move-button" onClick={() => onMoveDown(index)}>
        ⬇️
      </button>
    </li>
  );
}

export default TodoItem;
