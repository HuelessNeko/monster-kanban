import React from "react";

export default function DarkModeToggle({ theme, setTheme }) {
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded-md border"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
