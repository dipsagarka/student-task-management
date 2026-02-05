import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const Navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchData();
    };
    loadTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    // localStorage.removeItem("authData");
    // localStorage.clear();
    Navigate("/Login");
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h1>MY TASKS</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
