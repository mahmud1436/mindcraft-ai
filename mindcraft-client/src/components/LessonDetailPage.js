import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LessonDetailPage = () => {
  const { id } = useParams();
  const [currentPart, setCurrentPart] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Example lesson content divided into parts (replace with actual lesson data)
  const lessonContent = [
    { part: 'Introduction to Algebra', content: 'This is the introduction to Algebra.' },
    { part: 'Basic Algebra Concepts', content: 'Here we discuss variables and constants.' },
    { part: 'Algebraic Equations', content: 'Now we talk about algebraic equations and how to solve them.' }
  ];

  // Example MCQ questions (replace with actual questions)
  const questions = [
    {
      question: "What is the value of x in 2x + 3 = 7?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "2",
      explanation: "To solve 2x + 3 = 7, subtract 3 from both sides, then divide by 2."
    }
  ];

  const handleAnswerSubmit = () => {
    setShowExplanation(true);
  };

  const nextPart = () => {
    if (currentPart < lessonContent.length - 1) {
      setCurrentPart(currentPart + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  };

  const prevPart = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="lesson-detail-page">
      <div className="lesson-content-section" style={{ width: '66%' }}>
        <h2>{lessonContent[currentPart].part}</h2>
        <p>{lessonContent[currentPart].content}</p>
        <div className="lesson-navigation">
          {currentPart > 0 && <button onClick={prevPart}>Previous</button>}
          {currentPart < lessonContent.length - 1 && <button onClick={nextPart}>Next</button>}
        </div>
      </div>

      <div className="assessment-section" style={{ width: '33%' }}>
        <h3>Formative Assessment</h3>
        <p>{questions[currentPart].question}</p>
        <div className="options">
          {questions[currentPart].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="mcq"
                value={option}
                onChange={() => setSelectedAnswer(option)}
                checked={selectedAnswer === option}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button onClick={handleAnswerSubmit}>Submit</button>

        {showExplanation && (
          <div className="explanation">
            <p>{selectedAnswer === questions[currentPart].correctAnswer ? "Correct!" : "Incorrect"}</p>
            <p>{questions[currentPart].explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
