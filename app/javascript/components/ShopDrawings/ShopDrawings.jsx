import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddDoc from '../AddDoc'
import MasterInquiry from '../MasterInquiry'




function ShopDrawings() {
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
      <Routes>
        <Route path="/addSD" element={<AddDoc drawing='sd'/>} />  
        <Route path="/masterInquiry/*" element={<MasterInquiry drawing='sd' drawingType="shop-drawings" />} />
        
    
      </Routes>

    </div>
  )
}

export default ShopDrawings