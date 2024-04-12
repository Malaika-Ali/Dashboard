import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import logo from '../assets/logo.png'

import { links, factoryInchargelinks, floorInchargelinks } from '../data/DummyData';
import { useStateContext } from '../contexts/ContextProvider'

function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}
export default function Sidebar(props) {

    const { activeMenu, setactiveMenu, screenSize } = useStateContext();

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-gray-200  text-md m-2';

    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black hover:text-gray-200 dark:hover:text-gray-200 main-hover hover:rounded-full m-2';


    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 900) {
            setactiveMenu(false);
        }
    }

    // const role=props.user_details.role;
    const role = getToken().role;
    // const role='floorIncharge'

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

    return (
        <div className={`md:z-50 md:shadow-md ml-1 h-screen overflow-y-auto md:overflow-x-hidden md:hover:overflow-y-auto pb-10 ${activeMenu ? 'lg:block' : 'hidden'}`}>
            {activeMenu && (<>
                <div className='flex justify-between items-center '>
                    <Link to="/" onClick={handleCloseSideBar} className='items-center gap-3 mt-5 flex text-xl font-extrabold tracking-tight   text-slate-900 justify-center mx-auto '><img src={logo} alt="logo" className='h-8' /></Link>

                    {/* <TooltipComponent content="Menu" position='BottomCenter'>
                        <button type='button' className='text-xl hidden rounded-full p-3 hover:bg-light-gray mt-4 block '>
                            <MdOutlineCancel/>
                        </button>
                    </TooltipComponent> */}

                    {/* <Link to="/" className="  items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                        <SiShopware /> <span>Dash</span>
                    </Link> */}
                    <TooltipComponent content="Menu" position="BottomCenter">
                        <button
                            type="button"
                            onClick={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)}
                            className="text-xl text-black rounded-full p-3 hover:bg-light-gray mt-4 block"
                        >
                            {/* <MdOutlineCancel /> */}
                        </button>
                    </TooltipComponent>

                </div>

                <div className='mt-10 '>
                    {roleLinks.map((item) => (
                        <div key={item.title}>
                            {/* <p className='text-gray-400 m-3 mt-4 uppercase'>
                                {item.title}
                            </p> */}
                            {item.links.map((link) => (
                                <NavLink
                                    to={`/${link.name}`}
                                    key={link.name}
                                    onClick={handleCloseSideBar}
                                    className={({ isActive }) =>
                                        isActive ? activeLink : normalLink}>

                                    {/* {link.icon}
                                    <span className='capitalize'>
            {link.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
        </span> */}
                                    {/* Conditionally render "Home" for category 'home' */}
                                    {link.category === 'home' ?   <>
                                            {link.icon}
                                            <span className='capitalize'>
                                                Home
                                            </span>
                                        </> : (
                                        <>
                                            {link.icon}
                                            <span className='capitalize'>
                                                {link.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </div>
            </>)}


        </div>
    )
}





