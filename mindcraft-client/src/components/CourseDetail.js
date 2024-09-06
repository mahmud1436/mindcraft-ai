import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();  // Get the course ID from the URL

  // Dummy lessons data for each course
  const lessons = {
    1: ["Lesson 1: Algebra", "Lesson 2: Geometry", "Lesson 3: Calculus"],
    2: ["Lesson 1: Physics Basics", "Lesson 2: Chemistry Fundamentals", "Lesson 3: Biology Overview"],
    3: ["Lesson 1: Grammar", "Lesson 2: Writing", "Lesson 3: Literature"]
  };

  return (
    <div>
      <h1>Course {id}</h1>
      <h2>Lessons</h2>
      <ul>
        {lessons[id]?.map((lesson, index) => (
          <li key={index}>{lesson}</li>
        )) || <p>No lessons available</p>}
      </ul>
    </div>
  );
};

export default CourseDetail;
