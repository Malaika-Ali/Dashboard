import React from 'react'
import PropTypes from 'prop-types';
import { FaLocationDot } from "react-icons/fa6";



const FactoryCard = ({ FactoryName, AreaName, CriticalMotor, FaultyMotors, FlawlessMotors, onClick }) => {


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
               h-48 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center cursor-pointer card'
        >


          <span className='flex flex-row justify-center  font-semibold text-xl  mb-4 text-seconday-color' >{FactoryName}</span>

          <div className='flex flex-col justify-center items-center text-sm text-slate-600 mb-3'>
            <span>{`critical motors: ${CriticalMotor}`}</span>
            <span>{`Faulty motors: ${FaultyMotors}`}</span>
            <span>{`Flawless motors: ${FlawlessMotors}`}</span>
          </div>

          <div className='flex flex-row justify-center items-center mt-2 gap-1 text-xs text-gray-500'>
            <FaLocationDot />
            <span>{AreaName}</span>
          </div>


        </div>
      </div>

    </>
  )
}


FactoryCard.propTypes = {
  FactoryName: PropTypes.string.isRequired,
  AreaName: PropTypes.string.isRequired,
  CriticalMotor: PropTypes.number.isRequired,
  FaultyMotors: PropTypes.number.isRequired,
  FlawlessMotors: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FactoryCard
