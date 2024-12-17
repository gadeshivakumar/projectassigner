import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddProjectForm from "./components/AddProjectForm";
import ProjectTracker from "./components/ProjectTracker";

import "./styles.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <h1>Project Management</h1>
          <ul>
            <li>
              <Link to="/add-project">Add Project</Link>
            </li>
            <li>
              <Link to="/projects">Project Tracker</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/add-project" element={<AddProjectForm />} />
          <Route path="/projects" element={<ProjectTracker />} />

          <Route
            path="/"
            element={<h2>Welcome to the Project Management App</h2>}
          />
        </Routes>

        {/* Theme Toggle */}
        <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "⛅"}</button>
      </div>
    </Router>
  );
}

export default App;
