import React from 'react'
import criticalalert from '../../assets/criticalalert.png';
import faultyalert from '../../assets/faultyalert.png';

const NotificationCard = ({type, message, date, time, onClick}) => {
    const icon = type === "Critical" ? criticalalert : faultyalert;
  return (
    <div className="flex flex-row justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer border-b border-gray-200"
    onClick={onClick}>
                <div className="flex-shrink-0 mr-3 px-1">
                <img src={icon} alt={`${type} alert`} className="w-8 h-8" />
                </div>
                <div className='flex flex-col'>
                  <h4 className="text-sm font-medium py-1">{type}</h4>
                  <p className="text-xs text-gray-500 py-1">{message}</p>
                  <div className='flex flex-row justify-between items-center py-2'>
                  <p className="text-xs text-gray-400">{date}</p>
                  <p className="text-xs text-gray-400">{time}</p>
                  </div>
                </div>
                <div className=' flex justify-ceter items-center secondary-color w-1  h-2 -mt-6 rounded-full p-1 ml-2'></div>
              </div>
            
  )
}

export default NotificationCard
