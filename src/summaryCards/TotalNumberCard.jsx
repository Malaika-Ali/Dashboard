import React from 'react'

const TotalNumberCard = ({iconSrc, placeName, quantity, onClick}) => {
  return (
    <div className='bg-white h-28 rounded-xl w-52 p-5  m-3 dark-box-shadow flex flex-col gap-2 lg:flex-nowrap justify-center items-center cursor-pointer' onClick={onClick}>
      <img className='m-auto' src={iconSrc} alt="overview" />
      <span className='text-sm text-gray-400'>Total {placeName}</span>
      <span className='font-bold text-gray-600'>{quantity}</span>
    </div>
  )
}

export default TotalNumberCard
