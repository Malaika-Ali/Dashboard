import React from 'react';
import { IoHome } from "react-icons/io5";
import { MdFactory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiStairs } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

export const links = [
    {
      // title: 'Dashboard',
      links: [
        {
          name: 'AdminHomePage',
          icon: <IoHome />,
        },
        {
          name: 'AreasPage',
          icon: <FaLocationDot />,
        },
        {
          name: 'FactoriesPage',
          icon: <MdFactory />,
        },
        {
          name: 'FloorsPage',
          icon: <GiStairs />,
        },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
        },
        {
          name: 'EmployeeDetails',
          icon: <FaPeopleGroup />,
        },
      ],
    }   
  ];

  export const factoryInchargelinks = [
    {
      // title: 'Dashboard',
      links: [
        {
          name: 'FactoryInchargeHome',
          icon: <IoHome />,
        },
        // {
        //   name: 'FactoriesPage',
        //   icon: <MdFactory />,
        // },
        {
          name: 'FloorsPage',
          icon: <GiStairs />,
        },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
        },
      ],
    }  
  ];

  export const floorInchargelinks = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'FloorInchargeHomePage',
          icon: <IoHome />,
        },
        // {
        //   name: 'FloorsPage',
        //   icon: <GiStairs />,
        // },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
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
  