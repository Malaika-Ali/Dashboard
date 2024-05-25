import React, { useState } from 'react'
import NotificationPageCard from '../components/notifications/NotificationPageCard';
import ViewMotorModal from '../components/modals/ViewMotorModal';


const NotificationsPage = () => {

    const [showMotorModal, setShowMotorModal] = useState(false)

    const notifications = [
        {
            id: 0,
            type: "Faulty",
            message: "Motor 40 in FB area factory 9 at floor 2 might need you.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 1,
            type: "Critical",
            message: "Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 2,
            type: "Faulty",
            message: "Motor 40 in FB area factory 9 at floor 2 might need you.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 3,
            type: "Critical",
            message: "Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 4,
            type: "Faulty",
            message: "Motor 40 in FB area factory 9 at floor 2 might need you.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 5,
            type: "Critical",
            message: "Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 6,
            type: "Faulty",
            message: "Motor 40 in FB area factory 9 at floor 2 might need you.",
            time: "6:20 PM",
            date: "May 24"
        },
        {
            id: 7,
            type: "Critical",
            message: "Motor 4 in Jauhar area factory 4 at floor 7 urgently needs your attention.",
            time: "6:20 PM",
            date: "May 24"
        }
    ];

    return (
        <div className='rounded-xl box-shadow-xl flex flex-col bg-white md:mt-8 md:mx-2 lg:mx-10 lg:mt-[5.25rem] large:mx-16 large:mt-[4rem]'>
            <div className="flex flex-row justify-between items-center w-full py-6 px-10">
                <h3 className='text-lg'>Notifications</h3>
                <span className='rounded-xl text-white px-2 py-1 light-blue'>3 New</span>
            </div>

            <div className="flex flex-col rounded-xl">
                {
                    notifications.map((notification) => (
                        <NotificationPageCard type={notification.type}
                            message={notification.message}
                            date={notification.date}
                            time={notification.time}
                            onClick={() => setShowMotorModal(true)} />
                    ))
                }
                {
                    showMotorModal &&
                    <ViewMotorModal onClick={() => setShowMotorModal(false)}
                        motorName='ABC' motorStatus='Flawless' floorNumber='2' factoryName='Agri' areaName='Maymar' />

                }

            </div>
        </div>
    )
}

export default NotificationsPage
