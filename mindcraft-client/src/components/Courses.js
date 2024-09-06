import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore instance
import { Link } from 'react-router-dom';

const Courses = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const lessonsCollection = collection(db, 'lessons');
      const lessonsSnapshot = await getDocs(lessonsCollection);
      const lessonsList = lessonsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsList);  // Store lessons in state
    };

    fetchLessons();
  }, []);

  return (
    <div className="courses-container">
      <h2>Available Lessons</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            {/* Link to the dynamic lesson page */}
            <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
