import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaBook, FaFlask, FaCalculator } from 'react-icons/fa'; // Example icons

const LessonsPage = () => {
  const { grade, subject, unit } = useParams();

  // Example lesson data (replace with dynamic data fetching later)
  const lessons = [
    { id: 1, title: 'Introduction to Algebra', icon: FaCalculator },
    { id: 2, title: 'Basic Chemistry', icon: FaFlask },
    { id: 3, title: 'Reading Comprehension', icon: FaBook },
  ];

  return (
    <div className="lessons-page">
      <h2>{`Lessons for Unit ${unit} in ${subject} (Grade ${grade})`}</h2>
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-icon">
              <lesson.icon size={50} />
            </div>
            <img src={`https://via.placeholder.com/150`} alt="Lesson thumbnail" className="lesson-image" />
            <h3>{lesson.title}</h3>
            <Link to={`/lesson/${lesson.id}`} className="lesson-link">
              Start Learning
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
