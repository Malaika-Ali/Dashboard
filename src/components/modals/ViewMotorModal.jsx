import React, { useEffect } from 'react';
import SingleLineChart from '../charts/SingleLineChart';
import { RxCross2 } from "react-icons/rx";


function ViewMotorModal( {onClick, motorName, motorStatus,floorNumber, factoryName, areaName  }) {

    const lineChartData = {
          categories: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
          values: [30, 40, 25, 50, 49, 70, 22],
        };


        const getStatusColor = () => {
          switch (motorStatus) {
            case 'Flawless':
              return 'text-green-500'; // Green color for Flawless
            case 'Critical':
              return 'text-red-500'; // Red color for Critical
            case 'Faulty':
              return 'text-yellow-500'; // Yellow color for Faulty
            default:
              return 'text-gray-500'; // Default color if none of the above conditions match
          }
        };
      
    return (
        <div className="fixed inset-0 bg-opacity-50 bg-gray-800 z-50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-transform duration-300 ease-in-out transform translate-y-0 -translate-y-ful w-full" >





<div className="bg-gray-900 flex items-center justify-center">
      <div className="rounded shadow-xl overflow-hidden w-full md:flex max-w-screen-md">
        <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 main-color text-white items-center">
          {/* Replace the line chart with SingleLineChart component */}
          <SingleLineChart
            data={lineChartData}
            chartTitle="Motor's Weekly Report"
          />
    
        </div>
        <div className="flex w-full md:w-1/2 pt-0 p-10 bg-gray-100 text-gray-600 items-center justify-center relative">

        <button className='mb-4 absolute top-2 right-2 hover:bg-gray-200 rounded-full p-2' 
        onClick={onClick}
        ><RxCross2 /></button>
          <div className="w-full">
            {/* <h3 className="text-lg font-semibold leading-tight text-gray-800">Motor Name</h3> */}
            <div className="text-sm leading-tight mb-10 flex flex-row justify-between items-start"><span>Updated:
             Feb 2nd, 2024</span>    <span> 4:00pm </span></div>
            <div className="flex w-full items-end mb-10 justify-between">
              <span className="block leading-none text-2xl text-gray-800">{motorName}</span>
              <span className={`block leading-5 text-sm ml-4 ${getStatusColor()}`}>{motorStatus}</span>
            </div>
            <div className="flex flex-col w-full text-base">
              <div className="flex">
                <div className="flex pr-3 text-left font-semibold">Floor Number</div>
                <div className="flex-1 px-3 text-right">{floorNumber}</div>
              </div>
              <div className="flex">
                <div className="flex pr-3 text-left font-semibold">Factory Name</div>
                <div className="flex-1 pl-3 text-right">{factoryName}</div>
              </div>
            </div>
            {/* <div className="flex w-full text-xs"> */}
              <div className="flex">
                <div className="flex pr-3 text-left font-semibold">Area Name</div>
                <div className="pl-3 flex-1 text-right">{areaName}</div>
              </div>
              {/* <div className="flex w-7/12">
                <div className="flex-1 px-3 text-left font-semibold">P/E ratio</div>
                <div className="pl-3 text-right">20.10</div>
              </div>
            </div>
            <div className="flex w-full text-xs">
              <div className="flex w-5/12">
                <div className="flex-1 pr-3 text-left font-semibold">Low</div>
                <div className="px-3 text-right">2.215</div>
              </div>
              <div className="flex w-7/12">
                <div className="flex-1 px-3 text-left font-semibold">Dividend yield</div>
                <div className="pl-3 text-right">1.67%</div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>         

        </div>
    )
}

export default ViewMotorModal
