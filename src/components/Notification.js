import React from 'react'



export default function Notification({ notification , bg }) {

  const formattedDate = new Date(notification.timestamp).toLocaleString();

   const notificationStyle = {
    backgroundColor: notification.bg,
  };

  return (
    // <div className='z-50 absolute right-5 top-12 w-52 bg-white shadow-lg'>
    <>
       <div className="flex items-center shadow-md p-4" style={notificationStyle}>
      <div>
        <p className="font-semibold">{notification.category}</p>
        <p className="text-gray-600">{notification.message}</p>
        <p className="text-gray-400 text-xs">{formattedDate}</p>
      </div>
    </div>
      
      
    </>
  )
}
