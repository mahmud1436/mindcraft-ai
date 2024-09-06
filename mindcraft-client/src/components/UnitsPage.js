import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase Firestore instance

const UnitsPage = () => {
  const { grade, subject } = useParams(); // Get grade and subject from URL
  const [units, setUnits] = useState([]);
  const navigate = useNavigate(); // For navigating to lessons page
  const [loading, setLoading] = useState(true);

  // Fetch units from Firestore
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const q = query(
          collection(db, 'units'),
          where('grade', '==', grade),
          where('subject', '==', subject)
        );
        const querySnapshot = await getDocs(q);
        const unitsList = [];
        querySnapshot.forEach((doc) => {
          unitsList.push({ id: doc.id, ...doc.data() });
        });
        setUnits(unitsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching units:', error);
        setLoading(false);
      }
    };

    fetchUnits();
  }, [grade, subject]);

  const handleUnitClick = (unitId) => {
    navigate(`/courses/${grade}/${subject}/lessons`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Units for {subject} in Grade {grade}</h2>
      {units.length > 0 ? (
        <ul>
          {units.map((unit) => (
            <li key={unit.id} onClick={() => handleUnitClick(unit.id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              {unit.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No units available for this subject and grade.</p>
      )}
    </div>
  );
};

export default UnitsPage;
