import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";

const SecondNavbar = ({pageName}) => {
    return (
        <div className='flex flex-row justify-between items-center'>
            {/* <div>
                <h4 className='gray-icon text-sm'>Dashboard</h4>
            </div> */}

            <div className='gray-icon sm:text-xs md:text-sm'>
                <h4>{pageName} / Dashboard</h4>
            </div>

            <div className="flex justify-between gap-2 items-center  rounded-lg shadow-xl bg-white  px-2 md:my-2 lg:mt-3 py-3">
                <span className='gray-icon'><FaCalendarAlt /></span>
                <span className='text-xs gray-icon font-mono'>Last Updated: 29-07-2024  2:00:32 pm</span>
            </div>

        </div>
    )
}

export default SecondNavbar
