import React, { StrictMode, useState } from 'react'
import ReactDOM, { createRoot } from "react-dom/client";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EditUser from './EditUser';

import Home from "./Home";
import NewUser from './NewUser';
import Users from './Users';

function App() {
 
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/users/*" element={<Users />} />
        
        <Route path="/new-user" element={<NewUser />} />

        
        
      </Routes>
    </Router>
  );
}

// Set up some code that would render react into the DOM
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

// const rootElement = document.getElementById('app');
// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );