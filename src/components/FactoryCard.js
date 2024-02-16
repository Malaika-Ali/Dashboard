import React from 'react'
import PropTypes from 'prop-types';


const FactoryCard = ({FactoryName, AreaName, CriticalMotor, FaultyMotors,FlawlessMotors, onClick}) => {


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
              <div className='bg-white dark:bg-secondary-dark-bg h-52 rounded-xl w-72 px-2 m-3 shadow-md flex flex-col justify-center cursor-pointer'>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>{FactoryName}</span> <span>{AreaName}</span>
                </div>
                <span>{`Total critical motors: ${CriticalMotor}`}</span>
                <span>{`Total Faulty motors: ${FaultyMotors}`}</span>
                <span>{`Total Flawless motors: ${FlawlessMotors}`}</span>


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
