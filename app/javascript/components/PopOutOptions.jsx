import React from 'react'

function PopOutOptions() {
  return (
    <div className='absolute z-50 top-[40%]'>
        
        <div className="overflow-y-auto overflow-x-hidden h-modal md:h-full w-fit">
            <div className="w-fit h-full md:h-auto p-4">     
                    {/* <!-- Modal header --> */}
                    {/* <div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            Connect wallet
                        </h3>
                    </div> */}
                    {/* <!-- Modal body --> */}
                    
                    <ul className="my-4 p-4 rounded dark:bg-gray-600">
                        <li className='w-full p-2 rounded  hover:bg-gray-100 group hover:shadow dark:hover:bg-gray-500'>
                            <a href="#" className="w-full p-2 rounded-lg items-center text-base font-bold text-gray-900 dark:text-white">
                                <span className="whitespace-nowrap w-full">Add Document</span>
                            </a>
                        </li>
                        <li className='w-full p-2 rounded  hover:bg-gray-100 group hover:shadow dark:hover:bg-gray-500'>
                            <a href="#" className="w-full p-2 rounded-lg items-center text-base font-bold text-gray-900  dark:text-white">
                                <span className="whitespace-nowrap w-full">Search</span>
                            </a>
                        </li>
                        <li className='w-full p-2 rounded  hover:bg-gray-100 group hover:shadow dark:hover:bg-gray-500'>
                            <a href="#" className="w-full p-2 rounded-lg items-center text-base font-bold text-gray-900  dark:text-white">
                                <span className="whitespace-nowrap w-full">Master Inquiry</span>
                            </a>
                        </li>
                    </ul>   
                   
            </div>
        </div>
    </div>

  )
}

export default PopOutOptions