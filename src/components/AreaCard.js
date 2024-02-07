import React from 'react'

const AreaCard = ({AreaName, onClick}) => {
    console.log({AreaName})
   
  return (

    
      
      <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center  cursor-pointer' onClick={onClick}>
                  <div className='flex justify-center  font-extrabold text-xl tracking-tight   text-slate-500 mb-8 align-middle' >
                    <span className='my-auto'>{AreaName}</span>
                  </div>
                  {/* <span className='mx-auto'>{`Address: Faulty`}</span> */}
</div>

</div>
  
  )
}

export default AreaCard;
