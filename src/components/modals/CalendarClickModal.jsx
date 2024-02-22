import React from 'react'
import ModalTable from './ModalTable';
import { RxCross2 } from "react-icons/rx";



function CalendarClickModal({onClick, TableHeading}) {
// table columns headings
const columns = [
    {
      name: 'Motor Name',
      selector: row => row.motorName,
      sortable: true,
      center: true
    },
    {
      name: "Floor Number",
      selector: row => row.floorNumber,
      sortable: true,
      center: true
    },
    {
      name: "Factory Name",
      selector: row => row.factoryName,
      sortable: true,
      center: true
    },
    {
      name: "Area Name",
      selector: row => row.areaName,
      sortable: true,
      center: true
    },
    {
        name: "Status",
        selector: (row) => {
          // Conditional styling based on the "Status" value
          let color = '';
          switch (row.status) {
            case 'Flawless':
              color = 'text-green-500';
              break;
            case 'Critical':
              color = 'text-red-500';
              break;
            case 'Faulty':
              color = 'text-yellow-500';
              break;
            default:
              color = '';
          }
          return <span className={color}>{row.status}</span>;
        },
        sortable: true
      },
  ];


  const motors_data =
  [{id: 1,
      motorName: 'ss1',
      floorNumber: 2,
      factoryName: 'Agri',
      areaName: 'maymar',
      status: 'Faulty'
    },
    {
      id: 2,
      motorName: 'ss2',
      floorNumber: 4,
      factoryName: 'WavTech',
      areaName: 'Ahsan a bad',
      status: 'Flawless'
    },
    {
      id: 3,
      motorName: 'ss3',
      floorNumber: 2,
      factoryName: 'Auto',
      areaName: 'Gulistan e Jauhar',
      status: 'Critical'
    },
    {
      id: 4,
      motorName: 'ss1',
      floorNumber: 2,
      factoryName: 'Agri',
      areaName: 'Gulshan',
      status: 'Faulty'
    },
    {
      id: 5,
      motorName: 'ss2',
      floorNumber: 4,
      factoryName: 'Wavtech',
      areaName: 'Gulshan',
      status: 'Flawless'
    },
    {
      id: 6,
      motorName: 'ss3',
      floorNumber: 2,
      factoryName: 'Hi-Warble',
      areaName: 'Sddar',
      status: 'Critical'
    },
    {
      id: 7,
      motorName: 'ss1',
      floorNumber: 2,
      factoryName: 'Industry',
      areaName: 'CandyLand',
      status: 'saddar'
    },
    {
      id: 8,
      motorName: 'ss2',
      floorNumber: 4,
      factoryName: 'Nestle',
      areaName: 'Saddar',
      status: 'Flawless'
    },
    {
      id: 9,
      motorName: 'ss3',
      floorNumber: 2,
      factoryName: 'Kings',
      areaName: 'Saddar',
      status: 'Critical'
    },
    {
      id: 10,
      motorName: 'ss1',
      floorNumber: 2,
      factoryName: 'Factory',
      areaName: 'Maymar',
      status: 'Faulty'
    },
    {
      id: 11,
      motorName: 'ss2',
      floorNumber: 4,
      factoryName: 'Loreal',
      areaName: 'Gulshan',
      status: 'Flawless'
    },
    {
      id: 12,
      motorName: 'ss3',
      floorNumber: 2,
      factoryName: 'Loreal',
      areaName: 'Maymar',
      status: 'Critical'
    },
    {
      id: 13,
      motorName: 'ss1',
      floorNumber: 2,
      factoryName: 'factory2',
      areaName: 'Maymar',
      status: 'Faulty'
    },
    {
      id: 14,
      motorName: 'ss2',
      floorNumber: 4,
      factoryName: 'Bisconni',
      areaName: 'Gulshan',
      status: 'Flawless'
    },
    {
      id: 15,
      motorName: 'ss3',
      floorNumber: 2,
      factoryName: 'Bisconni',
      areaName: 'Gulistan e jauhar',
      status: 'Critical'
    },
    {
      id: 16,
      motorName: 'ss1',
      floorNumber: 2,
      factoryName: 'Industry',
      areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 17,
      motorName: 'ss2',
      floorNumber: 4,
      factoryName: 'Industry',
      areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 18,
      motorName: 'ss3',
      floorNumber: 2,
      factoryName: 'Industry',
      areaName: 'Industrial area',
      status: 'Critical'
    }
  ];


  return (
    <div
    className="fixed inset-0 bg-opacity-50 bg-gray-800 z-50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out transform translate-y-0 -translate-y-ful"
  >
      {/* <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            onClick={onClick}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button> */}
<div className='mt-5 mx-auto bg-white rounded-xl w-[70%] flex flex-col justify-center items-center pt-10 h-[70%] relative'>
{/* <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            onClick={onClick}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>  */}

<button className='mb-4 absolute top-2 right-2 hover:bg-gray-200 rounded-full p-2' onClick={onClick}><RxCross2 /></button>


        <ModalTable tableSubheading={TableHeading} column_headings={columns} data={motors_data} />

      </div>





  </div>
  )
}

export default CalendarClickModal
