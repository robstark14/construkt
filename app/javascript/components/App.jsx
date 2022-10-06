import React, { StrictMode, useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Users from "./Users";
import Home from "./Home";
import NewUser from './NewUser';
import ConstructionDrawings from './ConstructionDrawings/ConstructionDrawings';
// import reportWebVitals from "./reportWebVitals";

function App() {
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    checkUserRole()
  
   
  }, [])
  
 const checkUserRole= async () => {
  const apiEndpoint =`/api/user-role`
  try{
      const response = await fetch(apiEndpoint)
      const data = await response.json()
      setUserRole(data["user_role"])
     
  } catch (err) {
      console.log(err.message);
  }

}

 
  return (
    <div className='w-full h-screen'>

    <Router>
      <Routes>
        <Route path="*" element={userRole === 'Admin'? <Users />:<Home />} /> 
        {/* <Route path="/users/*" element={} /> */}
        <Route path="/new-user" element={<NewUser />} />  
        <Route path="/construction-drawings/*" element={<ConstructionDrawings />} />  
        
      </Routes>
    </Router>
    </div>

  );
}

// Set up some code that would render react into the DOM
const root = ReactDOM.createRoot(document.getElementById("app"));
// root.render(<App />);

// const rootElement = document.getElementById('app');
// const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
// reportWebVitals();