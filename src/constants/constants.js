import React from 'react';
import { IoHome } from "react-icons/io5";
import { MdFactory } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiStairs } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineManageHistory } from "react-icons/md";

export const links = [
        {
          name: 'AdminHomePage',
          icon: <IoHome />,
          category: 'home',
          path: ''
        },
        {
          name: 'Areas',
          icon: <FaLocationDot />,
          category: 'menu',
          path: 'areas'
        },
        {
          name: 'Factories',
          icon: <MdFactory />,
          category: 'menu',
          path: 'factories'
        },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
          category: 'menu',
          path: "motors"
        },
        {
          name: 'Employees',
          icon: <FaPeopleGroup />,
          category: 'menu',
          path: 'employees'
        },
        {
          name: 'History',
          icon: <MdOutlineManageHistory />,
          category: 'menu',
          path: 'history'
        },
  ];

  export const factoryInchargelinks = [
    
      // title: 'Dashboard',
      // links: [
        {
          name: 'FactoryInchargeHome',
          icon: <IoHome />,
          category: 'home',
          path: ''
        },
        // {
        //   name: 'FactoriesPage',
        //   icon: <MdFactory />,
        // },
        {
          name: 'Floors',
          icon: <GiStairs />,
          category: 'menu',
          path: 'floors'
        },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
          category: 'menu',
          path: 'motors'
        },
        {
          name: 'History',
          icon: <MdOutlineManageHistory />,
          category: 'menu',
          path: 'history'
        },
      // ],
     
  ];

  export const floorInchargelinks = [
    
        {
          name: 'FloorInchargeHomePage',
          icon: <IoHome />,
          category: 'home',
          path: ''
        },
        {
          name: 'Motors',
          icon: <IoMdSettings />,
          category: 'menu',
          path: 'motors'
        },
        {
          name: 'History',
          icon: <MdOutlineManageHistory />,
          category: 'menu',
          path: 'history'
        },
  ];

  