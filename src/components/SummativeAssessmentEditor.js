import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';  // Ensure you have Firebase authentication and Firestore setup
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// Subject mapping for each grade
const subjectsByGrade = {
  Nursery: ['Basic Math', 'Basic Science', 'Drawing', 'Rhymes'],
  UKG: ['Basic Math', 'Basic Science', 'Drawing', 'Rhymes'],
  1: ['Math', 'English', 'EVS', 'Hindi', 'Science'],
  2: ['Math', 'English', 'EVS', 'Hindi', 'Science'],
  3: ['Math', 'English', 'EVS', 'Hindi', 'Science'],
  4: ['Math', 'English', 'EVS', 'Hindi', 'Science'],
  5: ['Math', 'English', 'EVS', 'Hindi', 'Science'],
  6: ['Math', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science'],
  7: ['Math', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science'],
  8: ['Math', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science'],
  9: ['Math', 'English', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 'Computer Applications'],
  10: ['Math', 'English', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 'Computer Applications'],
  11: ['Physics', 'Chemistry', 'Math', 'Biology', 'Computer Science', 'Accountancy', 'Business Studies', 'Economics', 'History', 'Political Science', 'Geography'],
  12: ['Physics', 'Chemistry', 'Math', 'Biology', 'Computer Science', 'Accountancy', 'Business Studies', 'Economics', 'History', 'Political Science', 'Geography'],
};

const SummativeAssessmentEditor = () => {
  const [user] = useAuthState(auth); // Track current logged-in user
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState(Array(10).fill({ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Restrict access to admin
  useEffect(() => {
    if (!user || user.email !== 'hassan.6x@gmail.com') {
      alert('You do not have permission to access this page.');
      navigate('/'); // Redirect to homepage
    }
  }, [user, navigate]);

  // Fetch lessons based on selected grade and subject
  useEffect(() => {
    const fetchLessons = async () => {
      if (grade && subject) {
        const lessonQuery = query(collection(db, 'lessons'), where('grade', '==', grade), where('subject', '==', subject));
        const querySnapshot = await getDocs(lessonQuery);
        const fetchedLessons = querySnapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }));
        setLessons(fetchedLessons);
      }
    };

    fetchLessons();
  }, [grade, subject]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: [...updatedQuestions[questionIndex].options],
    };
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSaveAssessment = async () => {
    if (lessonId) {
      setLoading(true);
      try {
        const lessonDocRef = doc(db, 'lessons', lessonId);
        await updateDoc(lessonDocRef, { summativeAssessment: questions });
        alert('Summative Assessment added successfully');
        setLoading(false);
        navigate('/'); // Redirect to homepage or some other page after saving
      } catch (error) {
        console.error('Error saving assessment:', error);
        setLoading(false);
      }
    } else {
      alert('Please select a lesson to add the summative assessment.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Summative Assessment</h2>

      {/* Grade Selection */}
      <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full p-2 mb-4 border rounded">
        <option value="">Select Grade</option>
        {Object.keys(subjectsByGrade).map((gradeOption) => (
          <option key={gradeOption} value={gradeOption}>
            {gradeOption}
          </option>
        ))}
      </select>

      {/* Subject Selection */}
      <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 mb-4 border rounded">
        <option value="">Select Subject</option>
        {subjectsByGrade[grade]?.map((subjectOption) => (
          <option key={subjectOption} value={subjectOption}>
            {subjectOption}
          </option>
        ))}
      </select>

      {/* Lesson Selection */}
      <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} className="w-full p-2 mb-4 border rounded">
        <option value="">Select Lesson</option>
        {lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.title}
          </option>
        ))}
      </select>

      {/* Questions */}
      {questions.map((question, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Question {index + 1}</h3>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            placeholder={`Question ${index + 1}`}
            className="w-full p-2 mb-2 border rounded"
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
              className="w-full p-2 mb-2 border rounded"
            />
          ))}
          <select
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', parseInt(e.target.value))}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value={0}>Correct Answer: Option 1</option>
            <option value={1}>Correct Answer: Option 2</option>
            <option value={2}>Correct Answer: Option 3</option>
            <option value={3}>Correct Answer: Option 4</option>
          </select>
          <textarea
            value={question.explanation}
            onChange={(e) => handleQuestionChange(index, 'explanation', e.target.value)}
            placeholder="Explanation for the correct answer"
            className="w-full p-2 mb-4 border rounded h-24"
          />
          <hr className="mt-6" /> {/* Horizontal line for separation */}
        </div>
      ))}

      <button
        onClick={handleSaveAssessment}
        className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Summative Assessment'}
      </button>
    </div>
  );
};

export default SummativeAssessmentEditor;
