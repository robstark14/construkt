import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
      fetchUsers()
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
  const loadUsers = users.map((user)=>{
    return(     
        <tr key={user.email} className ="text-center">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <img src="https://www.linkedin.com/in/jose-robelle-pajarin-861a5696/overlay/photo/" className="h-12 w-12 bg-white rounded-full border" alt="..."/>
          <span className="ml-3 font-bold text-white">{user.first_name} {user.last_name} </span></th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.email}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-circle text-orange-500 mr-2"></i>{user.role}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {user.company}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {user?.package}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"></td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">{user.created}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">{user.last_updated}</td>

      </tr>      
    
    )
  }
    )


  return (
    <div>
      
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
                          name=""
                          id=""
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
            {loading && <tr><td>Loading....</td></tr>}
            {loadUsers}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  </section>      
      </div>  
      )
}

  export default Users;