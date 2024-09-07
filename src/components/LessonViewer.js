import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore instance

const LessonViewer = () => {
  const { grade, subject } = useParams(); // Get grade and subject from URL params
  const [lessons, setLessons] = useState([]); // State to store all lessons
  const [selectedLesson, setSelectedLesson] = useState(null); // State for selected lesson content
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch lessons based on grade and subject
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsQuery = query(
          collection(db, 'lessons'),
          where('grade', '==', grade),
          where('subject', '==', subject)
        );
        const querySnapshot = await getDocs(lessonsQuery);
        const fetchedLessons = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(fetchedLessons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [grade, subject]);

  // Handle lesson selection
  const handleLessonClick = async (lessonId) => {
    try {
      const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
      if (lessonDoc.exists()) {
        setSelectedLesson(lessonDoc.data());
      } else {
        console.error('Lesson not found');
      }
    } catch (error) {
      console.error('Error fetching lesson details:', error);
    }
  };

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Display list of lesson titles based on grade and subject */}
        {!selectedLesson ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Lessons for {subject} (Grade {grade})</h1>
            {lessons.length === 0 ? (
              <p>No lessons found for {subject} in Grade {grade}.</p>
            ) : (
              <ul>
                {lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="p-4 mb-4 bg-white rounded-lg shadow cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleLessonClick(lesson.id)}
                  >
                    <h2 className="text-xl font-semibold">{lesson.title}</h2>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div>
            <button
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedLesson(null)}
            >
              Back to Lessons
            </button>
            {/* Display selected lesson content */}
            <h2 className="text-4xl font-bold mb-4">{selectedLesson.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{selectedLesson.subject} - Grade {selectedLesson.grade}</p>

            {selectedLesson.parts?.map((part, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Lesson Part {index + 1}</h3>
                <div className="prose prose-lg text-gray-700" dangerouslySetInnerHTML={{ __html: part.content }}></div>

                {/* Display the assessment for the part */}
                {part.assessment && (
                  <div className="mt-4">
                    <h4 className="text-xl font-semibold">Formative Assessment</h4>
                    <p className="mt-2">{part.assessment.question}</p>
                    <ul className="list-disc ml-6">
                      {part.assessment.options.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      ))}
                    </ul>
                    <p className="mt-2 font-bold">Correct Answer: {part.assessment.options[part.assessment.correctAnswer]}</p>
                    <p className="mt-1">Explanation: {part.assessment.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;
