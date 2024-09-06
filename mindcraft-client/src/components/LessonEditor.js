import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase setup
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const LessonEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [grade, setGrade] = useState('');  // Grade field
  const [subject, setSubject] = useState('');  // Subject field
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');

  const navigate = useNavigate(); // Navigation for redirection

  const handleSaveLesson = async () => {
    try {
      await addDoc(collection(db, 'lessons'), {
        title,
        content,
        grade,
        subject,
        assessment: {
          question,
          options,
          correctAnswer,
          explanation,
        },
      });
      alert('Lesson saved successfully');
      setTitle('');
      setContent('');
      setGrade('');
      setSubject('');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setExplanation('');
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Lesson</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson Title"
        className="w-full p-2 mb-4 border rounded"
      />

      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Grade</option>
        <option value="Grade1">Grade 1</option>
        <option value="Grade2">Grade 2</option>
        {/* Add more grade options as needed */}
      </select>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Select Subject</option>
        <option value="Science">Science</option>
        <option value="Math">Math</option>
        {/* Add more subject options as needed */}
      </select>

      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder="Enter lesson content"
        className="mb-4"
      />

      <h3 className="text-xl font-bold mb-2">Formative Assessment</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter the question"
        className="w-full p-2 mb-4 border rounded"
      />

      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
          className="w-full p-2 mb-2 border rounded"
        />
      ))}

      <select
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
        className="w-full p-2 mb-4 border rounded"
      >
        {options.map((_, index) => (
          <option key={index} value={index}>
            Correct Answer: Option {index + 1}
          </option>
        ))}
      </select>

      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        placeholder="Explanation for the correct answer"
        className="w-full p-2 mb-4 border rounded h-32"
      ></textarea>

      <button
        onClick={handleSaveLesson}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Save Lesson
      </button>
    </div>
  );
};

export default LessonEditor;
