import React, { useEffect, useState } from 'react'

function WorkflowForm({documentNumber, subject, deadline, getDocument}) {

  useEffect(() => {
    
    getDocument()
  }, [])
  
  return (

  <div className='h-full w-full p-4'>

  <div className='border border-y-4 w-full h-[50px] relative bg-white mb-4 text-black flex justify-around items-center'>
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
 <div className="w-full grid grid-cols-3 h-full gap-5">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className='bg-gray-300 w-full p-2 border text-black'>
      <span className="w-72 h-72 rounded-[50%] bg-blue-700 text-white px-2 py-1 mr-4">1</span>
      <span>Review Information</span>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    
    
  </form>
  <form className="bg-white shadow-4xl rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
  </form>
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
  </form>
  <div className="col-span-2">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle bg-white">
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Edit
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 w-[70%]">
                        <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                1
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                Jone Doe
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                jonne62@gmail.com
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                    className="text-green-500 hover:text-green-700"
                                    href="#"
                                >
                                    Edit
                                </a>
                            </td>

                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>

        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="multiple_files">Upload multiple files</label>
        <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 
            focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple=""/>

    </div>
  </div>
  <button className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded">
    Send to next Activity
  </button>

  </div>
</div>

  )
}

export default WorkflowForm