import React, { useEffect, useRef, useState, useContext, forwardRef } from 'react'

import { useStateContext } from '../contexts/ContextProvider'
import { FaSearch } from 'react-icons/fa';

import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import Loader from "../shared/Loader";
import { StateContext } from '../contexts/ContextProvider';
import NotificationsDropDown from './notifications/NotificationsDropDown';

import { IoNotifications } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";

// Navigation Button Component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

  <button type='button' onClick={customFunc} style={{ color, borderRadius: '50%' }}
    className='relative md:text-lg lg:text-xl rounded-full p-3 navbutton-hover'>
    <span style={{ background: dotColor }} className='absolute inline-flex rounded-full md:h-1 md:w-1 lg:h-2 lg:w-2 right-2 top-2 font-bold' />{icon}
  </button>

)
// function getToken() {
//   const tokenString = localStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken
// }

// const role = getToken().role;
// const name = getToken().name;


export default function Navbar(props) {

  // Calling sidebar's active state to adjust nav's width
  const { activeMenu, setactiveMenu, screenSize, setscreenSize, searchTerm, setSearchTerm } = useStateContext();

  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize)
    handleResize();
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  useEffect(() => {
    if (screenSize <= 900)
      setactiveMenu(false);
    else {
      setactiveMenu(true);
    }
  }, [screenSize])






  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const { loading } = useContext(StateContext);
  const [notificationsClicked, setNotificationsClicked] = useState(false)


  // state variable to handle the profile dropdown menu
  const [open, setopen] = useState(false)

  const [searchinput, setSearchInput] = useState('')

  const dropDownRef = useRef();

  const navigate = useNavigate();

  const [notificationOpen, setnotificationOpen] = useState(false)
  const [first, setfirst] = useState(true)

  //                      Change Nav's Bg Color On Scrolling
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true)
    }
    else {
      setColor(false)
    }
  }

  window.addEventListener("scroll", changeColor)


  // Closing the notifications dropdown when clicked outside
  let notificationsRef = useRef();
  let divRef = useRef();

  useEffect(() => {
    let notificationsHandler = (e) => {
      if (
        (notificationsRef.current &&
          !notificationsRef.current.contains(e.target))
        &&
        (divRef.current && !divRef.current.contains(e.target))

      ) {
        setNotificationsClicked(false);
      }
    };
    document.addEventListener("mousedown", notificationsHandler)


    return () => {
      document.removeEventListener("mousedown", notificationsHandler);
    }

  }, [divRef, notificationsRef])


  // Closing the Profile dropdown when clicked outside
  let ProfileRef = useRef();
  let ProfiledivRef = useRef();

  useEffect(() => {
    let profileHandler = (e) => {
      if (
        (ProfileRef.current &&
          !ProfileRef.current.contains(e.target))
        &&
        (ProfiledivRef.current && !ProfiledivRef.current.contains(e.target))

      ) {
        setopen(false);
      }
    };
    document.addEventListener("mousedown", profileHandler)


    return () => {
      document.removeEventListener("mousedown", profileHandler);
    }

  }, [ProfiledivRef, ProfileRef])


  // Search Functionality
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // const newSearchTerm = e.target.value;
      setSearchTerm(searchinput);
    }
  };


  return (
    //  ${color ? "navbar-bg-onscroll" : "bg-white"}
    <div className={`fixed top-0 flex justify-between md:h-[9vh] lg:h-[10vh] sm:px-3  md:px-6 md:w-full lg:w-[83%] lg:px-8 z-10 gray-icon
     bg-white
     ${!activeMenu ? "w-full" : "w-[83%]"}
       border-b border-gray-200 shadow-sm`}
       >
      {loading && <Loader />}


      {/* ******************Menu Button********************* */}
      <NavButton title='Menu'
        customFunc={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)}
        icon={<SlMenu
          className='large:w-14 large:h-6 large:-ml-[14px]' />} />


      {/* Div to contain all nav elements */}
      <div className="flex mx-auto">
        <div className="relative">


          {/* *****************Search Bar****************** */}
          <div className="relative sm:w-44 md:w-48 lg:w-56 sm:mt-2 md:mt-1 lg:mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white sm:text-sm md:text-base lg:text-sm text-gray-700 border-2 border-gray-200 rounded-full sm:pl-4 md:pl-6 lg:pl-5  sm:p-1 lg:p-2 w-full transition-all duration-300 focus:outline-none main-color-focus"
              value={searchinput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />

            {/* Search Icon */}
            <div className="absolute right-0 top-0 sm:mt-2 lg:mt-3 mr-4 text-gray-500">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>


      {/* ************************Notifications button*********** */}
      <div className='flex flex-row justify-between items-center'
        ref={divRef}>
        <NavButton
          title='Notifications'
          dotColor="#5C61F2"
          customFunc={() => setNotificationsClicked(!notificationsClicked)}
          icon={<IoNotifications />}

        // className='gray-icon'
        />
        {
          notificationsClicked &&
          <NotificationsDropDown ref={notificationsRef} />
        }

        {/* ***********************Vertical line************** */}
        <div className="h-6 border-[0.8px] border-gray-400 sm:mx-1 md:mx-4 my-3"></div>


        {/* ************************profile section************ */}
        <div className="flex flex-row items-center justify-between gap-3 hover:bg-gray-100 w-full h-full cursor-pointer px-3" onClick={() => setopen(!open)}
          ref={ProfiledivRef}>
          <div
            className='flex justify-center items-center gray-icon h-full w-full font-bold'>
            <IoPersonCircle className='sm:text-2xl md:text-3xl' />
          </div>

          <div className="flex flex-col">
            <span className='sm:text-xs md:text-sm text-black'>Malaika</span>
            <span className='text-xs text-gray-400'>role</span>
          </div>
        </div>

        {
          open &&
          <div className='flex flex-col bg-white pt-4 w-52 shadow-lg z-50 rounded-lg  absolute right-4 top-14 text-gray-500'
            ref={ProfileRef} >
            <ul>
              {/* Profile Option */}
              <li onClick={() => {
                setopen(false)
                navigate('/userProfile')
              }}
                className='py-4 px-2 w-full text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-100'><CgProfile />My Profile</li>

              {/* Logout Option */}
              <li onClick={() => { setopen(false); localStorage.clear(); props.set_token(); navigate("/signin") }} className='py-4 px-2 text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-100'><TbLogout />Logout</li>
            </ul>
          </div>

        }
      </div>
    </div>
  )
}

