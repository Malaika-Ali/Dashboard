import React from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { GrLocation } from 'react-icons/gr';
import {factory} from '../assets/factory.svg'



// import {LocationSvg} from './assets';



export const links = [
    // {
    //   title: 'Dashboard',
    //   links: [
    //     {
    //       name: 'ecommerce',
    //       icon: <FiShoppingBag />,
    //     },
    //   ],
    // },
  
    {
      title: 'Dashboard',
      links: [
        {
          name: 'AdminHomePage',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'AreasPage',
          icon: <GrLocation />,
        },
        {
          name: 'FactoriesPage',
          icon: <IoMdContacts/>,
        },
        {
          name: 'Motors',
          icon: <RiContactsLine />,
        },
        {
          name: 'EmployeeDetails',
          icon: <RiContactsLine />,
        },
      ],
    }
    
  ];
  

  export const dummy_api=[
    {
      "motorname": "Motor1",
      "status": "faulty",
      "details": "High temperature, abnormal noise"
    },
    {
      "motorname": "Motor2",
      "status": "nonfaulty",
      "details": "Normal operating conditions"
    },
    {
      "motorname": "Motor3",
      "status": "mediumcondition",
      "details": "Slight vibration detected"
    },
    {
      "motorname": "Motor4",
      "status": "faulty",
      "details": "Low oil level, overheating"
    },
    {
      "motorname": "Motor5",
      "status": "nonfaulty",
      "details": "Stable performance"
    }
  ]
  