import React, { useState, forwardRef } from 'react';
import { IoNotifications } from "react-icons/io5";
import NotificationCard from './NotificationCard';
import { useNavigate } from 'react-router-dom';


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
    <div className="absolute right-24 top-12 bg-white w-96 rounded-xl shadow-lg max-w-md navbar-bg" ref={ref}>
      <div className="bg-blue-600 p-4 px-6 py-6 rounded-t-xl flex items-center justify-between w-full">
            <h3 className="text-white">Notifications</h3>
            <IoNotifications className="text-white" />
          </div>

          <ul className='overflow-y-auto h-96'>
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
