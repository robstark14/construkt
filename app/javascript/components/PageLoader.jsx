import React from 'react'

function PageLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-300 fixed top-0 left-0 w-full h-screens opacity-50 z-[99999]">
            <div className="grid gap-2">
                {/* <div className="flex items-center justify-center ">
                    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-center ">
                    <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
                </div> */}
                <div className="flex items-center justify-center ">
                    <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                </div>
                <p className='text-black font-bold text-2xl text-center tracking-wide'>Submitting.....</p>
            </div>

        </div>
  )
}

export default PageLoader