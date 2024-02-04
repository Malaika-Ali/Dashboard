import React, { useEffect } from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Link, useNavigate } from 'react-router-dom';

import factory from '../assets/factory.svg'
import motors from '../assets/motors.svg'
import location from '../assets/location.svg'
import { Table } from '../components';

const FloorInchargeHomePage = (props) => {

  const navigate = useNavigate();
  useEffect(() => {
    if(!props.user_details){
      console.log("here", props.user_details)
      sessionStorage.clear();
      navigate("/")
    }
  }, [navigate, props.user_details]);

  // table columns headings
  const columns = [
    {
      name: 'Motor Name',
      selector: row => row.motorName,
      sortable: true
    },
    // {
    //   name: "Factory Name",
    //   selector: row => row.factoryName,
    //   sortable: true
    // },
    // {
    //   name: "Area Name",
    //   selector: row => row.areaName,
    //   sortable: true
    // },
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
    {
      name: "View",
      cell: row => <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded' onClick={() => alert(row.id)}>View</button>
    }
  ];

  const data = [
    {
      id: 1,
      motorName: 'ss1',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 2,
      motorName: 'ss2',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 3,
      motorName: 'ss3',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Critical'
    },
    {
      id: 4,
      motorName: 'ss1',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 5,
      motorName: 'ss2',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 6,
      motorName: 'ss3',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Critical'
    },
    {
      id: 7,
      motorName: 'ss1',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 8,
      motorName: 'ss2',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 9,
      motorName: 'ss3',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Critical'
    },
    {
      id: 10,
      motorName: 'ss1',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 11,
      motorName: 'ss2',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 12,
      motorName: 'ss3',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Critical'
    },
    {
      id: 13,
      motorName: 'ss1',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 14,
      motorName: 'ss2',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 15,
      motorName: 'ss3',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Critical'
    },
    {
      id: 16,
      motorName: 'ss1',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Faulty'
    },
    {
      id: 17,
      motorName: 'ss2',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Flawless'
    },
    {
      id: 18,
      motorName: 'ss3',
    //   factoryName: 'Industry',
    //   areaName: 'Industrial area',
      status: 'Critical'
    }
  ];

  return (
    <>
      {/* Flex Container */}
      <div className='flex justify-between mt-4 bg-slate-200 rounded-xl w-90 m-3'>

        {/* left box */}
        <TotalNumberCard iconSrc={location} placeName='Areas' quantity='32' />


        {/* middle box */}
        <TotalNumberCard iconSrc={factory} placeName='Factories' quantity='30' />


        {/* Right box */}
        <TotalNumberCard iconSrc={motors} placeName='Motors' quantity='50' />
      </div>

      {/* Table section */}
      <div className='mt-5 mx-auto bg-slate-200 rounded-xl w-[96%]'>
        <Table tableSubheading={'Overall Floor Report'} column_headings={columns} data={data} />
      </div>

    </>
  )
}

export default FloorInchargeHomePage
