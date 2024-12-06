import React from 'react'
import criticalalert from '../../assets/criticalalert.png';
import faultyalert from '../../assets/faultyalert.png';
import { FcClock } from "react-icons/fc";

const NotificationPageCard = ({ type, message, date, time, onClick }) => {

    const icon = type === "Critical" ? criticalalert : faultyalert;

    return (
        <div className='flex flex-row items-start hover:bg-gray-100 px-8 py-4 cursor-pointer transition duration-300'
        onClick={onClick}>
            <div className="flex flex-shrink-0 mr-3 px-1 py-2">
                <img src={icon} alt={`${type} alert`} className="w-8 h-8" />
            </div>

            <div className="flex flex-col py-1 px-4">
            <span className='text-lg'>{type}</span>

            <div className='flex flex-row justify-between  items-center'>
            <span className='text-sm text-gray-500 py-1'>{message}</span>
            {/* <div className='absolute right-20 rounded-full bg-secondary-color w-2 h-2 py-1'>
            </div> */}
            </div>

            <div className="flex flex-row items-center text-sm text-gray-400 py-1 gap-1">
                <span><FcClock /></span>
                <span>{`${date},`}</span>
                <span>{time}</span>
            </div>

            </div>

            

        </div>
    )
}

export default NotificationPageCard
