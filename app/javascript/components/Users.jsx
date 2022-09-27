import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import EditUser from './EditUser';
import ConfirmationModal from './ConfirmationModal';


function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
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
      fetchUsers()
  }, [searchTerm])

  const onSearchTextChange = (e) =>  {
    setLoading(true);
    setSearchTerm(e.target.value);
  
    
  }    

    const fetchUserEmail= async (userId) =>{
      const apiEndpointGetUserData = `/api/get-user/${userId}`
        try{
          
            const response = await fetch(apiEndpointGetUserData)
            const data = await response.json()
            const dataObject = data['user']
            console.log(dataObject);
            console.log(data);
    
            setUserData({
              firstName: dataObject.first_name,
              lastName: dataObject.last_name,
              email:dataObject.email,
             })
            
        } catch (err) {
            console.log(err);
        }
    }
    const deleteUser= async (userId) =>{

      const apiEndpointDelete =`/api/delete-user/${userId}`
    
          try{
              const response = await fetch(apiEndpointDelete, {
                method: 'DELETE',
              })
    
              if (response.ok) {
                navigate("/users")
                navigate(0)
              } 
          } catch (err) {
              console.log(err.message);
          }
    }
    

  const loadUsers = users.map((user)=>{
    return(     
        <tr key={user.email} className ="text-center">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img src="" className="h-12 w-12 bg-white rounded-full border" alt="..."/>
          <span className="ml-3 font-bold text-white">{user.first_name} {user.last_name} </span></th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.email}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-circle text-orange-500 mr-2">{user.role}</i></td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {user.company}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {user.package}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
          <button className="shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded ml-5"
           onClick={()=>{
            navigate(`/edit-user/${user.id}`);
           }}
          >Edit</button>
          <button className="shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded ml-5"
            onClick={()=> {
              setUserId(user.id)
              fetchUserEmail(user.id)
              setShowModal(true)
            }}
          >Delete
          </button>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">{user.created}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">{user.last_updated}</td>

      </tr>      
    
    )
  }
    )


  return (
    <div>
      <Routes>
        <Route path="/edit-user/:id" element={<EditUser />}/>
      </Routes>
    
    <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-sky-700 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-white">Users</h3>
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
                     >New</button>        
                    </Link>  
                </div>
            </div>
            </div>
        <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full bg-transparent border-collapse">
            <thead className='bg-sky-600 '>
                <tr>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Full Name</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Email</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Role</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Company</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Package</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Actions</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Created at</th>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Last updated</th>

                </tr>
            </thead>

            <tbody>
            {loading && <tr><td>Loadingssss....</td></tr>}
            {loadUsers}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  </section>
  {showModal && <ConfirmationModal setShowModal={setShowModal} deleteUser={()=>deleteUser(userId)} userData={userData} userId={userId}/>}      
  </div>  
      )
}

  export default Users;