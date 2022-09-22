import React from 'react'
import ReactDOM from "react-dom/client";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Home";
import NewUser from './NewUser';
import Users from './Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/new-user" element={<NewUser />} />
        
        
      </Routes>
    </Router>
  );
}

// Set up some code that would render react into the DOM
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);