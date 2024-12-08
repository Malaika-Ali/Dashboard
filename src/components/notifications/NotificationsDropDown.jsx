import React, { useState, forwardRef } from 'react';
import { IoNotifications } from "react-icons/io5";
import NotificationCard from './NotificationCard';
import { useNavigate } from 'react-router-dom';

import criticalalert from '../../assets/criticalalert.png';
import faultyalert from '../../assets/faultyalert.png';


const NotificationsDropDown = forwardRef((props, ref) => {

  const notifications=[
    {
      id: 0,
      type: "Faulty",
      message:"Motor 40 in FB area factory 9 at floor 2 might need you.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 1,
      type: "Critical",
      message:"Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 2,
      type: "Faulty",
      message:"Motor 40 in FB area factory 9 at floor 2 might need you.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 3,
      type: "Critical",
      message:"Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 4,
      type: "Faulty",
      message:"Motor 40 in FB area factory 9 at floor 2 might need you.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 5,
      type: "Critical",
      message:"Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 6,
      type: "Faulty",
      message:"Motor 40 in FB area factory 9 at floor 2 might need you.",
      time: "6:20 PM",
      date: "May 24"
    },
    {
      id: 7,
      type: "Critical",
      message:"Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
      time: "6:20 PM",
      date: "May 24"
    }
  ];

  const navigate=useNavigate();

  return (
    <div className="absolute right-24 top-12 bg-white w-96 rounded-xl shadow-lg max-w-md navbar-bg z-10" ref={ref}>
      <div className="bg-blue-600 p-4 px-6 py-6 rounded-t-xl flex items-center justify-between w-full">
            <h3 className="text-white font-semibold">Notifications</h3>
            <IoNotifications className="text-white text-xl" />
          </div>

          <ul className='overflow-y-auto h-96'>
          <div className="flex flex-row justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer border-b border-gray-200"
    >
                <div className="flex-shrink-0 mr-3 px-1">
                <img src={criticalalert} className="w-8 h-8" />
                </div>
                <div className='flex flex-col'>
                  <h4 className="text-sm font-medium py-1">Critical</h4>
                  <p className="text-xs text-gray-500 py-1">Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.</p>
                  <div className='flex flex-row justify-between items-center py-2'>
                  <p className="text-xs text-gray-400">29 July</p>
                  <p className="text-xs text-gray-400">4:00 PM</p>
                  </div>
                </div>
                <div className=' flex justify-ceter items-center secondary-color w-1  h-2 -mt-6 rounded-full p-1 ml-2'></div>
              </div>



              <div className="flex flex-row justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer border-b border-gray-200"
    >
                <div className="flex-shrink-0 mr-3 px-1">
                <img src={criticalalert} className="w-8 h-8" />
                </div>
                <div className='flex flex-col'>
                  <h4 className="text-sm font-medium py-1">Critical</h4>
                  <p className="text-xs text-gray-500 py-1">Motor MS-2 in South City Samsung at floor 2 urgently needs your attention.</p>
                  <div className='flex flex-row justify-between items-center py-2'>
                  <p className="text-xs text-gray-400">29 July</p>
                  <p className="text-xs text-gray-400">4:00 PM</p>
                  </div>
                </div>
                <div className=' flex justify-ceter items-center secondary-color w-1  h-2 -mt-6 rounded-full p-1 ml-2'></div>
              </div>



              <div className="flex flex-row justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer border-b border-gray-200"
    >
                <div className="flex-shrink-0 mr-3 px-1">
                <img src={faultyalert} className="w-8 h-8" />
                </div>
                <div className='flex flex-col'>
                  <h4 className="text-sm font-medium py-1">Faulty</h4>
                  <p className="text-xs text-gray-500 py-1">Motor MM-1 in Malir Innovative at floor 2 might need you.</p>
                  <div className='flex flex-row justify-between items-center py-2'>
                  <p className="text-xs text-gray-400">29 July</p>
                  <p className="text-xs text-gray-400">4:00 PM</p>
                  </div>
                </div>
                <div className=' flex justify-ceter items-center secondary-color w-1  h-2 -mt-6 rounded-full p-1 ml-2'></div>
              </div>









           { notifications.map((notification)=>(
              <NotificationCard 
              key={notification.id} 
              type ={notification.type} 
              message={notification.message} 
              date={notification.date} 
              time={notification.time}
              onClick={()=>navigate('/notificationsPage')}/>
            ))}
           
          </ul>
     </div>
  );
});

export default NotificationsDropDown;







