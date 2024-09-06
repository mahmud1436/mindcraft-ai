import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboard, FaBook, FaGraduationCap } from 'react-icons/fa';  // Example icons

const grades = [
  { grade: 'K', icon: <FaBook /> },
  { grade: '1', icon: <FaChalkboard /> },
  { grade: '2', icon: <FaGraduationCap /> },
  { grade: '3', icon: <FaChalkboard /> },
  // Add more grades as needed
];

const GradeSelectionPage = () => {
  const navigate = useNavigate();

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    navigate(`/courses/${grade}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-indigo-200">
      <h1 className="text-4xl font-bold mb-10">Select Your Grade</h1>
      <div className="grid grid-cols-2 gap-8">
        {grades.map((grade) => (
          <div
            key={grade.grade}
            className="p-10 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            onClick={() => handleGradeSelect(grade.grade)}
          >
            <div className="text-6xl text-indigo-600 mb-4">{grade.icon}</div>
            <h2 className="text-2xl font-bold">{`Grade ${grade.grade}`}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeSelectionPage;
