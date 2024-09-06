import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';  
import LoginSignupForm from './components/LoginSignupForm';
import GradeSelectionPage from './components/GradeSelectionPage';  
import CourseSelectionPage from './components/CourseSelectionPage';  
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Lesson from './components/Lesson';
import LessonEditor from './components/LessonEditor';  // LessonEditor imported
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginSignupForm />} />
        <Route path="/grade-selection" element={<ProtectedRoute><GradeSelectionPage /></ProtectedRoute>} />
        <Route path="/courses/:grade" element={<ProtectedRoute><CourseSelectionPage /></ProtectedRoute>} />
        <Route path="/courses/:grade/:subject" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        {/* Adding the LessonEditor route */}
        <Route path="/editor" element={<ProtectedRoute isAdmin={true}><LessonEditor /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
