import React from 'react';
import { IoHome } from "react-icons/io5";
import { MdFactory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiStairs } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineManageHistory } from "react-icons/md";

export const links = [
    
      // title: 'Dashboard',
      // links: [
        {
          name: 'AdminHomePage',
          icon: <IoHome />,
          category: 'home'
        },
        {
          name: 'Areas',
          icon: <FaLocationDot />,
          category: 'menu'
        },
        {
          name: 'Factories',
          icon: <MdFactory />,
          category: 'menu'
        },
        // {
        //   name: 'FloorsPage',
        //   icon: <GiStairs />,
        // },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
          category: 'menu'
        },
        {
          name: 'Employees',
          icon: <FaPeopleGroup />,
          category: 'menu'
        },
        {
          name: 'History',
          icon: <MdOutlineManageHistory />,
          category: 'menu'
        },
  ];

  export const factoryInchargelinks = [
    
      // title: 'Dashboard',
      // links: [
        {
          name: 'FactoryInchargeHome',
          icon: <IoHome />,
          category: 'home'
        },
        // {
        //   name: 'FactoriesPage',
        //   icon: <MdFactory />,
        // },
        {
          name: 'Floors',
          icon: <GiStairs />,
          category: 'menu'
        },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
          category: 'menu'
        },
        {
          name: 'History',
          icon: <MdOutlineManageHistory />,
          category: 'menu'
        },
      // ],
     
  ];

  export const floorInchargelinks = [
    
        {
          name: 'FloorInchargeHomePage',
          icon: <IoHome />,
          category: 'home'
        },
        // {
        //   name: 'FloorsPage',
        //   icon: <GiStairs />,
        // },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
          category: 'menu'
        },
        {
          name: 'History',
          icon: <MdOutlineManageHistory />,
          category: 'menu'
        },
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
  