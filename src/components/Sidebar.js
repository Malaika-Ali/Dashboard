import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import logo from '../assets/logo.png'
import MotorLogo from '../assets/MotorLogo.png'
import MotorLogo2 from '../assets/MotorLogo3.png'

import { links, factoryInchargelinks, floorInchargelinks } from '../data/DummyData';
import { useStateContext } from '../contexts/ContextProvider'

function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}

const Sidebar = (props) => {

    const { activeMenu, setactiveMenu, screenSize } = useStateContext();

    
    // const role = props.user_details.role;
    const role = getToken().role;
    // const role = 'floorIncharge'

    let roleLinks = [];
    if (role === 'admin') {
        roleLinks = links;
    } else if (role === 'factoryIncharge') {
        roleLinks = factoryInchargelinks;
    } else if (role === 'floorIncharge') {
        roleLinks = floorInchargelinks;
    }


    useEffect(() => {
        // Set activeMenu to true when the component loads or when the user logs in
        setactiveMenu(true);
    }, []);

    const activeLink = "flex flex-row items-center px-2 pl-3 py-2 bg-gray-700 rounded-full cursor-pointer text-gray-400 text-sm font-medium transition-all duration-300";

    const normalLink = "flex flex-row items-center px-2 pl-3 py-2 hover:bg-gray-700 rounded-full cursor-pointer text-gray-400 text-sm font-medium transition-all duration-300";

    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 1024) {
            setactiveMenu(false);
        }
    }


    if (screenSize <= 1024 && !activeMenu) {
        return null;
    }

    return (
        <div className="bg-main-color text-white h-screen flex flex-col">
            <div className="flex items-center justify-end p-4">
            <button
                    type="button"
                    onClick={handleCloseSideBar}
                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                    <MdOutlineCancel />
                </button>
            </div>
            <div className="flex flex-col items-center p-4">
                <img
                    src={MotorLogo2}
                    alt="Profile"
                    className="rounded-full w-14 h-14"
                />
                <span className='text-white mt-2 font-semibold plus-jakarta-sans text-xl'>MotorVision</span>
                <h3 className="mt-14 text-sm font-medium text-seconday-color">Malaika Ali</h3>
                <p className="text-sm text-gray-400">Administrator</p>
            </div>
            <div className="mt-3">
                {/* <h4 className="px-4 mb-2 text-xs text-seconday-color font-semibold uppercase">Dashboards</h4> */}
                <ul className='px-2 pt-8'>
                    {roleLinks.map((link) => (

                        <li
                        >
                            <NavLink
                                to={`/${link.name}`}
                                key={link.name}
                                onClick={handleCloseSideBar}
                                className={({ isActive }) =>
                                    isActive ? activeLink : normalLink}
                            >
                                {/* {link.icon}
                            {link.name} */}
                                {/* </li> */}

                                {/* Conditionally render "Home" for category 'home' */}
                                {
                                    link.category === 'home' ? <div className='flex flex-row justify-between items-center gap-4'>
                                        {link.icon}
                                        <span className='capitalize'>
                                            Home
                                        </span>
                                    </div> : (
                                        <div className='flex flex-row justify-between items-center gap-4'>
                                            {link.icon}
                                            <span className='capitalize'>
                                                {link.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                            </span>
                                        </div>
                                    )
                                }

                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;




