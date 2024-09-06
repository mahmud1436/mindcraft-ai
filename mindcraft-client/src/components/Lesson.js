import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore instance

const Lesson = () => {
  const { id: lessonId } = useParams();  // Get lesson ID from URL
  const [lesson, setLesson] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);  // New: Loading state
  const [error, setError] = useState(null);  // New: Error state

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docRef = doc(db, 'lessons', lessonId);  // Fetch lesson from Firestore using lesson ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLesson(docSnap.data());  // Store lesson data in state
        } else {
          setError("No such document!");  // Set an error if the document doesn't exist
        }
      } catch (err) {
        setError("Error fetching lesson: " + err.message);  // Set any error that occurs during fetching
      } finally {
        setLoading(false);  // Loading is done
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleSubmit = () => {
    if (selectedAnswer !== null && lesson.assessment) {
      setShowFeedback(true);
      setIsCorrect(selectedAnswer === lesson.assessment.correctAnswer);  // Check if answer is correct
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Check if lesson exists and has an assessment before rendering
  if (!lesson || !lesson.assessment) {
    return <p>Lesson or assessment is missing.</p>;
  }

  return (
    <div className="lesson-container">
      {/* Left Section: Lesson Content */}
      <div className="lesson-content">
        <h2>{lesson.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>  {/* Render lesson content */}
      </div>

      {/* Right Section: Formative Assessment */}
      <div className="lesson-assessment">
        <h3>Formative Assessment</h3>
        <p>{lesson.assessment.question}</p>
        {lesson.assessment.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="mcq"
              onChange={() => setSelectedAnswer(index)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>

        {showFeedback && (
          <p>
            {isCorrect ? 'Correct!' : 'Incorrect.'}
            <br />
            {lesson.assessment.explanation}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lesson;
