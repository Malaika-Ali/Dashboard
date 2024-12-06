import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";

const SecondNavbar = ({pageName}) => {
    return (
        <div className='flex flex-row justify-between items-center'>

            <div className='text-gray-900 sm:text-base lg:text-xl font-semibold'>
                <h4>{pageName}</h4>
            </div>

            <div className="flex justify-between gap-2 items-center  rounded-lg shadow-xl bg-white px-1 md:px-2 md:my-2 lg:mt-3 py-2 md:py-3">
                <span className='gray-icon'><FaCalendarAlt /></span>
                <span className='text-xs gray-icon'>Last Updated: 29.07.2024  2:00:32 pm</span>
            </div>

        </div>
    )
}

export default SecondNavbar
