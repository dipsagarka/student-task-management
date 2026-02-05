import React, { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    duedate: "",
    priority: "low",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.id = "Task ID is required";
    if (!formData.title.trim()) newErrors.title = "Task title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.duedate) newErrors.duedate = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      duedate: "",
      priority: "low",
    });
    setErrors({});
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTask = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      dueDate: formData.duedate,
      priority: formData.priority,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const savedTask = await response.json();

      // Save to localStorage
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      localStorage.setItem(
        "tasks",
        JSON.stringify([...existingTasks, savedTask])
      );

      alert("Task added successfully!");

      setFormData({
        id: "",
        title: "",
        description: "",
        duedate: "",
        priority: "low",
      });
      setErrors({});

      // Dashboard update
      onTaskAdded(savedTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="add-task-card">
      <h2 style={{ marginBottom: "15px" }}>Add New Task</h2>

      <form onSubmit={handleAddTask}>
        {/* Task ID */}
        <div>
          <input
            style={{ marginBottom: "6px", backgroundColor: "rgb(31 32 52 / 50%)" }}
            type="text"
            name="id"
            placeholder="Task ID"
            value={formData.id}
            onChange={handleInputChange}
          />
          {errors.id && <span className="error-msg">{errors.id}</span>}
        </div>

        {/* Title */}
        <div>
          <input
            style={{ marginBottom: "6px", backgroundColor: "rgb(31 32 52 / 50%)" }}
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        {/* Description */}
        <div>
          <textarea
            style={{ backgroundColor: "rgb(31 32 52 / 50%)" }}
            name="description"
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error-msg">{errors.description}</span>
          )}
        </div>

        {/* Due Date + Priority */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input
              style={{ backgroundColor: "rgb(31 32 52 / 50%)" }}
              type="date"
              name="duedate"
              value={formData.duedate}
              onChange={handleInputChange}
            />
            {errors.duedate && (
              <span className="error-msg">{errors.duedate}</span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <select
              style={{ backgroundColor: "rgb(31 32 52 / 50%)" }}
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="form-actions"
          style={{ display: "flex", gap: "10px", marginTop: "10px" }}
        >
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            Add Task
          </button>

          <button
            type="button"
            className="btn-secondary"
            style={{ flex: 1, backgroundColor: "rgb(31 32 52 / 50%)" }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;