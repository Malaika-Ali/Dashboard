import React, { useEffect, useRef, useState, useContext, forwardRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import Loader from "../shared/Loader";
import { StateContext } from '../contexts/ContextProvider';
import NotificationsDropDown from './notifications/NotificationsDropDown';
import { IoNotifications, IoPersonCircle } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";

// Navigation Button Component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button type='button' onClick={customFunc} style={{ color, borderRadius: '50%' }}
    className='relative md:text-lg lg:text-xl rounded-full p-3 navbutton-hover'>
    <span style={{ background: dotColor }} className='absolute inline-flex rounded-full md:h-1 md:w-1 lg:h-2 lg:w-2 right-2 top-2 font-bold' />{icon}
  </button>
);

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken || {};
}

export default function Navbar(props) {
  const { activeMenu, setactiveMenu, screenSize, setscreenSize, searchTerm, setSearchTerm } = useStateContext();
  const { loading } = useContext(StateContext);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [open, setopen] = useState(false);
  const [searchinput, setSearchInput] = useState('');
  const dropDownRef = useRef();
  const navigate = useNavigate();
  const [notificationOpen, setnotificationOpen] = useState(false);
  const [first, setfirst] = useState(true);
  const [color, setColor] = useState(false);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  // Update role and name on component mount and when token changes
  useEffect(() => {
    const token = getToken();
    setRole(token.role || '');
    setName(token.first_name || '');
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) setactiveMenu(false);
    else setactiveMenu(true);
  }, [screenSize]);

  const changeColor = () => {
    if (window.scrollY >= 90) setColor(true);
    else setColor(false);
  };

  window.addEventListener("scroll", changeColor);

  let notificationsRef = useRef();
  let divRef = useRef();
  let ProfileRef = useRef();
  let ProfiledivRef = useRef();

  useEffect(() => {
    let notificationsHandler = (e) => {
      if (
        (notificationsRef.current && !notificationsRef.current.contains(e.target)) &&
        (divRef.current && !divRef.current.contains(e.target))
      ) {
        setNotificationsClicked(false);
      }
    };
    document.addEventListener("mousedown", notificationsHandler);
    return () => document.removeEventListener("mousedown", notificationsHandler);
  }, [divRef, notificationsRef]);

  useEffect(() => {
    let profileHandler = (e) => {
      if (
        (ProfileRef.current && !ProfileRef.current.contains(e.target)) &&
        (ProfiledivRef.current && !ProfiledivRef.current.contains(e.target))
      ) {
        setopen(false);
      }
    };
    document.addEventListener("mousedown", profileHandler);
    return () => document.removeEventListener("mousedown", profileHandler);
  }, [ProfiledivRef, ProfileRef]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchinput);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole('');
    setName('');
    props.set_token();
    navigate("/login");
  };

  // md:w-full large:ml-4 lg:px-8 


  return (
    <div className={`fixed top-0 flex justify-between md:h-[9vh] lg:h-[10vh] large:h-[8vh] sm:px-3 md:px-6 
      z-10 gray-icon bg-white
    ${!activeMenu ? 'lg:w-[100%]' : 'lg:w-[calc(100%-250px)]'}

       border-b border-gray-200 shadow-sm`}>
      {loading && <Loader />}

      {/* Menu Button */}
      <NavButton title='Menu'
        customFunc={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)}
        icon={<SlMenu className='large:w-14 large:h-6 large:-ml-[14px]' />} />

      {/* Div to contain all nav elements */}
      <div className="flex mx-auto">
        <div className="relative">
          {/* Search Bar */}
          <div className="relative sm:w-44 md:w-48 lg:w-56 sm:mt-2 md:mt-1 lg:mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white sm:text-sm md:text-base lg:text-sm text-gray-700 border-2 border-gray-200 rounded-full sm:pl-4 md:pl-6 lg:pl-5 sm:p-1 lg:p-2 w-full transition-all duration-300 focus:outline-none main-color-focus"
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

      {/* Notifications button */}
      <div className='flex flex-row justify-between items-center' ref={divRef}>
        <NavButton
          title='Notifications'
          dotColor="#5C61F2"
          customFunc={() => setNotificationsClicked(!notificationsClicked)}
          icon={<IoNotifications />}
        />
        {notificationsClicked && <NotificationsDropDown ref={notificationsRef} />}

        {/* Vertical line */}
        <div className="h-6 border-[0.8px] border-gray-400 sm:mx-1 md:mx-4 my-3"></div>

        {/* Profile section */}
        <div className="flex flex-row items-center justify-between gap-3 navbutton-hover w-full h-full cursor-pointer " onClick={() => setopen(!open)} ref={ProfiledivRef}>
          <div className='flex justify-center items-center gray-icon h-full w-full font-bold'>
            <IoPersonCircle className='sm:text-2xl md:text-3xl' />
          </div>
          <div className="flex flex-col">
            <span className='sm:text-xs md:text-sm text-black'>{capitalizeFirstLetter(name)}</span>
            <span className='text-xs text-gray-400'>{capitalizeFirstLetter(role)}</span>
          </div>
        </div>
        {open && (
          <div className='flex flex-col bg-white pt-4 w-52 shadow-lg z-50 rounded-lg absolute right-4 top-14 text-gray-500' ref={ProfileRef}>
            <ul>
              {/* Profile Option */}
              <li onClick={() => {
                setopen(false);
                navigate('/userProfile');
              }} className='py-4 px-2 w-full text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-100'><CgProfile />My Profile</li>
              {/* Logout Option */}
              <li onClick={handleLogout} className='py-4 px-2 text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-100'><TbLogout />Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


















