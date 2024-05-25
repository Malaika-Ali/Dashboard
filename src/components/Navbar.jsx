import React, { useEffect, useRef, useState, useContext, forwardRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';

import { useStateContext } from '../contexts/ContextProvider'
import { FaSearch } from 'react-icons/fa';
import Notification from './Notification';

import { BsPersonCircle } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import NotificationStack from './NotificationStack';

import { IoMdNotifications } from "react-icons/io";
import Loader from "../shared/Loader";
import { StateContext } from '../contexts/ContextProvider';
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationsDropDown from './notifications/NotificationsDropDown';

// Navigation Button Component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (

  <button type='button' onClick={customFunc} style={{ color, borderRadius: '50%' }}
    className='relative text-xl rounded-full p-3 navbutton-hover'>
    <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />{icon}
  </button>

)


export default function Navbar(props) {

  // Calling sidebar's active state to adjust nav's width
  const { activeMenu, setactiveMenu, isClicked, setisClicked, handleClick, screenSize, setscreenSize } = useStateContext();

  // Function to handle notification
  // const handleClick=()=>{
  //   console.log('Sab set Chal raha')
  // }

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




  // Chatgpt code for search bar
  const [searchTerm, setSearchTerm] = useState('');
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

  const divRef = useRef();
  const dropDownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target) && dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setopen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [divRef, dropDownRef]);

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
let notificationsRef=useRef();


  useEffect(()=>{
    let notificationsHandler=(e)=>{
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setNotificationsClicked(false);
      }
    };
    document.addEventListener("mousedown",notificationsHandler)


  return()=>{
    document.removeEventListener("mousedown",notificationsHandler);
  }

})

  return (
    <div className={`fixed top-0 flex justify-between p-2 w-[83%] lg:px-8 large:px-8 z-10 navbar-bg  ${color ? "navbar-bg-onscroll" : "bg-white"} border-b border-gray-200`}>
      {loading && <Loader />}


      {/* This is that menu button in nav */}
      <NavButton title='Menu' customFunc={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)} icon={<AiOutlineMenu
        className='large:w-14 large:h-6 large:-ml-[14px] gray-icon' />} />


      {/* Div to contain all nav elements */}
      <div className="flex mx-auto">
        <div className="relative">
          {/* Search Bar */}


          {/* <div className="relative w-64 mt-2"> */}
          {/* <input
              type="text"
              placeholder="Search..."
              className="bg-white text-gray-700 border-2 border-gray-200 rounded-full py-2 px-4 w-full transition-all duration-300 focus:outline-none main-color-focus"
              value={searchTerm}
              onChange={handleSearchChange}
            /> */}

          {/* Search Icon */}
          {/* <div className="absolute right-0 top-0 mt-3 mr-4 text-gray-500">
              <FaSearch />
            </div>
          </div> */}

          {/* Tooltip */}
          {/* <TooltipComponent content="Please enter a search term" position='BottomCenter' >
            <div className="absolute top-full mt-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Please enter a search term</div>
          </TooltipComponent> */}
        </div>
      </div>



      <div className='flex flex-row justify-between'>
        <NavButton
          title='Notifications'
          dotColor="#5C61F2"
          customFunc={() => setNotificationsClicked(!notificationsClicked)}
          icon={<IoMdNotificationsOutline />}
          className='text-gray-500'
           />
          {
            notificationsClicked &&
            <NotificationsDropDown ref={notificationsRef} />
          }

        {/* Vertical line */}
        <div className="h-6 border-[1.2px] border-gray-400 mx-4"></div>



        <div onClick={() => setopen(!open)}
          className='relative mt-3 cursor-pointer navbutton-hover rounded-full'
          ref={divRef}>
          <BsPersonCircle className='w-14 h-5 large:w-16 large:h-6 gray-icon navbutton-hover' />
        </div>

        {
          open &&
          <div className='bg-white p-4 w-52 shadow-lg z-50  absolute -right-2 top-12' ref={dropDownRef} >
            <ul>
              {/* Profile Option */}
              <li onClick={() => {
                setopen(false)
                navigate('/userProfile')
              }} className='p-2 text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-300'><CgProfile />My Profile</li>

              {/* Logout Option */}
              <li onClick={() => { setopen(false); localStorage.clear(); props.set_token(); navigate("/signin") }} className='p-2 text-lg cursor-pointer rounded flex flex-row gap-4 items-center hover:bg-gray-300'><TbLogout />Logout</li>
            </ul>
          </div>

        }
      </div>
    </div>
  )
}
