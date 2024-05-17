import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './pages/NavBar.js';
import Routing from './Routing.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Routing />
  </React.StrictMode>
);

