import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import the global CSS
import App from './App';  // Import the main App component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Root DOM element where the app is rendered
);

// Performance monitoring function
reportWebVitals();
