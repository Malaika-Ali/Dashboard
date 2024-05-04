import React from 'react'

const TotalNumberCard = ({iconSrc, placeName, quantity, onClick}) => {
  return (
    <div className='bg-white h-28 rounded-xl w-52 p-5  m-3 dark-box-shadow flex flex-col gap-2 lg:flex-nowrap justify-center items-center cursor-pointer large:w-[20rem] large:h-40 large:gap-4 large:text-2xl' onClick={onClick}>
      <img className='mx-auto' src={iconSrc} alt="overview" />
      {/* {iconSrc} */}
      <span className='text-sm large:text-lg text-gray-400'>Total {placeName}</span>
      <span className='font-bold text-gray-600'>{quantity}</span>
    </div>
  )
}

export default TotalNumberCard