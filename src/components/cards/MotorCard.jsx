import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdFactory } from "react-icons/md";

function MotorCard({ motorName, FloorNumber, AreaName, FactoryName, motorStatus }) {


  const getStatusColor = () => {
    switch (motorStatus) {
      case 'Flawless':
        return 'text-green-500'; // Green color for Flawless
      case 'Critical':
        return 'text-red-500'; // Red color for Critical
      case 'Faulty':
        return 'text-yellow-500'; // Yellow color for Faulty
      default:
        return 'text-gray-500'; // Default color if none of the above conditions match
    }
  };

  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center' >
      <div className='bg-white sm:h-44 sm:w-64
     md:h-48 rounded-xl md:w-72 px-2 m-3 shadow-md flex flex-col justify-center cursor-pointer card'>
        <div className='flex flex-row justify-center  font-semibold md:text-lg lg:text-xl text-secondary-color mb-2 mt-3'>
          <span> {motorName}</span>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <span className='mx-auto font-medium sm:text-xs md:text-sm lg:text-md tracking-tight text-gray-500  mb-2'>Floor number: {FloorNumber}</span>
        </div>

        {/* <div className='flex flex-col justify-center items-center'>
      <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>{motorStatus}</span>
      </div> */}

        <div className='flex flex-col justify-center items-center'>
          <span className={`mx-auto font-medium md:text-lg lg:text-base ${getStatusColor()}  pb-5`}>{motorStatus} </span>
        </div>

        <div className='flex flex-row justify-between items-center px-2 text-gray-500'>
          <div className='flex flex-row justify-center items-center mt-2 gap-1 text-xs'>
            <FaLocationDot />
            <span>{AreaName}</span>
          </div>
          <div className='flex flex-row justify-center items-center mt-2 gap-1 text-xs'>
            <MdFactory />
            <span>{FactoryName}</span>
          </div>
          {/* <div className='flex flex-row justify-center items-center mt-2 gap-1'>
      <MdFactory />
      <span>{FloorNumber}</span>
      </div> */}

        </div>
      </div>
    </div>
  )
}

export default MotorCard
