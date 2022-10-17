import React, { useEffect } from 'react'

function DocData({values, fetchCurrentDoc}) {
    useEffect(() => {
        
     fetchCurrentDoc()
     console.log(values);
    }, [])

  return (
    <div className='h-[90%] w-[90%] bg-white mx-auto mt-[50px]'>
       <div className="mx-auto py-[50px]">
        <div className="grid gap-6 mb-6 md:grid-cols-3 p-4">
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Doc(System Generated)</label>
                <input
                  name='document_number' 
                  value={values?.documentNumber}
                  type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Register Generated" />
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Drawing Type</label>
                <input
                 name='register'
                 value={values?.register}
                 type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className='w-fit'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <select className="block appearance-none bg-grey-lighter border border-grey-lighter text-black py-3 px-4 pr-8 w-fit" id="grid-state" 
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
                  min="0" max="10" type="number" placeholder={0} className="appearance-none border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                <input name='company_from' type="text" readOnly className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Date Submitted</label>
                <input name='createdAt' type="text" readOnly value={values?.createdAt}  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Created by</label>
                <input 
                  name='published_by'
                  value={values?.publishedBy}
                  type="text" readOnly  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            { values?.register === 'SD' ?
            <div className="flex w-full text-black">
                
             <p className='text-sm font-medium text-gray-900 mr-7'> Response Date: </p> 
             <p className='ml-5 bg-gray-lighter p-2'>{values?.deadline.split('T')[0].split("-").reverse().join("-")}</p>
                
            </div>:null}
        </div>
            <div className="mb-6 p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                <input 
                  readOnly
                  name='subject'
                  type="text"
                  value={values?.subject}
                  className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div> 

            <div className="mb-6 h-[5rem] p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Remarks</label>
                <textarea 
                   readOnly
                   name='remarks'
                   value={values?.remarks}
                   className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[5rem]" />
            </div>
        </div>
        </div>
  )
}

export default DocData