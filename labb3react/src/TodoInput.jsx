function TodoInput({ newTask, onInputChange, onAddTask }) {
  return (
    <div>
      <input
        id="new-task"
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={onInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onAddTask();
          }
        }}
      />
      <button className="add-button" onClick={onAddTask}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;
