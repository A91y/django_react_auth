import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Dashboard from '../components/Dashboard/Dashboard';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;