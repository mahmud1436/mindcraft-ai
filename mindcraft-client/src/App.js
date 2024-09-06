import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import LoginSignupForm from './components/LoginSignupForm'; // Add this
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Lesson from './components/Lesson';
import LessonEditor from './components/LessonEditor';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';  // Import Landing Page component

function App() {
  return (
    <Router>
      <Routes>
        {/* Set LandingPage as the default page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginSignupForm />} />  {/* Add login page route */}
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute adminOnly={true}><LessonEditor /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
