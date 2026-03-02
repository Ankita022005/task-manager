const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    showToast("Please fill all required fields");
    return;
  }

  const url = isLogin
    ? "http://localhost:5000/api/auth/login"
    : "http://localhost:5000/api/auth/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      showToast(data.message || "Something went wrong");
      return;
    }

    if (isLogin) {
      localStorage.setItem("token", data.token);
      showToast("Login Successful 🎉");

      // ✅ ADD THIS LINE
      navigate("/dashboard");

    } else {
      showToast("Registration Successful 🚀");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });

  } catch (error) {
    showToast("Server Error ❌");
  }
};