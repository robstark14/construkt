import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import PageLoader from './PageLoader';


function AddDoc({drawing}) {
    const [levels, setLevels] = useState([])
    const [navigateDoc, setNavigateDoc] = useState("")
    const [loader, setLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState({
        userName: "", 
        documentNumber: "",
        register: "",
        company: ""
    })
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
        deadline:""

      });
      
    
    useEffect(() => {
     
     fetchCurrentUser()
     generateLevels()
     setLevels(levelsArr)
    

    }, [])

    
    const navigate = useNavigate()
    const createDoc= async (e) =>{
        // const dataFile = new FormData();
        // dataFile.append('file', values.attachments)
        console.log(values.attachments);
        e.preventDefault()
        const form = new FormData()
        form.append("document_status", values?.documentStatus)
        form.append("register", values?.register)
        form.append("location", values?.location)
        form.append("revision_number", values?.revisionNumber)
        form.append("discipline", values?.discipline)
        form.append("company_from", "Project Management")
        form.append("published_by",user?.userName)
        form.append("attachments", values?.attachments)
        form.append("subject", values?.subject)
        form.append("remarks", values?.remarks)
        values.register === 'SD' ?form.append("deadline", values?.deadline):null


        const apiEndpoint = `/api/create-${drawing}`
        console.log(drawing);
        console.log(apiEndpoint);

        try{
            setLoader(true)
            const response = await fetch(apiEndpoint, {
            mode: 'no-cors',
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify(form)
            body: form
            
            })

            if (response.ok) {
            console.log('posted!!');
            getDocNumber()
            }
            else {
                setShowAlert(true)
                setLoader(false)

            }
        } catch (err) {
            console.log(err);
            console.log(values.attachments);
            // setError(true)
            // setShowAlert(false)
        }

    }
    const disciplineArr = ["Architect on Record(AOR)", "Facade(FAC)", "Fire Detection and Alarm System(FDAS)", "Fire/Life Safety(FLS)", 
    'Fire Protection(FP)', 'Traffic Engineering(TE)', 'Fit-out', 'Mechanical(ME)', 'Plumbing/Sanitary(PD)', 'Electrical(EL)'
    , 'Extra Low Voltage(ELV)', 'Conveying System(CS)', '(MEPF)']
    const docStatus = ['DRAFT', 'FCD', 'WITHDRAWN', 'CANCELLED']
    const sdDocStatus = ['DRAFT', 'ISSUED']

   const otherLevels =['B1', 'B2', 'B3', 'B4','LR', 'URD', 'HP']
   const levelsArr = [] 
   const generateLevels = () =>{
       let i;
       for(i=1; i <= 30; i++){
       levelsArr.push(`L${i}`)

   }
   }
   const fetchCurrentUser= async () =>{
    const apiEndpointGetUserData = `/api/user-${drawing}`
      try{
        
          const response = await fetch(apiEndpointGetUserData)
          const data = await response.json()
          console.log(data);
          console.log(data.drawing);
          console.log(data.user);
          const dataObject = data.user

          setUser({userName: dataObject.user_name, documentNumber: dataObject.enum, register: dataObject.register, company: dataObject.company })
          setValues({ ...values, publishedBy: dataObject.userName })
          setValues({ ...values, register: dataObject.register })
          

          console.log(user.userName);

          
      } catch (err) {
          console.log(err);
      }
  }

  const getDocNumber= async () =>{
    const apiEndpointGetDocNum = `/api/${drawing}`
      try{
          
          const response = await fetch(apiEndpointGetDocNum)
          const data = await response.json()
          console.log(data);
          const dataObject = data?.doc_number
          console.log(dataObject);
          setNavigateDoc(dataObject)
          
          if (response.ok){

          
          navigate(`/${dataObject}`)}
        //   setShowAlert(true)

          console.log(dataObject);

          
      } catch (err) {
          console.log(err);
      }
  }
  
    const currDate = new Date().toLocaleDateString();
    
  return (
    <div className='dark:text-gray-400'>
        {loader && <PageLoader />}
        {showAlert && <Alert alertStatement='Something went wrong, please try again.' color = "reds" setShowAlert={setShowAlert}/>}
      <form className="h-[90%] w-[90%] bg-white mx-auto py-[50px]" onSubmit={createDoc}>
        <div className="grid gap-6 mb-6 md:grid-cols-3 ">
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Doc(System Generated)</label>
                <input
                  name='document_number' 
                  value={user.documentNumber}
                  type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Register Generated" required/>
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Drawing Type</label>
                <input
                 name='register'
                 value={values.register}
                 type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <select className="block appearance-none bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 w-fit" id="grid-state" required
                name='location'
                onChange={(e) => {
                    return setValues({ ...values, location: e.target.value });
                }}
                value={values.location}
                >   
                    <option value="">Select</option>
                    
                    {otherLevels.map((loc, index)=>(
                    <option key={index} value={loc}>{loc}</option>))}
                    {levels.map((loc, index)=>(
                    <option key={index} value={loc}>{loc}</option>))}
                </select>
            </div>  
            <div className='w-fit'>
                <label  className="block mb-2 text-sm font-medium text-gray-900">Latest Revision</label>
                <input 
                  name='revision_number'
                  value={values.revisionNumber}
                  onChange={(e) => {
                    return setValues({ ...values, revisionNumber: e.target.value });
                }}
                  min="0" max="10" type="number" placeholder={0} className="appearance-none border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div className='relative'>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Document Status</label>
                <select className="block appearance-none bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 w-fit" id="grid-state"
                name='document_status'
                onChange={(e) => {
                    return setValues({ ...values, documentStatus: e.target.value });
                }}
                value={values.documentStatus}
                >   
                    <option value="">Select</option>
                    
                    {(user.register !== 'CD'?sdDocStatus:docStatus).map((status)=>(
                    <option key={status} value={status}>{status}</option>))}
                </select>
            </div>
            <div className='relative'>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Discipline</label>
                <select className="block appearance-none bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 w-fit" id="grid-state"
                name='document_number'
                onChange={(e) => {
                    return setValues({ ...values, discipline: e.target.value });
                }}
                value={values.discipline}
                >   
                    <option value="">Select</option>
                    
                    {disciplineArr.map((role)=>(
                    <option key={role} value={role}>{role}</option>))}
                </select>
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Company from </label>
                <input name='company_from' type="text" value={values?.register === 'CD'? "Project Management": user.company} readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Date Submitted</label>
                <input name='createdAt' type="text" readOnly value={currDate}  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={currDate} required/>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Created by</label>
                <input 
                  name='published_by'
                  value={user?.userName}
                  type="text" readOnly  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
           { values.register === 'SD' ?
            <div className="flex items-center justify-start w-full">
                <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                    <label htmlFor="floatingInput" className="text-gray-700">Document Required by:</label>
                    <input type="date"
                    name='deadline'
                    value={values.deadline}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Select a date" data-mdb-toggle="datepicker" 
                    onChange={(e)=>{
                      return  setValues({...values, deadline: e.target.value})
                    }}
                    />
                </div>
            </div>:null}
        </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                <input 
                  name='subject'
                  onChange={(e) => {
                    return setValues({ ...values, subject: e.target.value });
                }}
                type="text"
                value={values.subject}
                className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div> 

            <div className="mb-6 h-[5rem]">
                <label className="block mb-2 text-sm font-medium text-gray-900">Remarks</label>
                <textarea 
                   name='remarks'
                   onChange={(e) => {
                    return setValues({ ...values, remarks: e.target.value });
                }}
                  value={values.remarks}
                  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[5rem]" required/>
            </div>
            <div className="flex justify-center items-center w-[70%] mx-auto mt-[50px]">
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
                      
                    //   value={values.attachments}
                      id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>  
            <input
            
              value='Submit'
              type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
             
        </form>

    </div>
  )
}

export default AddDoc;