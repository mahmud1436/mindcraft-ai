import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // If applicable
import Signup from './components/Signup';
import Login from './components/Login';
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
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute adminOnly={true}><LessonEditor /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
