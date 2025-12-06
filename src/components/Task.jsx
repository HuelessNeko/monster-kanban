export default function Task({ task, from, onRemove }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify({ from, task }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-3 rounded-md shadow flex justify-between items-center cursor-grab transition"
      style={{ backgroundColor: "var(--task-bg)", color: "var(--text)", border: "1px solid var(--border)" }}
    >
      <p>{task.text}</p>
      {/* Remove Button */}
      <button
        onClick={() => onRemove(from, task.id)}
        className="text-sm ml-2"
        style={{ color: "var(--danger)" }}
      >
        ✖
      </button>
    </div>
  );
}
