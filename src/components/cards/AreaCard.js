import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

const AreaCard = ({ AreaName, onClick }) => {
  return (
    <div className='flex flex-wrap card lg:flex-nowrap justify-center'>
    <div className='bg-white h-40 rounded-xl w-56 px-2 m-3 shadow-xl flex flex-col justify-center items-center cursor-pointer font-semibold sm:text-sm md:text-base lg:text-xl tracking-tight large:h-48 large:w-64 gap-[0.4em]' onClick={onClick}>
      
      <span className=' text-md text-main-color'><IoLocationSharp /></span>
      <span className='text-seconday-color'>{AreaName}</span>
    </div>
    </div>
  )
}

export default AreaCard;
