import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { "x-auth-token": token }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { "x-auth-token": token } }
    );
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers: { "x-auth-token": token } }
    );
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.title);
  };

  const saveEdit = async (id) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title: editText },
      { headers: { "x-auth-token": token } }
    );
    setEditId(null);
    setEditText("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Task Dashboard
        </h2>

        <button
          onClick={logout}
          className="mb-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Task"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center border-b py-2"
          >
            {editId === task._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <button
                  onClick={() => saveEdit(task._id)}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;