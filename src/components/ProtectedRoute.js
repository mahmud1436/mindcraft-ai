import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';  // Make sure this import is correct and initialized

const ProtectedRoute = ({ children, isAdmin }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.email !== 'hassan.6x@gmail.com') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
