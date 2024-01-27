import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';

import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { useStateContext } from '../contexts/ContextProvider'
import { FaSearch } from 'react-icons/fa';
import Notification from './Notification';

// Navigation Button Component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{ color, borderRadius: '50%' }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/>{icon}
    </button>
  </TooltipComponent>
)

export default function Navbar() {

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
    return()=> window.removeEventListener('resize',handleResize)
  }, []);

  useEffect(()=>{
    if(screenSize<=900)
    setactiveMenu(false);
  else{
    setactiveMenu(true);
  }
  },[screenSize])




  // Chatgpt code for search bar
  const [searchTerm, setSearchTerm] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setTooltipVisible(newSearchTerm.length === 0); // Show tooltip when the search term is empty
  };


  return (
    <div className='flex justify-between p-2 mt-2 md:mx-6 relative'>

      {/* This is that menu button in nav */}
      <NavButton title='Menu' customFunc={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)} color="blue" icon={<AiOutlineMenu />} />

      {/* Div to contain all nav elements */}
      {/* <div className='flex' >
        <NavButton title='Menu' 
        customFunc={() => setactiveMenu((prevActiveMenu) => !prevActiveMenu)} 
        color="blue" 
        icon={<AiOutlineMenu />} /> */}


      {/* Div to contain all nav elements */}
      <div className="flex mx-auto">
        <div className="relative">
          {/* Search Bar */}


          <div className="relative w-64 ">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-full py-2 px-4 w-full transition-all duration-300 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            {/* Search Icon */}
            <div className="absolute right-0 top-0 mt-3 mr-4 text-gray-500">
              <FaSearch />
            </div>
          </div>

          {/* Tooltip */}
          <TooltipComponent content="Please enter a search term" position='BottomCenter' >
            <div className="absolute top-full mt-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Please enter a search term</div>
            {/* <div className="absolute top-full mt-2 text-red-500 text-sm">Please enter a search term</div> */}
          </TooltipComponent>
        </div>
        </div>

        {/* Notifications Icon */}
        <NavButton
        
        title='Notifications'
          dotColor="#03C9D7"
          customFunc={() => handleClick("Notifications")}
          color="blue"
          icon={<RiNotification3Line />} />
      

      {isClicked.Notifications && <Notification />}
    </div>
  )
}
