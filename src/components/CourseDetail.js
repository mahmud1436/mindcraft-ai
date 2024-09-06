import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase'; // Firestore instance

const CourseDetail = () => {
  const { grade, subject } = useParams(); // Get grade and subject from the route parameters
  const [lessons, setLessons] = useState([]); // State to hold fetched lessons
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        // Query Firestore for lessons based on grade and subject
        const lessonsRef = collection(db, 'lessons');
        const q = query(lessonsRef, where('grade', '==', grade), where('subject', '==', subject));
        const querySnapshot = await getDocs(q);

        // Extract lessons from the snapshot
        const fetchedLessons = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLessons(fetchedLessons); // Update lessons state with fetched data
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchLessons();
  }, [grade, subject]);

  return (
    <div className="course-detail-container">
      <h2>{subject} Lessons for {grade}</h2>

      {loading ? (
        <p>Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p>No lessons available for this subject yet.</p>
      ) : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              {/* Link to lesson details page */}
              <Link to={`/lesson/${lesson.id}`}>
                <div>
                  <h3>{lesson.title}</h3>
                  {/* You can add an image and some icons here to make it more appealing */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseDetail;
