import React, { useState, useEffect } from "react";

import "../ProjectTracker.css"; // Import external CSS for responsiveness

const ProjectTracker = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [acceptedProjects, setAcceptedProjects] = useState([]);

  // Fetch projects from Flask backend
  useEffect(() => {
    fetch("https://shiva39.pythonanywhere.com/api/projects")
      .then((response) => response.json())
      .then((data) => setAssignedProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Function to handle project acceptance
  const handleAccept = (project) => {
    setAcceptedProjects([...acceptedProjects, project]);
    setAssignedProjects(
      assignedProjects.filter((p) => p.id !== project.id) // Remove accepted project from assigned list
    );
  };

  const handleComplete = async (project) => {
    try {
      const response = await fetch(
        `https://shiva39.pythonanywhere.com/api/projects/${project.id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Completed", score: 10 }), // Example score
        }
      );
      if (response.ok) {
        alert("Project marked as completed!");
        setAcceptedProjects(
          acceptedProjects.map((p) =>
            p.id === project.id ? { ...p, status: "Completed", score: 10 } : p
          )
        );
      } else {
        console.error("Failed to mark project as completed");
      }
    } catch (error) {
      console.error("Error completing project:", error);
    }
  };

  return (
    <div className="project-tracker">
      <h1>Project Tracker</h1>

      {/* Assigned Projects Section */}
      <div className="project-section">
        <h2>Assigned Projects</h2>
        {assignedProjects.length > 0 ? (
          <ul className="project-list">
            {assignedProjects.map((project) => (
              <li key={project.id} className="project-item">
                <span>{project.title}</span>
                <span>{project.description}</span>
                <span>{project.company_name}</span>
                <button
                  onClick={() => handleAccept(project)}
                  className="btn-accept"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects assigned.</p>
        )}
      </div>

      {/* Accepted Projects Section */}
      <div className="project-section">
        <h2>Accepted Projects</h2>
        {acceptedProjects.length > 0 ? (
          <ul className="project-list">
            {acceptedProjects.map((project) => (
              <li key={project.id} className="project-item">
                <span>{project.title}</span>
                <span>{project.company_name}</span>
                <button
                  onClick={() => handleComplete(project)}
                  className="btn-complete"
                >
                  Completed
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects accepted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectTracker;
