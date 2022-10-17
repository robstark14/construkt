import React, { useEffect, useState } from 'react'

function Alert({color, setShowAlert, alertStatement}) {
    console.log(alertStatement);
    console.log(color);
    useEffect(() => {
 
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
  return (
    <div>
        <div
          className={
            `text-white px-6 py-4 border-0 rounded relative mb-4 bg-${color}-700`
          }
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">{alertStatement}</b> 
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>

    </div>
  )
}

export default Alert