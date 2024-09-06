import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase setup

const Lesson = () => {
  const { grade, subject } = useParams(); // Get grade and subject from the URL
  const [lessons, setLessons] = useState([]);

  // Adjust grade to match the format stored in Firebase (e.g., "Grade1")
  const formattedGrade = `Grade${grade}`;

  // Fetch lessons from Firebase based on grade and subject
  useEffect(() => {
    const fetchLessons = async () => {
      const q = query(
        collection(db, 'lessons'),
        where('grade', '==', formattedGrade), // Adjusted to use formatted grade
        where('subject', '==', subject)
      );
      const querySnapshot = await getDocs(q);
      const lessonsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsList);
    };

    fetchLessons();
  }, [formattedGrade, subject]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Lessons in {subject}</h2>
      {lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} className="mb-4">
              <Link
                to={`/lesson/${lesson.id}`}
                className="text-blue-500 hover:underline"
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons available for this subject and grade.</p>
      )}
    </div>
  );
};

export default Lesson;
