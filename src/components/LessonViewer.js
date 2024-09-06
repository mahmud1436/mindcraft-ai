import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore instance

const LessonViewer = ({ lessonId }) => {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const docRef = doc(db, 'courses', lessonId);  // Fetch specific lesson by ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLesson(docSnap.data());  // Set the lesson data
      } else {
        console.log('No such document!');
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      {/* Render the lesson content safely using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
    </div>
  );
};

export default LessonViewer;
