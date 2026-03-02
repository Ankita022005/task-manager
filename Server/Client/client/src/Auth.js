import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast("Please fill all required fields");
      return;
    }

    if (isLogin) {
      showToast("Login Successful 🎉");
    } else {
      showToast("Registration Successful 🚀");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      
      {/* Dark Mode Toggle */}
      <div className="top-bar">
        <button className="dark-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Form Card */}
      <div className="card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p onClick={toggleForm} className="switch-text">
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>

      {/* Toast Notification */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;