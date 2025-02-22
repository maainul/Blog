import React from 'react'

const Error = ({ error }) => {
    return (
        <div className=' h-[450px] w-full flex items-center justify-center bg-gray-200 rounded-xl '>
            <div className=" text-red-500 text-2xl">
                <div>{error}</div>
            </div>
        </div>
    )
}

export default Error
