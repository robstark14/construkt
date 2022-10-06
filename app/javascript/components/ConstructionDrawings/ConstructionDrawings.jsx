import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import AddDoc from './AddDoc'
import MasterInquiry from './MasterInquiry'



function ConstructionDrawings() {
  return (
    <div>
      <Routes>
        <Route path="/addCD" element={<AddDoc />} />  
        <Route path="/masterInquiry" element={<MasterInquiry />} />  

      </Routes>

    </div>
  )
}

export default ConstructionDrawings