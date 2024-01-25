// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const LoadingSpinner = () => {
  return <div>Loading...</div>;
}

const PrivateRoute  = ({ element, ...props }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  return isAuthenticated ? (
    React.cloneElement(element, props)
  ) : (
    <Navigate to="/login" replace />
  );
};



export default PrivateRoute;
