import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import your styles
import App from './App';  // Import the main App component
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter for routing

// Render the App component inside BrowserRouter to provide routing context
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
