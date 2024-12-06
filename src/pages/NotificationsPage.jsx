import React, { useState } from 'react'
import NotificationPageCard from '../components/notifications/NotificationPageCard';
import ViewMotorModal from '../components/modals/ViewMotorModal';

import criticalalert from '../assets/criticalalert.png';
import faultyalert from '../assets/faultyalert.png';
import { FcClock } from "react-icons/fc";


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
                <h3 className='text-2xl'>Notifications</h3>
                <span className='rounded-xl text-white px-2 py-1 light-blue'>3 New</span>
            </div>

            <div className="flex flex-col rounded-xl">

            <div className='flex flex-row items-start hover:bg-gray-100 px-8 py-4 cursor-pointer transition duration-300'>
            <div className="flex flex-shrink-0 mr-3 px-1 py-2">
                <img src={criticalalert} alt={`Critical alert`} className="w-8 h-8" />
            </div>

            <div className="flex flex-col py-1 px-4">
            <span className='text-lg'>Critical</span>

            <div className='flex flex-row justify-between  items-center'>
            <span className='text-sm text-gray-500 py-1'>Motor MS-1 in South City Samsung at floor 7 urgently needs your attention.</span>
            <div className='absolute right-20 rounded-full bg-secondary-color w-2 h-2 py-1'>
            </div>
            </div>

            <div className="flex flex-row items-center text-sm text-gray-400 py-1 gap-1">
                <span><FcClock /></span>
                <span>{`July 29`}</span>
                <span>4:00 PM</span>
            </div>

            </div>
        </div>





        <div className='flex flex-row items-start hover:bg-gray-100 px-8 py-4 cursor-pointer transition duration-300'>
            <div className="flex flex-shrink-0 mr-3 px-1 py-2">
                <img src={criticalalert} alt={`Critical alert`} className="w-8 h-8" />
            </div>

            <div className="flex flex-col py-1 px-4">
            <span className='text-lg'>Critical</span>

            <div className='flex flex-row justify-between  items-center'>
            <span className='text-sm text-gray-500 py-1'>Motor MM-1 in Malir area factory Innovative at floor 2 might need you.</span>
            <div className='absolute right-20 rounded-full bg-secondary-color w-2 h-2 py-1'>
            </div>
            </div>

            <div className="flex flex-row items-center text-sm text-gray-400 py-1 gap-1">
                <span><FcClock /></span>
                <span>{`July 29`}</span>
                <span>4:00 PM</span>
            </div>

            </div>
        </div>



        <div className='flex flex-row items-start hover:bg-gray-100 px-8 py-4 cursor-pointer transition duration-300'>
            <div className="flex flex-shrink-0 mr-3 px-1 py-2">
                <img src={faultyalert} alt={`Faulty alert`} className="w-8 h-8" />
            </div>

            <div className="flex flex-col py-1 px-4">
            <span className='text-lg'>Faulty</span>

            <div className='flex flex-row justify-between  items-center'>
            <span className='text-sm text-gray-500 py-1'>Motor MK-1 in Korangi area WavTech at floor 2 urgently needs your attention.</span>
            <div className='absolute right-20 rounded-full bg-secondary-color w-2 h-2 py-1'>
            </div>
            </div>

            <div className="flex flex-row items-center text-sm text-gray-400 py-1 gap-1">
                <span><FcClock /></span>
                <span>{`July 30`}</span>
                <span>8:00 PM</span>
            </div>

            </div>
        </div>



      
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
