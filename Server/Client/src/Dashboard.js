import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // ✅ useCallback fixes ESLint warning
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: { Authorization: token },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;