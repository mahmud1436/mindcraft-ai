import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LessonDetailPage = () => {
  const { id } = useParams(); // Get lesson ID from URL
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPart, setCurrentPart] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, 'lessons', id));
        if (lessonDoc.exists()) {
          setLesson(lessonDoc.data());
        } else {
          console.error('Lesson not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    setShowExplanation(true);
    setIsAssessmentSubmitted(true);
    setWarningMessage('');  // Reset warning
  };

  const handleNext = () => {
    if (!isAssessmentSubmitted) {
      setWarningMessage('You must attempt the formative assessment to proceed.');
      return;
    }

    if (currentPart < lesson.parts.length - 1) {
      setCurrentPart(currentPart + 1);
      setIsAssessmentSubmitted(false);  // Reset for the next part
      setSelectedOption(null); // Reset options for the next part
      setShowExplanation(false); // Hide explanation for the next part
    } else {
      navigate(`/summative-assessment/${id}`);  // Navigate to the summative assessment at the end
    }
  };

  const handlePrevious = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
      setIsAssessmentSubmitted(false);  // Reset for the previous part
      setSelectedOption(null); // Reset options for the previous part
      setShowExplanation(false); // Hide explanation for the previous part
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading lesson details...</div>;
  }

  if (!lesson) {
    return <div className="flex justify-center items-center h-screen">Lesson not found</div>;
  }

  const currentLessonPart = lesson.parts[currentPart];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto flex space-x-8">
        {/* Lesson Content Section */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lesson.title} - Part {currentPart + 1}</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: currentLessonPart.content }} // Safely render HTML content
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPart === 0}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
            >
              {currentPart < lesson.parts.length - 1 ? 'Next' : 'Complete Chapter'}
            </button>
          </div>
          {warningMessage && <p className="text-red-500 mt-4">{warningMessage}</p>}
        </div>

        {/* Assessment Section */}
        {currentLessonPart.assessment && (
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Formative Assessment</h3>
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
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-lg">
                  {selectedOption === currentLessonPart.assessment.correctAnswer ? 'Correct Answer!' : 'Incorrect Answer.'}
                </p>
                <p className="mt-2">Explanation: {currentLessonPart.assessment.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
