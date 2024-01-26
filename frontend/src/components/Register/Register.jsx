import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await api.post("/login/", {
        email: formData.email,
        password: formData.password,
      });

      const { access, refresh, user } = loginResponse.data;

      // Store tokens and user data in local storage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login after registration successful");
      // Redirect or perform other actions as needed after successful login
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (loginError) {
      console.error(
        "Login after registration failed",
        loginError.response.data
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await api.post("/register/", formData);
      console.log(registerResponse.data);

      // After successful registration, attempt to log in
      await handleLogin();
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />

        <label>First Name:</label>
        <input type="text" name="firstName" onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="lastName" onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
