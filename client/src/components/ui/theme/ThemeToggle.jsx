import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="dashboard-theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className={`transition-transform duration-300 ${isDark ? "rotate-12" : "rotate-0"}`}>
        {isDark ? <FiMoon size={18} /> : <FiSun size={18} />}
      </div>
      <span className="hidden md:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
