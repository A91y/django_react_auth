// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
