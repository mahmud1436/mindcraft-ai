import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalculator, FaFlask, FaBook, FaGlobe } from 'react-icons/fa';  // Updated icons

const subjectsData = {
  K: ['Basic Math', 'Basic Science'],
  1: ['Math', 'Science', 'Social Studies'],
  2: ['Math', 'Science', 'English'],
  // Add more grades and subjects as needed
};

const CourseSelectionPage = () => {
  const { grade } = useParams();
  const navigate = useNavigate();

  const subjects = subjectsData[grade] || [];

  const handleSubjectClick = (subject) => {
    navigate(`/units/${grade}/${subject}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Select a Subject for Grade {grade}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div
            key={subject}
            className="p-6 bg-white rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer transition duration-300"
            onClick={() => handleSubjectClick(subject)}
          >
            <div className="text-indigo-600 text-6xl mb-4">
              {subject === 'Math' && <FaCalculator />}
              {subject === 'Science' && <FaFlask />}
              {subject === 'Social Studies' && <FaGlobe />}
              {subject === 'English' && <FaBook />}
            </div>
            <h2 className="text-xl font-bold">{subject}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelectionPage;
