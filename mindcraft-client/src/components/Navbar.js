import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';  // Firebase config
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User logged out');
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <button onClick={handleLogout}>Logout</button>  {/* Logout Button */}
    </nav>
  );
};

export default Navbar;
