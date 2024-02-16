import React from 'react'

const AreaCard = ({ AreaName, onClick }) => {
  return (
    <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center  items-center cursor-pointer font-extrabold text-xl tracking-tight   text-slate-500 dark-box-shadow' onClick={onClick}>
      <span className='my-auto'>{AreaName}</span>
    </div>
  )
}

export default AreaCard;
