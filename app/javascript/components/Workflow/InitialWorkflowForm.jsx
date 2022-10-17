import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import PageLoader from '../PageLoader';
import SearchUsers from './SearchUsers';
import UsersList from './UsersList';


function InitialWorkflowForm({documentNumber, subject, deadline, getDocument, publishedBy, register, document}) {
const navigate= useNavigate()
const [showUsers, setShowUsers] = useState(false)
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("")
const [loading, setLoading] = useState(false)
const [nextActivityOwner, setNextActivityOwner] = useState("")
const [loader, setLoader] = useState(false)
const [showAlert, setShowAlert] = useState(false);
const [values, setValues] = useState({
    activitySubject: "Initiated Workflow",
    outcome:"",
    activityRemarks: "",
    attachments:{},
    workflowDeadline:""
  });
  useEffect(() => {
    
    getDocument()
    console.log(publishedBy);
    console.log(`${nextActivityOwner.first_name} ${nextActivityOwner.last_name}`);
  }, [])

  const fetchUsers= async () =>{
    const apiEndpoint =`/api/users?search_term=${searchTerm}`
      try{
          const response = await fetch(apiEndpoint)
          const data = await response.json()
          setUsers(data["users"])
          setLoading(false)
      } catch (err) {
          console.log(err.message);
      }
  
    }
    const onSearchTextChange = (e) =>  {
        setLoading(true);
        setSearchTerm(e.target.value);
      
        
      }   

    const createDoc= async (e) =>{
    // const dataFile = new FormData();
    // dataFile.append('file', values.attachments)
    console.log(values.attachments);
    e.preventDefault()
    const form = new FormData()
    form.append("current_activity_owner", publishedBy)
    form.append("next_activity_owner", `${nextActivityOwner.first_name} ${nextActivityOwner.last_name}`)
    form.append("activity_subject", values?.activitySubject)
    form.append("outcome", document?.activity)
    form.append("activity_remarks", values?.activityRemarks)
    form.append("workflow_deadline", values?.workflowDeadline)
    form.append("attachments", values?.attachments)



    const apiEndpoint = `/api/create-${register?.toLowerCase()}-activity/${documentNumber}`
  
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
            navigate(`/${documentNumber}/workflow-summary`)

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
  return (

  <div className='h-full w-full p-4'>
   {loader && <PageLoader />}
   {showAlert && <Alert alertStatement='Something went wrong, please try again.' color = "red" setShowAlert={setShowAlert}/>}
   {showUsers && <UsersList setShowUsers={setShowUsers} fetchUsers={fetchUsers} 
    users={users} loading={loading} onSearchTextChange={onSearchTextChange} 
    setNextActivityOwner={setNextActivityOwner} searchTerm={searchTerm}/>}
  <div className='border border-y-2 border-gray-800 w-full h-[50px] relative bg-white mb-4 text-black flex justify-around items-center'>
    <span>
    {documentNumber}
    </span>
    <span>
    {subject}
    </span>
    <span>
     Document Required by: {deadline.split('T')[0].split("-").reverse().join("-")}
    </span>
    
 </div>
 <form className="w-full grid grid-cols-3 h-full gap-5 place-content-center" onSubmit={createDoc}>
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className='bg-gray-300 w-full p-2 border text-black'>
      <span className="w-72 h-72 rounded-[50%] bg-blue-700 text-white px-2 py-1 mr-4">1</span>
      <span>Review Information</span>
    </div>
    <div className="my-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Actvity Owner
      </label>
      <input readOnly value={publishedBy} name="current_activity_owner"className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    <div className="mb-6 h-[5rem]">
                <label className="block mb-2 text-sm font-medium text-gray-900">Remarks</label>
                <textarea 
                   name='activity_remarks'
                   onChange={(e) => {
                    return setValues({ ...values, activityRemarks: e.target.value });
                }}
                  value={values.activityRemarks}
                  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[5rem]" required/>
            </div>
    
    
  </div>
  <div className="bg-white shadow-4xl rounded px-8 pt-6 pb-8 mb-4">
    <div className='bg-gray-300 w-full p-2 border text-black'>
      <span className="w-72 h-72 rounded-[50%] bg-yellow-700 text-white px-2 py-1 mr-4">2</span>
      <span>Select Next Activity Owner</span>
    </div>
    <div className="my-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Next Activity Owner
      </label>
      {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Activity Owner"/> */}
      <SearchUsers setShowUsers={setShowUsers} />
      {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        For Info
      </label>
      <SearchUsers setShowUsers={setShowUsers}/> */}

      {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Activity Owner"/> */}
      {nextActivityOwner !== undefined && nextActivityOwner !==""?
      <div className='p-2 mt-5 text-white bg-blue-600 rounded-lg w-fit '>
      {`${nextActivityOwner?.last_name}, ${nextActivityOwner?.first_name}   -  ${nextActivityOwner?.company}`}
      </div>:null}
    </div>
    
  </div>
  <button type='submit' className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded-xl m-4">
    Send to next Activity
  </button>
  <div className="col-span-3">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle bg-white">
            <div className="overflow-hidden border rounded-lg">
            <div className='bg-gray-300 w-full p-2 border text-black'>
                <span className="w-72 h-72 rounded-[50%] bg-rose-700 text-white px-2 py-1 mr-4">3</span>
                <span>Upload Documents</span>
            </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                No.
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Subject
                            </th>                           
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 w-[70%]">
                        <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                1
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {values?.attachments.name}
                            </td>
                          

                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div className='grid grid-flow-col w-full bg-white p-2'>
            <label className="text-right block text-sm font-medium text-black" htmlFor="multiple_files pl-4">Upload multiple files</label>
            <input className="ml-4 block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 
            focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-fit" type="file" multiple
                name='attachments'
                onChange={(e) => {
                e.persist();
                setValues({ ...values, attachments: e.target.files[0]});
                console.log(e.target.files[0].name);
                }}
                />
        </div>
    </div>
  </div>
  

  </form>
</div>

  )
}

export default InitialWorkflowForm