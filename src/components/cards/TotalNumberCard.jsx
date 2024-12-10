import React from 'react'

const TotalNumberCard = ({iconSrc, placeName, quantity, onClick}) => {
  return (
    <div className='bg-white h-auto rounded-lg w-auto md:w-[14rem] lg:w-[15rem] p-5  shadow-md border border-slate-200 flex flex-col gap-2 lg:flex-nowrap justify-center items-start cursor-pointer large:w-[18rem] large:h-40 large:gap-4 large:text-xl card-up hover:shadow-xl transition-all duration-500' onClick={onClick}>
      <img className='text-gray-400' src={iconSrc} alt="overview" />
      <span className='text-sm large:text-base text-gray-500'>Total {placeName}</span>
      <span className='font-bold ml-0.5 text-gray-600'>{quantity}</span>
    </div>
  )
}

export default TotalNumberCard
