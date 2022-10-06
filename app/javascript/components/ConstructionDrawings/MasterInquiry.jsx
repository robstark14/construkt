import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
// import EditUser from './EditUser';
// import ConfirmationModal from './ConfirmationModal';


function MasterInquiry() {
  const [drawings, setDrawings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  // const [selectedUser, setSelectedUser] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId]= useState("")
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: ""
  })
  useEffect(() => {
    const fetchDrawings= async () =>{
      const apiEndpoint =`/api/construction_drawings?search_term=${searchTerm}`
        try{
            const response = await fetch(apiEndpoint)
            const data = await response.json()
            setDrawings(data["construction_drawings"])
            setLoading(false)
        } catch (err) {
            console.log(err.message);
        }
    
      }
      fetchDrawings()
  }, [searchTerm])

  const onSearchTextChange = (e) =>  {
    setLoading(true);
    setSearchTerm(e.target.value);
  
    
  }    



  const loadDrawings = drawings.map((cd)=>{
    return(     
        <tr key={cd.document_number} className ="text-center">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <span className="ml-3 font-bold text-white">{cd.document_number}</span></th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{cd.subject}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-circle text-orange-500 mr-2">{cd.document_status}</i></td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {cd.published_by}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <a href={cd.attachments} target="_blank" className="shadow bg-gray-700 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded ml-5">View</a>
        </td>
        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
          <button className="shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded ml-5"
           onClick={()=>{
            navigate(`/edit-cd/${cd.id}`);
           }}
          >Edit</button>
          <button className="shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded ml-5"
            onClick={()=> {
              setcdId(cd.id)
              fetchcdEmail(cd.id)
              setShowModal(true)
            }}
          >Delete
          </button>
        </td> */}
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">{cd.created}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">{cd.last_updated}</td>

      </tr>      
    
    )
  }
    )


  return (
    <div>
      {/* <Routes>
        <Route path="/edit-user/:id" element={<EditUser />}/>
      </Routes> */}
    
    <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-sky-700 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-white">Construction Drawings</h3>
                    <div className="flex justify-between">
                    <div>
                      <div className="flex bg-gray-50 items-center p-2 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              />
                          </svg>
                          <input
                          className="bg-gray-50 outline-none ml-1 block text-black"
                          type="text"
                          value={searchTerm}
                          placeholder="search..."
                          onChange={onSearchTextChange}
                          />
                      </div>
                    </div>
                    <Link to="/new-user">
                      <button 
                      className="shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded ml-5"
                     >Add new CD</button>        
                    </Link>  
                </div>
            </div>
            </div>
        <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full bg-transparent border-collapse">
            <thead className='bg-sky-600 '>
                <tr>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Document No.</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Subject</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Status</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Published by</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Action</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Created at</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Last updated</th>

                </tr>
            </thead>

            <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {loadDrawings}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  </section>
  {/* {showModal && <ConfirmationModal setShowModal={setShowModal} deleteUser={()=>deleteUser(userId)} userData={userData} userId={userId}/>}       */}
  </div>  
      )
}

  export default MasterInquiry;