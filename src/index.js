import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Create a root for concurrent mode rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside a StrictMode for additional checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);