import React from 'react';
import { useParams } from 'react-router-dom';
import { unitsData } from './unitsData';

const LessonsPage = () => {
  const { grade, subject, unitName } = useParams();

  const unit = unitsData[grade]?.[subject]?.units.find(unit => unit.name === unitName) || {};
  const lessons = unit.lessons || [];
  const assessments = unit.assessments || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Lessons in {unitName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer transition duration-300"
          >
            <h2 className="text-xl font-bold">{lesson}</h2>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold mt-8">Assessments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {assessments.map((assessment, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer transition duration-300"
          >
            <h2 className="text-xl font-bold">{assessment}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
