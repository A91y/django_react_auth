import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      const { access, refresh, user } = response.data;

      // Store tokens and user data in local storage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login successful');
      setLoginSuccess(true); // Set login success to trigger navigation
    } catch (error) {
      console.error('Login failed', error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  if (loginSuccess) {
    // Redirect to '/dashboard' after successful login
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
