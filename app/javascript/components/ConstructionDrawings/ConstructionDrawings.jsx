import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddDoc from '../AddDoc'
import MasterInquiry from '../MasterInquiry'



function ConstructionDrawings() {

  return (
    <div>
      <Routes>
        <Route path="/addCD" element={<AddDoc drawing='cd'/>} />  
        <Route path="/masterInquiry/*" element={<MasterInquiry drawing='cd' drawingType="construction-drawings"/>} />  

      </Routes>

    </div>
  )
}

export default ConstructionDrawings