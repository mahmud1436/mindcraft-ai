import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const LessonsPage = () => {
  const { grade, subject } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch lessons from Firestore
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const q = query(
          collection(db, 'lessons'),
          where('grade', '==', grade),
          where('subject', '==', subject)
        );
        const querySnapshot = await getDocs(q);
        const lessonsList = [];
        querySnapshot.forEach((doc) => {
          lessonsList.push({ id: doc.id, ...doc.data() });
        });
        setLessons(lessonsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessons();
  }, [grade, subject]);

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  if (loading) {
    return <div>Loading lessons...</div>;
  }

  return (
    <div>
      <h2>Lessons for {subject} in Grade {grade}</h2>
      {lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li 
              key={lesson.id} 
              onClick={() => handleLessonClick(lesson.id)} 
              style={{ cursor: 'pointer', marginBottom: '10px' }}
            >
              <h3>{lesson.title}</h3>
              <p>{lesson.content.substring(0, 100)}...</p> {/* Display a snippet of the content */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons available for this subject and grade.</p>
      )}
    </div>
  );
};

export default LessonsPage;
