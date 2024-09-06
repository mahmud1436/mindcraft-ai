import React from 'react';
import { useParams, Link } from 'react-router-dom';

const UnitsPage = () => {
  const { grade, subject } = useParams();

  const units = [
    { id: 1, name: 'Unit 1' },
    { id: 2, name: 'Unit 2' },
    { id: 3, name: 'Unit 3' },
  ];

  return (
    <div>
      <h1>{`Units for ${subject} in Grade ${grade}`}</h1>
      <ul>
        {units.map(unit => (
          <li key={unit.id}>
            <Link to={`/courses/${grade}/${subject}/units/${unit.id}/lessons`}>{unit.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitsPage;
