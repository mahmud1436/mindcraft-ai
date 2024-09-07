import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';  
import LoginSignupForm from './components/LoginSignupForm';
import GradeSelectionPage from './components/GradeSelectionPage';
import CourseSelectionPage from './components/CourseSelectionPage';
import Courses from './components/Courses';
import Lesson from './components/Lesson';
import LessonDetailPage from './components/LessonDetailPage'; 
import LessonEditor from './components/LessonEditor'; 
import SummativeAssessmentEditor from './components/SummativeAssessmentEditor'; 
import SummativeAssessmentPage from './components/SummativeAssessmentPage'; // Import the Summative Assessment page
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
        <Route path="/summative-editor" element={<ProtectedRoute><SummativeAssessmentEditor /></ProtectedRoute>} />
        <Route path="/summative-assessment/:id" element={<ProtectedRoute><SummativeAssessmentPage /></ProtectedRoute>} /> {/* Add the Summative Assessment route */}
      </Routes>
    </div>
  );
}

export default App;
