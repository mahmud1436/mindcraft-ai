import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalculator, FaFlask, FaBook, FaGlobe, FaBrain, FaLaptopCode, FaHistory, FaLandmark, FaBusinessTime } from 'react-icons/fa';

const subjectsData = {
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
  9: ['Math', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Applications'],
  10: ['Math', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Applications'],
  11: ['Physics', 'Chemistry', 'Math', 'Biology', 'Computer Science', 'Accountancy', 'Business Studies', 'Economics', 'History', 'Political Science', 'Geography', 'Sociology', 'Psychology'],
  12: ['Physics', 'Chemistry', 'Math', 'Biology', 'Computer Science', 'Accountancy', 'Business Studies', 'Economics', 'History', 'Political Science', 'Geography', 'Sociology', 'Psychology'],
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
      {subjects.length === 0 ? (
        <p className="text-red-500">No subjects available for this grade.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject}
              className="p-6 bg-white rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer transition duration-300"
              onClick={() => handleSubjectClick(subject)}
              aria-label={`Select ${subject}`}
            >
              <div className="text-indigo-600 text-6xl mb-4">
                {subject === 'Math' && <FaCalculator />}
                {subject === 'Science' && <FaFlask />}
                {subject === 'EVS' && <FaGlobe />}
                {subject === 'Hindi' && <FaBook />}
                {subject === 'English' && <FaBook />}
                {subject === 'Computer Science' && <FaLaptopCode />}
                {subject === 'Social Studies' && <FaLandmark />}
                {subject === 'History' && <FaHistory />}
                {subject === 'Political Science' && <FaLandmark />}
                {subject === 'Physics' && <FaFlask />}
                {subject === 'Chemistry' && <FaFlask />}
                {subject === 'Biology' && <FaBrain />}
                {subject === 'Accountancy' && <FaCalculator />}
                {subject === 'Business Studies' && <FaBusinessTime />}
                {subject === 'Economics' && <FaCalculator />}
                {subject === 'Sociology' && <FaBrain />}
                {subject === 'Psychology' && <FaBrain />}
              </div>
              <h2 className="text-xl font-bold">{subject}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSelectionPage;
