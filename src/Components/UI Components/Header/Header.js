import { useEffect, useState } from "react";
import "./header.css";

function Header() {
  const [theme, setTheme] = useState("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="app-header">
      {/* <Logo /> */}
      <img src="logoImage-1.png" alt="Logo" className="logo" />
      <h1>The Islamic Quiz</h1>

      {/* 🌗 Modern Toggle Switch */}
      <label className="theme-switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider">
          <span className="icon">{theme === "dark" ? "🌙" : "☀️"}</span>
        </span>
      </label>
    </header>
  );
}

export default Header;
