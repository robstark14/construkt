import React, { useEffect, useState } from 'react'


function WorkflowSummary({getWorkflowSummary, summary}) {
  
  useEffect(() => {  
      getWorkflowSummary()
  }, [])

  
  
  const loadSummary = summary?.map((wf)=>{
    return(     
        <tr key={wf.id} className ="text-center">
            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{wf.workflow_activity}</td>
            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <i className="fas fa-circle text-orange-500 mr-2">{wf.outcome}</i></td>
            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {wf.activity_remarks}
            </td>
            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <img src="https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" className="h-12 w-12 bg-white rounded-full border" alt=""/>
                <span className="ml-3 font-bold text-black">{wf.current_activity_owner}</span>
            </td>
            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">{wf.created_at.split('T')[0].split("-").reverse().join("-")}</td>
            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">{wf.workflow_deadline.split('T')[0].split("-").reverse().join("-")}</td>
      </tr>      
    
    )
  }
    )


  return (
    <div className='text-center'>

    <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100 text-black">
        <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full bg-transparent border-collapse">
                <thead className='bg-gray-100 '>
                    <tr>
                        <th className="text-center px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black">Activity</th>
                        <th className="text-center px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black">Outcome</th>
                        <th className="text-center px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black">Remarks</th>
                        <th className="text-center px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black">Activity Owner</th>
                        <th className="text-center px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black">Published at</th>
                        <th className="text-center px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-black">Deadline</th>
                    </tr>
                </thead>

                <tbody>
                    {loadSummary}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  </section>

  </div>  
      )
}

  export default WorkflowSummary;