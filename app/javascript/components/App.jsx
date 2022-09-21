import React from 'react'
import ReactDOM from "react-dom/client";

// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import PlacesList from "./places_list"
// import NewInternetSpeed from "./new_internet_speed"

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* <Route path="/new-internet-speed" element={<NewInternetSpeed />} />
    //     <Route path="*" element={<PlacesList />} /> */}
    //   </Routes>
    // </BrowserRouter>
    <div>hello</div>
  );
}

// Set up some code that would render react into the DOM
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);