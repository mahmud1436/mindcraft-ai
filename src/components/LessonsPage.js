import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore setup

const LessonPage = () => {
  const { grade, subject, id } = useParams(); // Get grade, subject, and optional lesson ID from URL
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPart, setCurrentPart] = useState(0); // For lesson parts navigation
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const navigate = useNavigate();

  // Fetch all lessons based on grade and subject
  useEffect(() => {
    const fetchLessons = async () => {
      if (!id) {  // If no lesson ID is passed, list the lessons
        const lessonsQuery = query(
          collection(db, 'lessons'),
          where('grade', '==', grade),
          where('subject', '==', subject)
        );
        const lessonsSnapshot = await getDocs(lessonsQuery);
        const lessonsData = lessonsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsData);
        setLoading(false);
      } else { // If lesson ID is present, fetch the specific lesson content
        const lessonDoc = await getDoc(doc(db, 'lessons', id));
        if (lessonDoc.exists()) {
          setLesson(lessonDoc.data());
        } else {
          console.error('Lesson not found');
        }
        setLoading(false);
      }
    };

    fetchLessons();
  }, [grade, subject, id]);

  // Display lesson list if no specific lesson is selected
  if (!id) {
    if (loading) {
      return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Loading lessons...</div>;
    }

    if (lessons.length === 0) {
      return <div className="flex justify-center items-center h-screen text-xl text-gray-700">No lessons found for this subject.</div>;
    }

    return (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8">Lessons for {subject} (Grade {grade})</h1>
          <ul>
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-indigo-100"
                onClick={() => navigate(`/lessons/${lesson.id}`)} // Navigate to the specific lesson
              >
                <h2 className="text-2xl font-semibold">{lesson.title}</h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // If a specific lesson is selected, display its content
  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    setIsAssessmentSubmitted(true);
    setWarningMessage(''); // Reset warning after submission
  };

  const handleNextPart = () => {
    if (!isAssessmentSubmitted) {
      setWarningMessage('Please submit the assessment to proceed.');
      return;
    }
    if (currentPart < lesson.parts.length - 1) {
      setCurrentPart(currentPart + 1);
      setIsAssessmentSubmitted(false);
      setSelectedOption(null); // Reset options for the next part
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Loading lesson...</div>;
  }

  if (!lesson) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Lesson not found</div>;
  }

  const lessonParts = lesson.parts || [];

  if (lessonParts.length === 0) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">No parts available for this lesson.</div>;
  }

  const currentLessonPart = lessonParts[currentPart]; // Get current lesson part

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{lesson.title}</h1>
          <p className="text-lg text-gray-600">{lesson.subject} - Grade {lesson.grade}</p>
        </div>

        {/* Lesson Content Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lesson Part {currentPart + 1}</h2>
          <div
            className="prose prose-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: currentLessonPart.content }} // Safely render HTML content
          />
        </div>

        {/* Formative Assessment Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Formative Assessment</h3>
          <p className="text-lg mb-4">{currentLessonPart.assessment.question}</p>
          {currentLessonPart.assessment.options.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                name="option"
                value={index}
                checked={selectedOption === index}
                onChange={() => handleOptionChange(index)}
              />
              <label className="ml-2">{option}</label>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
          >
            Submit
          </button>
          {warningMessage && <p className="text-red-500 mt-4">{warningMessage}</p>}
        </div>

        {/* Next/Previous Buttons */}
        <div className="mt-8 flex justify-between">
          {currentPart > 0 && (
            <button
              className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition ease-in-out duration-200"
              onClick={() => setCurrentPart(currentPart - 1)}
            >
              Previous
            </button>
          )}
          {currentPart < lesson.parts.length - 1 && (
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition ease-in-out duration-200"
              onClick={handleNextPart}
            >
              Next Part
            </button>
          )}
          {currentPart === lesson.parts.length - 1 && (
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition ease-in-out duration-200"
              onClick={() => alert('Chapter Complete! Proceed to summative assessment.')}
            >
              Complete Chapter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
