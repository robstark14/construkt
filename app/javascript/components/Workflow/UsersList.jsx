import React, { useEffect, useState } from 'react'


function UsersList({setShowUsers,fetchUsers, users, loading, onSearchTextChange, setNextActivityOwner, searchTerm}) {
  
  useEffect(() => {
    
      fetchUsers()
  }, [searchTerm])

  
  const loadUsers = users.map((user)=>{
    return(     
        <tr key={user.email} className ="text-center hover:cursor-pointer hover:bg-white hover:text-black text-white"
            onClick={()=>{

                setNextActivityOwner(user)
                setShowUsers(false)
            }}
        >
        <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          {/* <img src="" className="h-12 w-12 bg-white rounded-full border" alt="..."/> */}
          <span className="ml-3 font-bold">{user.first_name} {user.last_name} </span></th>
        {/* <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.email}</td> */}
        {/* <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-circle text-orange-500 mr-2">{user.role}</i></td> */}
        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {user.company}
        </td>
      </tr>      
    
    )
  }
    )


  return (
    <div className="fixed inset-0 z-[999999] overflow-y-auto w-full flex justify-center items-center">
    <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setShowUsers(false)}
    ></div>
         
    <section className="bg-blueGray-50 w-[350px]  ">
        <div className="w-full px-4">
            <div className="min-h-[400px] max-h-[600px] relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-700 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex justify-between items-center">
                   
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
                          placeholder="Search"
                          onChange={onSearchTextChange}
                          />
                      </div>
                    </div>
                  
                </div>
            </div>
            </div>
        <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full bg-transparent border-collapse">
            <thead className='bg-sky-600 '>
                <tr>
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Full Name</th>
                    {/* <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Email</th> */}
                    {/* <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Role</th> */}
                    <th className="text-center px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-white">Company</th>
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
    
  </div>  
  
      )
}

  export default UsersList;