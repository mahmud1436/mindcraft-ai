import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to MindCraft AI</h1>
      <p>Your personalized learning platform with interactive lessons and assessments.</p>
      <Link to="/signup">Get Started</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
