import { useState } from "react";
import Monster from "./Monster";
import Task from "./Task";

export default function Column({
  title,
  color,
  tasks,
  onMove,
  onAdd,
  onRemove,
  name,
  monster,
}) {
  const [newTask, setNewTask] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    onMove(data.from, name, data.task);
  };

  const handleAdd = () => {
    if (newTask.trim() === "") return;
    onAdd(name, newTask);
    setNewTask("");
  };

  return (
    <div
      className="flex flex-col items-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Monster */}
      <Monster color={monster.color} height={monster.height} />

      {/* Board Column */}
      <div
        className="p-3 rounded-lg shadow w-full -mt-4"
        style={{ backgroundColor: `var(--col-${color})` }}
      >
        <h2 className="text-lg font-semibold mb-2 text-center" style={{ color: "var(--text)" }}>
          {title}
        </h2>

        {/* Tasks */}
        <div className="flex-1 space-y-2 mb-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-center italic" style={{ color: "var(--muted)" }}>
              No tasks yet
            </p>
          ) : (
            tasks.map((t) => (
              <Task key={t.id} task={t} from={name} onRemove={onRemove} />
            ))
          )}
        </div>

        {/* Add Task Box */}
        <div className="flex space-x-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-2 py-1 text-sm border rounded-md"
            placeholder="New Task..."
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
          <button
            onClick={handleAdd}
            className="text-sm px-3 rounded-md hover:opacity-90 transition"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
}
