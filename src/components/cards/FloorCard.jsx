import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdFactory } from "react-icons/md";


const FloorCard = ({ FloorNumber, FactoryName, AreaName, CriticalMotor, FaultyMotors, FlawlessMotors, onClick }) => {


  // const handleCardClick = () => {
  //   // Call the onClick function and pass the prop values
  //   onClick({
  //     FactoryName,
  //     AreaName,
  //     CriticalMotor,
  //     FaultyMotors,
  //     FlawlessMotors,
  //   });
  // };


  return (
    <>
      <div className='flex flex-wrap lg:flex-nowrap justify-center' onClick={onClick}>
        <div className='bg-white dark:bg-secondary-dark-bg
               h-48 rounded-xl w-72 px-2 m-3 shadow-md flex flex-col justify-center cursor-pointer'>
          <div className='flex flex-row justify-center  font-semibold text-xl  mb-2 text-seconday-color'>
            <span>Floor: {FloorNumber}</span>
          </div>

          <div className='flex flex-col justify-center items-center text-sm text-slate-600 mb-3'>
            <span>{`Total critical motors: ${CriticalMotor}`}</span>
            <span>{`Total Faulty motors: ${FaultyMotors}`}</span>
            <span>{`Total Flawless motors: ${FlawlessMotors}`}</span>
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

          </div>
        </div>
      </div>
    </>
  )
}

export default FloorCard
