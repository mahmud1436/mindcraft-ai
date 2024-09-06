import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LessonDetailPage = () => {
  const { id } = useParams(); // Get lesson ID from URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

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
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading lesson details...</div>;
  }

  if (!lesson) {
    return <div className="flex justify-center items-center h-screen">Lesson not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto flex space-x-8">
        {/* Lesson Content Section */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lesson.title}</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: lesson.content }} // Safely render HTML content
          />
        </div>

        {/* Assessment Section */}
        {lesson.assessment && (
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Formative Assessment</h3>
            <p className="text-lg mb-4">{lesson.assessment.question}</p>
            {lesson.assessment.options.map((option, index) => (
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
                  {selectedOption === lesson.assessment.correctAnswer ? 'Correct Answer!' : 'Incorrect Answer.'}
                </p>
                <p className="mt-2">Explanation: {lesson.assessment.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
