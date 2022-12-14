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
import ShopDrawings from './ShopDrawings/ShopDrawings';
import DocInfo from './DocInfo';



function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    checkUser()
    console.log('cache');

    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
          console.log('cache');
        });
      });
    }
   
  }, [])
  
 const checkUser= async () => {
  const apiEndpoint =`/api/user-role`
  try{
      const response = await fetch(apiEndpoint)
      const data = await response.json()
      setUser(data["user"])
     
  } catch (err) {
      console.log(err.message);
  }

}

 
  return (
    <div className='w-full h-screen'>

    <Router>
      <Routes>
        <Route path="*" element={user.user_role === 'Admin'? <Users />:<Home />} /> 
        {/* <Route path="/users/*" element={} /> */}
        <Route path="/new-user" element={<NewUser />} />  
        <Route path="/construction-drawings/*" element={<ConstructionDrawings />} />  
        <Route path="/shop-drawings/*" element={<ShopDrawings />} />  
        <Route path={`/:params/*`} element={<DocInfo user={user}/>}/>
        

            
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
  /* </React.StrictMode> */
);
// reportWebVitals();