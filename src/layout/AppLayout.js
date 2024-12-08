import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import Footer from '../components/Footer';
import { useStateContext } from '../contexts/ContextProvider';
import { motion } from 'framer-motion';

function AppLayout() {
  const { activeMenu } = useStateContext();

  function getToken() {
    const tokenString = localStorage.getItem('token');
    return JSON.parse(tokenString);
  }

  const [token, setToken] = useState(getToken());

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: {
      x: '-100%', // Move off-screen to the left when closed
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
    visible: {
      x: 0, // Fully visible on-screen
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  };

  // Header animation variants
  const headerVariants = {
    expanded: {
      marginLeft: '0rem',
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
    collapsed: {
      marginLeft: '0rem', // Header spans the full width
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <div className="grid grid-rows-layout grid-cols-2 lg:grid-cols-layout h-full min-h-screen w-[100%]">
      {/* Navbar */}
      <motion.header
        className={`row-start-1 row-end-2
              ${activeMenu ? 'col-start-1 lg:col-start-2' : 'col-start-1'}
                col-end-3 lg:col-end-3`}
        variants={headerVariants}
        animate={activeMenu ? 'expanded' : 'collapsed'}
      >
        <Navbar user_details={token} set_token={setToken} />
      </motion.header>

      {/* Sidebar */}
      <motion.aside
        className="row-start-1 row-end-3 col-start-1 col-end-2 min-h-screen h-screen sticky top-0 inset-0 z-10 backdrop-blur-sm md:overflow-y-auto lg:overflow-hidden"
        variants={sidebarVariants}
        initial="hidden"
        animate={activeMenu ? 'visible' : 'hidden'}
        exit="hidden"
      >
        <Sidebar user_details={token} />
      </motion.aside>

      {/* Main Content */}
      <main
        className={`row-start-2 row-end-3 
          md:px-6
          ${activeMenu
            ? 'col-start-1 lg:col-start-2 lg:px-8'
            : 'col-start-1 px-4 md:px-2 lg:px-[8rem]'
        }  
               col-end-3 w-[100%] mb-4`}
      >
        <Outlet />
      </main>

    </div>
  );
}

export default AppLayout;
