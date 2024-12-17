import React, { useState } from "react";
import apiClient from "../api/apiClient";
import "../AddProjectForm.css";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/projects", formData);
      alert(response.data.message);
      setFormData({ title: "", description: "", company_name: "" }); // Clear the form after submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <h2>Add New Project</h2>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input-field"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input-field"
        ></textarea>
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
