import React from 'react'
import Notification from './Notification'
function NotificationStack() {

    const notifications = [
        {
          id: 1,
          category: 'Critical Alert',
          message: 'Motor XYZ Failure Detected!',
          timestamp: 1645286400000,
          bg: "#FDF0F0"
        },
        {
          id: 2,
          category: 'Emergency',
          message: 'Motor XYZ Experiencing Critical Failure ',
          timestamp: 1645286403001,
          bg: "#FDF0F0"
        },
        {
          id: 3,
          category: 'Great News',
          message: 'Optimal Conditions Maintained in Motor ABC ',
          timestamp: 1645286403001,
          bg: "#F0FDF0"
        },
        {
          id: 4,
          category: 'Attention Needed',
          message: 'Fault Detected in ABC Motor Operation',
          timestamp: 1625282403001,
          bg: "#FFFFE0"
        },
        
      ];

  return (
    <div className='z-50 absolute right-5 top-12 w-80 bg-white shadow-lg rounded-md'>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationStack
