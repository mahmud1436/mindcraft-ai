import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore instance

const Lesson = () => {
  const { grade, subject } = useParams(); // Get grade and subject from URL
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch lessons from Firestore based on grade and subject
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsQuery = query(
          collection(db, 'lessons'),
          where('grade', '==', grade),
          where('subject', '==', subject)
        );
        const querySnapshot = await getDocs(lessonsQuery);  // Changed to lessonsQuery
        const fetchedLessons = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (fetchedLessons.length === 0) {
          console.log('No lessons available for this subject and grade.');
        }

        setLessons(fetchedLessons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessons();
  }, [grade, subject]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">Loading lessons...</div>;
  }

  if (lessons.length === 0) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-700">No lessons available for this subject and grade.</div>;
  }

  // Navigate to lesson detail page
  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Lessons in {subject} (Grade {grade})</h1>
        <ul>
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-indigo-100"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p>{lesson.subject} - Grade {lesson.grade}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lesson;
