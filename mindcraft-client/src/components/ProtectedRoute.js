import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';  // Firebase Authentication

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin role logic
  const isAdmin = user.email === "hassan.6x@gmail.com";

  // Redirect non-admin users if trying to access admin-only route
  if (adminOnly && !isAdmin) {
    return <Navigate to="/courses" />;
  }

  // Redirect the admin to editor directly
  if (!adminOnly && isAdmin) {
    return <Navigate to="/editor" />;
  }

  return children;
};

export default ProtectedRoute;
