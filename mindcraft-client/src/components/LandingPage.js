import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaRobot, FaChalkboardTeacher, FaAccessibleIcon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    { icon: <FaBookOpen />, title: 'K-12 Content', description: 'Comprehensive educational content for all grades' },
    { icon: <FaRobot />, title: 'AI-Powered Doubt Solving', description: 'Get instant clarification on your doubts' },
    { icon: <FaChalkboardTeacher />, title: 'Personalized Assessments', description: 'Track your progress with AI-generated tests' },
    { icon: <FaAccessibleIcon />, title: 'Accessible Learning', description: 'Inclusive design for all learners' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-indigo-600">EduTechIndia</div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-800 hover:text-indigo-600 transition duration-300">Home</a>
              <a href="#" className="text-gray-800 hover:text-indigo-600 transition duration-300">Courses</a>
              <a href="#" className="text-gray-800 hover:text-indigo-600 transition duration-300">About</a>
              <a href="#" className="text-gray-800 hover:text-indigo-600 transition duration-300">Contact</a>
            </div>
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current text-gray-800" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-white px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Courses</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Contact</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-gray-800"
          >
            Empowering Indian Students with AI-Enhanced Learning
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-gray-600"
          >
            Experience a new era of education with our cutting-edge platform
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            <Link to="/login">Login</Link>
          </motion.button>
        </section>

        {/* Our Features Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer"
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div className="text-4xl mb-4 text-indigo-600">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-indigo-600"
                    >
                      Learn more →
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Discover India's Rich Educational Heritage Section */}
        <section className="py-16 bg-indigo-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Discover India's Rich Educational Heritage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src="https://source.unsplash.com/random/800x600?india,education" alt="Indian education" className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Ancient Wisdom</h3>
                <p className="text-gray-600">Explore the roots of Indian knowledge systems and their relevance in modern education.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src="https://source.unsplash.com/random/800x600?technology,learning" alt="Modern learning" className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Cutting-edge Technology</h3>
                <p className="text-gray-600">Experience how AI and machine learning are revolutionizing the way we learn.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src="https://source.unsplash.com/random/800x600?diverse,students" alt="Diverse students" className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Inclusive Learning</h3>
                <p className="text-gray-600">Our platform caters to diverse learning needs, ensuring education for all.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Transform Your Learning Journey Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Ready to Transform Your Learning Journey?</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300"
            >
              Join EduTechIndia Today
            </motion.button>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-lg font-semibold mb-2">EduTechIndia</h3>
              <p className="text-sm">Empowering learners across India</p>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Courses</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0 text-center md:text-right">
              <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" aria-label="Facebook" className="hover:text-indigo-400 transition duration-300">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-indigo-400 transition duration-300">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 transition duration-300">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2023 EduTechIndia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
