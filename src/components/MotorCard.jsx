import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdFactory } from "react-icons/md";

function MotorCard({motorName, FloorNumber, AreaName,FactoryName, motorStatus}) {
  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center' >
    <div className='bg-white dark:bg-secondary-dark-bg
     h-48 rounded-xl w-72 px-2 m-3 shadow-md flex flex-col justify-center cursor-pointer'>
      <div className='flex flex-row justify-center  font-extrabold text-xl tracking-tight   text-slate-900 mb-2'>
        <span> {motorName}</span> 
      </div>

      <div className='flex flex-col justify-center items-center'>
      <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  mb-2'>Floor number: {FloorNumber}</span>
      </div>

      <div className='flex flex-col justify-center items-center'>
      <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>{motorStatus}</span>
      </div>

<div className='flex flex-row justify-between items-center px-2'>
      <div className='flex flex-row justify-center items-center mt-2 gap-1'>
      <FaLocationDot />
      <span>{AreaName}</span>
      </div>
      <div className='flex flex-row justify-center items-center mt-2 gap-1'>
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
