import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SummativeAssessment = () => {
  const { id } = useParams(); // Lesson ID from URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Fetch lesson data
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, 'lessons', id));
        if (lessonDoc.exists()) {
          const lessonData = lessonDoc.data();
          setLesson(lessonData);

          // Assuming the lesson contains a `summativeAssessment` field with 10 questions
          const summativeQuestions = lessonData.summativeAssessment || [];
          setQuestions(summativeQuestions);
        } else {
          console.error('Lesson not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;

    // Calculate score
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
  };

  const handleComplete = () => {
    if (score > 5) {
      alert('Congratulations! You have successfully completed the lesson.');
      navigate(`/lesson-complete/${id}`);  // Navigate to a completion page or dashboard
    } else {
      alert('You need to score at least 6 to complete the lesson. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Loading assessment...</div>;
  }

  if (!lesson || questions.length === 0) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">No summative assessment available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Lesson Name */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{lesson.title} (Final Question)</h1>
          <p className="text-lg text-gray-600">{lesson.subject} - Grade {lesson.grade}</p>
        </div>

        {/* Questions Section */}
        <div className="mb-8">
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={selectedAnswers[index] === optionIndex}
                    onChange={() => handleAnswerChange(index, optionIndex)}
                  />
                  <label className="ml-2">{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition ease-in-out duration-200"
          >
            Submit
          </button>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mt-4">Your Score: {score} / 10</h3>
            {score > 5 ? (
              <p className="text-green-500 mt-2">Congratulations! You passed the assessment.</p>
            ) : (
              <p className="text-red-500 mt-2">You did not pass the assessment. Try again!</p>
            )}

            <button
              onClick={handleComplete}
              className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition ease-in-out duration-200"
            >
              Complete Chapter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummativeAssessment;
