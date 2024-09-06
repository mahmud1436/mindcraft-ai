import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';  // Rich Text Editor
import 'react-quill/dist/quill.snow.css'; // Quill styles
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore instance

const LessonEditor = () => {
  const [title, setTitle] = useState(''); // Lesson title
  const [content, setContent] = useState(''); // Rich text content (HTML)
  const [question, setQuestion] = useState(''); // Assessment question
  const [options, setOptions] = useState(['', '', '', '']); // MCQ options
  const [correctAnswer, setCorrectAnswer] = useState(0); // Index of correct answer
  const [explanation, setExplanation] = useState(''); // Explanation for the correct answer
  const [grade, setGrade] = useState(''); // Selected grade
  const [subject, setSubject] = useState(''); // Selected subject
  const [availableSubjects, setAvailableSubjects] = useState([]); // List of subjects for selected grade

  // Fetching available subjects based on selected grade (if stored in the database)
  useEffect(() => {
    if (grade) {
      fetchSubjectsForGrade();
    }
  }, [grade]);

  const fetchSubjectsForGrade = async () => {
    try {
      const subjectCollection = collection(db, 'subjects');
      const subjectSnapshot = await getDocs(subjectCollection);
      const subjectsList = subjectSnapshot.docs
        .map(doc => doc.data())
        .filter(subject => subject.grade === grade);
      setAvailableSubjects(subjectsList);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Handle saving the lesson to Firestore
  const handleSaveLesson = async () => {
    if (!grade || !subject) {
      alert('Please select a grade and a subject.');
      return;
    }

    try {
      await addDoc(collection(db, 'lessons'), {
        title,
        content, // Save rich content as HTML
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
      // Reset form after saving
      setTitle('');
      setContent('');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      setExplanation('');
      setGrade('');
      setSubject('');
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  // Handle input change for MCQ options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div>
      <h2>Create a New Lesson</h2>
      
      {/* Grade Selection */}
      <select 
        value={grade} 
        onChange={(e) => setGrade(e.target.value)} 
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      >
        <option value="">Select Grade</option>
        <option value="K">K</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>

      {/* Subject Selection */}
      <select 
        value={subject} 
        onChange={(e) => setSubject(e.target.value)} 
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      >
        <option value="">Select Subject</option>
        {availableSubjects.map((subject, index) => (
          <option key={index} value={subject.name}>
            {subject.name}
          </option>
        ))}
      </select>

      {/* Lesson Title Input */}
      <input
        type="text"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {/* Lesson Content Editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder="Enter your lesson content (supports text, images, and videos)"
        style={{ marginBottom: '20px' }}
      />

      <h3>Formative Assessment</h3>
      {/* Assessment Question Input */}
      <input
        type="text"
        placeholder="Enter the question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      {/* MCQ Options */}
      {options.map((option, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={{ padding: '10px', width: '100%' }}
          />
        </div>
      ))}

      {/* Correct Answer Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label>Select Correct Answer: </label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
          style={{ padding: '10px', marginLeft: '10px' }}
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              Option {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Explanation Input */}
      <textarea
        placeholder="Enter the explanation for the correct answer"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', height: '100px' }}
      />

      {/* Save Button */}
      <button onClick={handleSaveLesson} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
        Save Lesson
      </button>
    </div>
  );
};

export default LessonEditor;
