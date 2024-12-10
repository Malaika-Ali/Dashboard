import React from 'react'
import { NavLink } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import MotorLogo2 from '../assets/MotorLogo3.png'

import { links, factoryInchargelinks, floorInchargelinks } from '../constants/constants';
import { useStateContext } from '../contexts/ContextProvider'

const Sidebar = (props) => {

    const { activeMenu, setactiveMenu } = useStateContext();

    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const role = token ? token.role : null; 
    const name = token ? `${token.first_name} ${token.last_name}` : 'Guest';


    let roleLinks = [];
    if (role === 'admin') {
        roleLinks = links;
    } else if (role === 'factoryIncharge') {
        roleLinks = factoryInchargelinks;
    } else if (role === 'floorIncharge') {
        roleLinks = floorInchargelinks;
    }

    const activeLink = "flex flex-row items-center px-2 pl-3 py-2 bg-gray-700 rounded-full cursor-pointer text-white text-sm font-medium transition-all duration-300";

    const normalLink = "flex flex-row items-center px-2 pl-3 py-2 hover:bg-gray-700 rounded-full cursor-pointer text-gray-400 text-sm font-medium hover:text-white transition-all duration-300";

    const handleCloseSideBar = () => {
        setactiveMenu(!activeMenu)
    }

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || string.length === 0) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatRole = (role) => {
        const roleMapping = {
            admin: 'Administrator',
            factoryIncharge: 'Factory Incharge',
            floorIncharge: 'Floor Incharge'
        };
        return roleMapping[role] || capitalizeFirstLetter(role);
    };

    return (
        <div
            className="bg-main-color text-white flex flex-col h-full min-h-screen overflow-y-auto
        inset-0 z-10 backdrop-blur-sm fixed top-0 left-0 border-opacity-[.7]"
        >
            <div className="flex items-center justify-end rounded-full p-3 hover:bg-light-gray h-auto w-auto">
                <button
                    type="button"
                    onClick={handleCloseSideBar}
                    className="text-xl mt-4 block lg:hidden"
                >
                    <RxCross2 />
                </button>
            </div>
            <div className="flex flex-col items-center p-4">
                <img
                    src={MotorLogo2}
                    alt="Profile"
                    className="rounded-full w-14 h-14"
                />
                <h3 className="mt-5 text-base font-medium text-secondary-color">{capitalizeFirstLetter(name)}</h3>
                <p className="text-sm text-gray-300">{formatRole(role)}</p>
            </div>
            <div className="mt-3">
                <ul className='px-2 pt-8 flex flex-col gap-1'>
                    {roleLinks.map((link, id) => (

                        <li
                        >
                            <NavLink
                                to={`/${link.path}`}
                                key={id}
                                className={({ isActive }) =>
                                    isActive ? activeLink : normalLink}
                            >

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




