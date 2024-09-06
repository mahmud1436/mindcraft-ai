import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';  
import LoginSignupForm from './components/LoginSignupForm';
import GradeSelectionPage from './components/GradeSelectionPage';
import CourseSelectionPage from './components/CourseSelectionPage';
import Courses from './components/Courses';
import Lesson from './components/Lesson';
import LessonDetailPage from './components/LessonDetailPage'; // Assuming LessonDetailPage component
import LessonEditor from './components/LessonEditor'; // LessonEditor component
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
        <Route path="/units/:grade/:subject" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><LessonDetailPage /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><LessonEditor /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
