import "./App.css";
import { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col items-center py-6" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-6xl flex items-center justify-between px-4 md:px-0 mb-6">
        <h1 className="text-4xl font-bold mb-0" style={{ color: "var(--text)" }}>
          Monster Kanban
        </h1>
        <DarkModeToggle theme={theme} setTheme={setTheme} />
      </div>

      <KanbanBoard />
    </div>
  );
}
