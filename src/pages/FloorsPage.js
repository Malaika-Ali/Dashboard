import React from 'react'
import { FactoryCard } from '../components'

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import filterby from '../assets/filterby.svg'

const FloorsPage = () => {
  return (
    <>
                  {/* Floors Report */}
                  <div className="flex flex-col m-5">

{/* heading section */}
<div className="flex flex-row justify-between">
    <h1 className='font-extrabold text-xl tracking-tight   text-slate-900 '>Floors Report</h1>
    <div className="flex flex-row justify-between">
        <img src={filterby} alt="" />
        <span className='text-black'>Sort</span></div>
</div>

{/* Flex Container */}
<div className='flex justify-between mt-4 bg-slate-200 rounded-xl w-90 m-3'>

    {/* left box */}

    <div className='flex flex-wrap lg:flex-nowrap '>
        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between'>
            <img src={criticalalert} />
            <span>Critical Alerts</span>
            <span>05</span>
        </div>
    </div>


    {/* middle box */}

    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8 m-3 shadow-md flex flex-row justify-between'>
            <img src={faultyalert} alt="" />
            <span>Faulty Alerts</span>
            <span>03</span>
        </div>
    </div>


    {/* Right box */}

    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between '>
            <img src={flawless} alt="" />
            <div>Flawless</div>
            <div>14</div>
        </div>
    </div>

</div>

{/* Areas List Section */}
<div className="flex flex-row justify-between mt-10 m-5">
    <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Floors List</h1>
    <div className='flex flex-row'>
        <img src={filterby} alt="" />
        Sort</div>
</div>


{/* boxes section */}
<div className='flex flex-col justify-between mt-3 bg-slate-200 rounded-xl m-3 w-90 '>

    {/* row 1 */}
    <div className="flex flex-row justify-between">
        <FactoryCard FactoryName="First Floor" />
        <FactoryCard FactoryName="Second Floor" />
        <FactoryCard FactoryName="Third Floor"  />
    </div>

    {/* row 2 */}
    <div className="flex flex-row justify-between">
    <FactoryCard FactoryName="Fourth Floor" />
        <FactoryCard FactoryName="Fifth Floor" />
        <FactoryCard FactoryName="Sixth Floor"  />
    </div>
</div>
</div>
    </>
  )
}

export default FloorsPage
