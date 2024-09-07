import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Assuming Firebase is configured here

const Navbar = () => {
  const [user, setUser] = useState(null); // Track logged-in user
  const [isAdmin, setIsAdmin] = useState(false); // Assuming you have a way to check for admin
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Set admin status if needed (you may fetch this from a Firestore document or check custom claims)
        // Example: setIsAdmin(currentUser.email === 'admin@example.com');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            MindCraft
          </Link>
        </div>

        {/* Links Section */}
        <div className="hidden md:flex space-x-8 items-center">
          {!isAdmin && (
            <Link to="/grade-selection" className="text-white hover:text-gray-300 transition ease-in-out duration-200 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Grade
            </Link>
          )}
          <Link to="/contact-us" className="text-white hover:text-gray-300 transition ease-in-out duration-200 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Contact Us
          </Link>

          {/* Conditional Authentication Links */}
          {user ? (
            <>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-200">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-200">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
