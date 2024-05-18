import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './pages/js/NavBar';
import Routing from './Routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Routing />
  </React.StrictMode>
);

