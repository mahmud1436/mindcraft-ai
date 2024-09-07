import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase setup
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

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

const LessonEditor = () => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('');  // Grade field
  const [subject, setSubject] = useState('');  // Subject field
  const [lessonParts, setLessonParts] = useState([
    { content: '', assessment: { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' } },
  ]);
  const navigate = useNavigate(); // Navigation for redirection

  const handleSaveLesson = async () => {
    try {
      await addDoc(collection(db, 'lessons'), {
        title,
        grade,
        subject,
        parts: lessonParts,
      });
      alert('Lesson saved successfully');
      setTitle('');
      setGrade('');
      setSubject('');
      setLessonParts([{ content: '', assessment: { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' } }]);
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handlePartChange = (index, key, value) => {
    const newParts = [...lessonParts];
    newParts[index][key] = value;
    setLessonParts(newParts);
  };

  const handleAssessmentChange = (partIndex, key, value) => {
    const newParts = [...lessonParts];
    newParts[partIndex].assessment[key] = value;
    setLessonParts(newParts);
  };

  const handleOptionChange = (partIndex, optionIndex, value) => {
    const newParts = [...lessonParts];
    newParts[partIndex].assessment.options[optionIndex] = value;
    setLessonParts(newParts);
  };

  const handleAddPart = () => {
    setLessonParts([...lessonParts, { content: '', assessment: { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' } }]);
  };

  const navigateToSummativeEditor = () => {
    navigate('/summative-editor'); // Redirect to Summative Assessment Editor
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg relative">
      <h2 className="text-2xl font-bold mb-4">Create a New Lesson</h2>

      {/* Summative Button at Top Right */}
      <button
        onClick={navigateToSummativeEditor}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Summative
      </button>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson Title"
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Updated Grade Options */}
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Grade</option>
        <option value="Nursery">Nursery</option>
        <option value="UKG">UKG</option>
        <option value="1">Grade 1</option>
        <option value="2">Grade 2</option>
        <option value="3">Grade 3</option>
        <option value="4">Grade 4</option>
        <option value="5">Grade 5</option>
        <option value="6">Grade 6</option>
        <option value="7">Grade 7</option>
        <option value="8">Grade 8</option>
        <option value="9">Grade 9</option>
        <option value="10">Grade 10</option>
        <option value="11">Grade 11</option>
        <option value="12">Grade 12</option>
      </select>

      {/* Dynamic Subject Dropdown Based on Grade */}
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        disabled={!grade}  // Disable if no grade is selected
      >
        <option value="">Select Subject</option>
        {subjectsByGrade[grade]?.map((subjectOption) => (
          <option key={subjectOption} value={subjectOption}>
            {subjectOption}
          </option>
        ))}
      </select>

      {/* Lesson Parts Section */}
      {lessonParts.map((part, partIndex) => (
        <div key={partIndex} className="mb-8">
          <h3 className="text-xl font-bold mb-2">Lesson Part {partIndex + 1}</h3>

          <ReactQuill
            value={part.content}
            onChange={(value) => handlePartChange(partIndex, 'content', value)}
            placeholder="Enter lesson content"
            className="mb-4"
          />

          <h4 className="text-lg font-semibold mb-2">Formative Assessment</h4>
          <input
            type="text"
            value={part.assessment.question}
            onChange={(e) => handleAssessmentChange(partIndex, 'question', e.target.value)}
            placeholder="Enter question"
            className="w-full p-2 mb-4 border rounded"
          />
          
          {/* Options for formative assessment */}
          {part.assessment.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(partIndex, optIndex, e.target.value)}
              placeholder={`Option ${optIndex + 1}`}
              className="w-full p-2 mb-2 border rounded"
            />
          ))}

          <select
            value={part.assessment.correctAnswer}
            onChange={(e) =>
              handleAssessmentChange(partIndex, 'correctAnswer', parseInt(e.target.value))
            }
            className="w-full p-2 mb-4 border rounded"
          >
            {part.assessment.options.map((_, optIndex) => (
              <option key={optIndex} value={optIndex}>
                Correct Answer: Option {optIndex + 1}
              </option>
            ))}
          </select>

          <textarea
            value={part.assessment.explanation}
            onChange={(e) => handleAssessmentChange(partIndex, 'explanation', e.target.value)}
            placeholder="Explanation for the correct answer"
            className="w-full p-2 mb-4 border rounded h-32"
          ></textarea>
        </div>
      ))}

      {/* Add Another Part Button */}
      <button
        onClick={handleAddPart}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add Another Part
      </button>

      {/* Save Lesson Button */}
      <button
        onClick={handleSaveLesson}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Save Lesson
      </button>
    </div>
  );
};

export default LessonEditor;
