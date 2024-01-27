import React from 'react'

const TotalNumberCard = ({iconSrc, placeName, quantity}) => {
  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
    <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-72 p-8  m-3 shadow-md flex flex-col justify-center align-center text-center'>
      {/* <div className='m-auto'><GrLocation/></div> */}
      <img className='m-auto' src={iconSrc} alt="overview" />
      <span>Total {placeName}</span>
      <span>{quantity}</span>
    </div>
  </div>
  )
}

export default TotalNumberCard
