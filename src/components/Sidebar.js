// import React, { useEffect } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { SiShopware } from 'react-icons/si'
// import { MdOutlineCancel } from 'react-icons/md'
// import logo from '../assets/logo.png'

// import { links, factoryInchargelinks, floorInchargelinks } from '../data/DummyData';
// import { useStateContext } from '../contexts/ContextProvider'

// function getToken() {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken
// }
// export default function Sidebar(props) {

//     const { activeMenu, setactiveMenu, screenSize } = useStateContext();

//     const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-gray-200  text-md m-2';

//     const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-black hover:text-gray-200 main-hover hover:rounded-full m-2';


//     const handleCloseSideBar = () => {
//         if (activeMenu && screenSize <= 900) {
//             setactiveMenu(false);
//         }
//     }

//     // const role=props.user_details.role;
//     const role = getToken().role;
//     // const role='floorIncharge'

//     let roleLinks = [];
//     if (role === 'admin') {
//         roleLinks = links;
//     } else if (role === 'factoryIncharge') {
//         roleLinks = factoryInchargelinks;
//     } else if (role === 'floorIncharge') {
//         roleLinks = floorInchargelinks;
//     }

//     useEffect(() => {
//         // Set activeMenu to true when the component loads or when the user logs in
//         setactiveMenu(true);
//     }, []);

//     return (
//         <div className={`flex flex-col md:z-50 h-screen overflow-y-auto md:overflow-x-hidden pb-10 ${activeMenu ? 'lg:block' : 'hidden'} main-color  transition-transform duration-300`}>
//             {activeMenu && (<>
//                 <div className='flex justify-between items-center '>
//                     <Link to="/" onClick={handleCloseSideBar} className='items-center gap-3 mt-5 flex text-xl justify-center mx-auto '>
//                         <img src={logo} alt="logo" className='h-8' />
//                         </Link>


//                         <button
//                             type="button"
//                             onClick={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)}
//                             className="text-xl text-black rounded-full p-3 hover:bg-light-gray mt-4 block"
//                         >
//                             {/* <MdOutlineCancel /> */}
//                         </button>

//                 </div>

//                 <div className='mt-12 large:mt-20 '>
//                     {roleLinks.map((item) => (
//                         <div key={item.title}>
//                             {/* <p className='text-gray-400 m-3 mt-4 uppercase'>
//                                 {item.title}
//                             </p> */}
//                             {item.links.map((link) => (
//                                 <NavLink
//                                     to={`/${link.name}`}
//                                     key={link.name}
//                                     onClick={handleCloseSideBar}
//                                     className={({ isActive }) =>
//                                         isActive ? activeLink : normalLink}>

//                                     {/* Conditionally render "Home" for category 'home' */}
//                                     {link.category === 'home' ?   <>
//                                             {link.icon}
//                                             <span className='capitalize'>
//                                                 Home
//                                             </span>
//                                         </> : (
//                                         <>
//                                             {link.icon}
//                                             <span className='capitalize'>
//                                                 {link.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
//                                             </span>
//                                         </>
//                                     )}
//                                 </NavLink>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </>)}


//         </div>
//     )
// }





import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'
import logo from '../assets/logo.png'

import { links, factoryInchargelinks, floorInchargelinks } from '../data/DummyData';
import { useStateContext } from '../contexts/ContextProvider'
import { CgRowFirst } from 'react-icons/cg';

function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}

const Sidebar = (props) => {

    const { activeMenu, setactiveMenu, screenSize } = useStateContext();

    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 900) {
            setactiveMenu(false);
        }
    }


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

    console.log(roleLinks)
    useEffect(() => {
        // Set activeMenu to true when the component loads or when the user logs in
        setactiveMenu(true);
    }, []);

    const activeLink = "flex flex-row items-center px-2 pl-3 py-2 bg-gray-700 rounded-full cursor-pointer text-gray-400 text-sm font-medium transition-all duration-300";

    const normalLink = "flex flex-row items-center px-2 pl-3 py-2 hover:bg-gray-700 rounded-full cursor-pointer text-gray-400 text-sm font-medium transition-all duration-300";

    return (
        <div className="bg-main-color text-white h-screen flex flex-col">
            <div className="flex items-center justify-between p-4">

            </div>
            <div className="flex flex-col items-center p-4">
                {/* <img
                    src="profile.jpg"
                    alt="Profile"
                    className="rounded-full w-20 h-20"
                /> */}
                <span className='text-seconday-color'>Logo</span>
                <h3 className="mt-4 text-md font-medium">Malaika</h3>
                <p className="text-sm text-gray-400">{role}</p>
            </div>
            <div className="mt-8">
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




