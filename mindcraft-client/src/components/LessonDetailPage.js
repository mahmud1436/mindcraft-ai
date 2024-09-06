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
    return <div>Loading lesson details...</div>;
  }

  return (
    <div className="lesson-detail">
      <div className="lesson-content" style={{ width: '65%', float: 'left' }}>
        <h2>{lesson.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>
      <div className="lesson-assessment" style={{ width: '35%', float: 'right' }}>
        <h3>Formative Assessment</h3>
        <p>{lesson.assessment.question}</p>
        {lesson.assessment.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="option"
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
            />
            <label>{option}</label>
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
        {showExplanation && (
          <div>
            <p>
              {selectedOption === lesson.assessment.correctAnswer
                ? 'Correct Answer!'
                : 'Incorrect Answer.'}
            </p>
            <p>Explanation: {lesson.assessment.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
