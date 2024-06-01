import React, { useEffect, useRef, useState, useContext, forwardRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';

import { useStateContext } from '../contexts/ContextProvider'
import { FaSearch } from 'react-icons/fa';

import { BsPersonCircle } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import { IoMdNotifications } from "react-icons/io";
import Loader from "../shared/Loader";
import { StateContext } from '../contexts/ContextProvider';
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationsDropDown from './notifications/NotificationsDropDown';

import { IoPersonCircleOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { IoMenu } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";

// Navigation Button Component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

  <button type='button' onClick={customFunc} style={{ color, borderRadius: '50%' }}
    className='relative text-xl rounded-full p-3 navbutton-hover'>
    <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2 font-bold' />{icon}
  </button>

)
function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

const role = getToken().role;
const name = getToken().name;


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
  const { loading, setLoading } = useContext(StateContext);
  const [notificationsClicked, setNotificationsClicked] = useState(false)

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setTooltipVisible(newSearchTerm.length === 0); // Show tooltip when the search term is empty
  };

  // state variable to handle the profile dropdown menu
  const [open, setopen] = useState(false)

  const [searchinput, setSearchInput] = useState('search...')

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


  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchinput);
    }
  };

  return (
    //  ${color ? "navbar-bg-onscroll" : "bg-white"}
    <div className={`fixed top-0 flex justify-between h-[10vh] w-[83%] lg:px-8 large:px-8 z-10 gray-icon
     bg-white
     ${!activeMenu ? "w-full" : "w-[83%]"}
       border-b border-gray-200 shadow-sm`}>
      {loading && <Loader />}


      {/* ******************Menu Button********************* */}
      <NavButton title='Menu'
        customFunc={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)}
        icon={<SlMenu
          className='large:w-14 large:h-6 large:-ml-[14px]' />} />


      {/* Div to contain all nav elements */}
      <div className="flex mx-auto">
        <div className="relative">


          {/* Search Bar */}
          <div className="relative w-64 mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-gray-700 border-2 border-gray-200 rounded-full py-2 px-4 w-full transition-all duration-300 focus:outline-none main-color-focus"
              value={searchinput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />

            {/* Search Icon */}
            <div className="absolute right-0 top-0 mt-3 mr-4 text-gray-500">
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
        <div className="h-6 border-[0.8px] border-gray-400 mx-4 my-3"></div>

        {/* ************************profile section************ */}
        <div className="flex flex-row items-center justify-between gap-3 hover:bg-gray-100 w-full h-full cursor-pointer px-3" onClick={() => setopen(!open)}
          ref={ProfiledivRef}>
          <div
            className='flex justify-center items-center gray-icon h-full w-full font-bold'>
            <IoPersonCircle className='text-3xl' />
          </div>

          <div className="flex flex-col">
            <span className='text-sm text-black'>name</span>
            <span className='text-xs text-gray-400'>{role}</span>
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

