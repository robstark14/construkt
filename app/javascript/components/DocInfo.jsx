import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Alert from './Alert';
import Attachments from './Workflow/Attachments';
import DocData from './Workflow/DocData';
import DocNavBar from './Workflow/DocNavBar';
import InitialWorkflowForm from './Workflow/InitialWorkflowForm';
import WorkflowForm from './Workflow/WorkflowForm';
import WorkflowSummary from './Workflow/WorkflowSummary';


function DocInfo({user}) {
    const [document, setDocument] = useState({})
    const params = useParams()
    const [showAlert, setShowAlert] = useState(false);
    const [summary, setSummary] = useState([]);

    const [values, setValues] = useState({
        register: "",
        location:"",
        revisionNumber: "",
        documentStatus: "",
        discipline: "",
        dateSubmitted: "",
        publishedBy: "", 
        subject: "",
        attachments: {},
        remarks: "",
        documentNumber: "",
        deadline:"",
        workflowStage:0

      });
      
    
    useEffect(() => {
                
     fetchCurrentDoc()
    }, [])
    const fetchCurrentDoc= async () =>{
      const apiEndpointGetDocData = params.params.includes('CD')?`/api/cd/${params.params}`: `/api/sd/${params.params}`
  
        try{
            const response = await fetch(apiEndpointGetDocData)
            const data = await response.json()

            
            const dataObject = data?.drawing[0]
            setValues({ 
              register: dataObject?.register,
              location: dataObject?.location,
              revisionNumber: dataObject?.revision_number,
              documentStatus: dataObject?.document_status,
              documentNumber: dataObject?.document_number,
              discipline: dataObject?.discipline,
              dateSubmitted: dataObject?.date_submitted,
              publishedBy: dataObject?.published_by,
              subject: dataObject?.subject,
              attachments: dataObject?.attachments,
              remarks: dataObject?.remarks,
              createdAt: dataObject?.created_at,
              lastUpdated: dataObject?.updated_at,
              deadline: dataObject?.register ==='SD'? dataObject?.required_response_date : "",
              workflowStage: dataObject?.register ==='SD'? dataObject?.workflow_stage : ""
          })
          // if (response.ok){
          //   getDocument()
          // }
          // console.log(workflowStage);
        } catch (err) {
            console.log(err);
        }
    }

    const getDocument= async () => {
      const apiEndpoint =`/api/get_activity/${values?.documentNumber}`
      try{
          const response = await fetch(apiEndpoint)
          const data = await response.json()
          // setUserRole(data["user_role"])
          console.log(data['document']);
         const dataObject = data['document']
         setDocument(dataObject)
         console.log(apiEndpoint);
        //  console.log(documentNumber);
      } catch (err) {
          console.log(err);
          console.log(apiEndpoint);
          // console.log(documentNumber);
      }
    }
    const getWorkflowSummary= async () => {
      const apiEndpoint =`/api/workflow_summary/${values?.documentNumber}`
      try{
          const response = await fetch(apiEndpoint)
          const data = await response.json()
          // setUserRole(data["user_role"])
          console.log(data);
         
         setSummary(data)
         console.log(apiEndpoint);
        //  console.log(documentNumber);
      } catch (err) {
          console.log(err);
          console.log(apiEndpoint);
          // console.log(documentNumber);
      }
    }
   


  return (
    <div className='dark:text-gray-400 bg-gray-300'>
      <DocNavBar documentNumber = {values?.documentNumber} workflowStage={values?.workflowStage} />
      {/* <WorkflowForm /> */}
      <Routes>
         {/* <Route path="/attachments" element={ <DocNavBar documentNumber = {values?.documentNumber}/>}/> */}
         <Route path="/attachments" element={ <Attachments />}/>
         <Route path={`/workflow-summary/${values?.documentNumber}`} element={ <WorkflowSummary documentNumber = {values?.documentNumber} user={user} getWorkflowSummary={getWorkflowSummary} summary={summary} document={document} getDocument={getDocument} />}/>
         <Route path={`/form/${values?.documentNumber}`}element={ <WorkflowForm document={document} register={values?.register} documentNumber = {values?.documentNumber} subject ={values?.subject} deadline={values?.deadline } getDocument={getDocument} publishedBy={values?.publishedBy}/>}/>
         <Route path={`/newForm/${values?.documentNumber}`} element={ <InitialWorkflowForm document={document} register={values?.register} documentNumber = {values?.documentNumber} subject ={values?.subject} deadline={values?.deadline } getDocument={getDocument} publishedBy={values?.publishedBy}/>}/>
         <Route path ={`/data`} element={ <DocData values={values} fetchCurrentDoc={fetchCurrentDoc} />}/>

      </Routes>

      {showAlert && <Alert color={'green'} showAlert={showAlert} alertStatement={'Successfully submitted!.'}/>}
      
    </div>
  )
}

export default DocInfo;