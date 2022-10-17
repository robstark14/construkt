import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Alert from './Alert';
import Attachments from './Workflow/Attachments';
import DocNavBar from './Workflow/DocNavBar';
import InitialWorkflowForm from './Workflow/InitialWorkflowForm';
import WorkflowForm from './Workflow/WorkflowForm';


function DocInfo() {
    const [document, setDocument] = useState({})
    const params = useParams()
    const [showAlert, setShowAlert] = useState(false);
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
        
        console.log(document);
        const fetchCurrentDoc= async () =>{
            const apiEndpointGetDocData = params.params.includes('CD')?`/api/cd/${params.params}`: `/api/sd/${params.params}`
        
              try{
                  const response = await fetch(apiEndpointGetDocData)
                  const data = await response.json()

                  
                  const dataObject = data.drawing[0]
                  setValues({ 
                    register: dataObject.register,
                    location: dataObject.location,
                    revisionNumber: dataObject.revision_number,
                    documentStatus: dataObject.document_status,
                    documentNumber: dataObject.document_number,
                    discipline: dataObject.discipline,
                    dateSubmitted: dataObject.date_submitted,
                    publishedBy: dataObject.published_by,
                    subject: dataObject.subject,
                    attachments: dataObject.attachments,
                    remarks: dataObject.remarks,
                    createdAt: dataObject.created_at,
                    lastUpdated: dataObject.updated_at,
                    deadline: dataObject.register ==='SD'? dataObject.required_response_date : "",
                    workflowStage: dataObject.register ==='SD'? dataObject.workflow_stage : ""
                })
                // if (response.ok){
                //   getDocument()
                // }
                // console.log(workflowStage);
              } catch (err) {
                  console.log(err);
              }
          }
     fetchCurrentDoc()
    }, [])


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
   


  return (
    <div className='dark:text-gray-400 bg-gray-300'>
      <DocNavBar documentNumber = {values?.documentNumber} workflowStage={values?.workflowStage} />
      {/* <WorkflowForm /> */}
      <Routes>
         {/* <Route path="/attachments" element={ <DocNavBar documentNumber = {values?.documentNumber}/>}/> */}
         <Route path="/attachments" element={ <Attachments />}/>
         <Route path="/form" element={ <WorkflowForm register={values?.register} documentNumber = {values?.documentNumber} subject ={values?.subject} deadline={values?.deadline} getDocument={getDocument}/>}/>
         <Route path="/newForm" element={ <InitialWorkflowForm register={values?.register} documentNumber = {values?.documentNumber} subject ={values?.subject} deadline={values?.deadline } getDocument={getDocument} publishedBy={values?.publishedBy}/>}/>

      </Routes>

      {showAlert && <Alert color={'green'} showAlert={showAlert} alertStatement={'Successfully submitted!.'}/>}
      <div className='h-[90%] w-[90%] bg-white mx-auto mt-[50px]'>
      <div className="mx-auto py-[50px]">
        <div className="grid gap-6 mb-6 md:grid-cols-3 p-4">
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Doc(System Generated)</label>
                <input
                  name='document_number' 
                  value={values?.documentNumber}
                  type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Register Generated" required/>
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Drawing Type</label>
                <input
                 name='register'
                 value={values?.register}
                 type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <select className="block appearance-none bg-grey-lighter border border-grey-lighter text-black py-3 px-4 pr-8 w-fit" id="grid-state" required
                name='location'
                value={values?.location}
                readOnly
                >   
                <option value={values?.location}>{values?.location}</option>
                    {/* <option value="">Select</option>
                    
                    {otherLevels.map((loc, index)=>(
                    <option key={index} value={loc}>{loc}</option>))}
                    {levels.map((loc, index)=>(
                    <option key={index} value={loc}>{loc}</option>))} */}
                </select>
            </div>  
            <div className='w-fit'>
                <label  className="block mb-2 text-sm font-medium text-gray-900">Latest Revision</label>
                <input 
                  name='revision_number'
                  value={values?.revisionNumber}
                  readOnly
                  min="0" max="10" type="number" placeholder={0} className="appearance-none border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div className='relative'>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Document Status</label>
                <select className="block appearance-none bg-grey-lighter border border-grey-lighter text-black py-3 px-4 pr-8 w-fit" id="grid-state"
                name='document_status'
                value={values?.documentStatus}
                readOnly
                >   
                <option value={values?.documentStatus}>{values?.documentStatus}</option>
                    {/* <option value="">Select</option>
                    
                    {docStatus.map((status)=>(
                    <option key={status} value={status}>{status}</option>))} */}
                </select>
            </div>
            <div className='relative'>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Discipline</label>
                <select className="block appearance-none border border-grey-lighter  py-3 px-4 pr-8 w-fit text-black" id="grid-state"
                name='document_number'
                value={values?.discipline}
                readOnly
                
                >   
                <option value={values?.discipline}>{values?.discipline}</option>
                    {/* <option value="">Select</option>
                    
                    {disciplineArr.map((role)=>(
                    <option key={role} value={role}>{role}</option>))} */}
                </select>
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Company from (System Generated)</label>
                <input name='company_from' type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Date Submitted</label>
                <input name='createdAt' type="text" readOnly value={values?.createdAt}  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Created by</label>
                <input 
                  name='published_by'
                  value={values?.publishedBy}
                  type="text" readOnly  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            { values.register === 'SD' ?
            <div className="flex w-full text-black">
                
             <p className='text-sm font-medium text-gray-900 mr-7'>Required Response Date: </p> 
             <p className='ml-5 bg-gray-500'>{values?.deadline.split('T')[0].split("-").reverse().join("-")}</p>
                
            </div>:null}
        </div>
            <div className="mb-6 p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                <input 
                  readOnly
                  name='subject'
                  type="text"
                  value={values?.subject}
                  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div> 

            <div className="mb-6 h-[5rem] p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Remarks</label>
                <textarea 
                   readOnly
                   name='remarks'
                   value={values?.remarks}
                   className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[5rem]" required/>
            </div>
            {/* <div className="flex justify-center items-center w-[70%] mx-auto mt-[50px]">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input 
                       name='attachments'
                       multiple
                       onChange={(e) => {
                        e.persist();
                        setValues({ ...values, attachments: e.target.files[0]});
                        console.log(e.target.files[0]);
                    }}
                      
                    //   value={values?.attachments}
                      id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>  
            <input
              value='Submit'
              type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> */}
        </div>
        </div>
    </div>
  )
}

export default DocInfo;