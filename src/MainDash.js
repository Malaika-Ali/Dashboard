import './App.css';
import React, {useEffect, useState}  from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';



// Importing components
import  {Sidebar, Navbar} from './components'; 

// Importing Pages
import { FactoriesPage, LoginPage, SignupPage, Motors, AreasPage, FactoryInchargeHome, FloorInchargeHomePage, AdminHomePage, FloorsPage } from './pages';


// function MainDash() {

//   const {activeMenu}=useStateContext();
  
//   return (
//     <div >
//       <BrowserRouter>
//       <div className='flex relative dark:bg-main-dark-bg'>
//       <div className='fixed left-4 bottom-4' style={{ zIndex: '1000' }}>
//          <TooltipComponent content="Settings" position="Top">
//             <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white' style={{ background: 'purple', borderRadius: '50%'}}> <FiSettings/> </button>
//           </TooltipComponent> 
//         </div>
//         {activeMenu ? (
//           <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
//             <Sidebar/>
            
//           </div>
//         ) : (
//           <div className='w-0 dark:bg-secondary-dark-bg'>
//             <Sidebar/>
            
//             </div>
//         )}
//         <div className={ `'dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2' }`
//         }>

//           <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
//             <Navbar/>
//           </div>

        
//         <div>
//           <Routes>
//             <Route index path='/' element={<LoginPage/>} />
//             <Route index path='/signuppage' element={<SignupPage/>} />

//             <Route path='/adminHomePage' element={<AdminHomePage/>} />
//             <Route path='/areaspage' element={<AreasPage/>} />
//             <Route path='/factoriespage' element={<FactoriesPage/> } />
//             <Route path='/motors' element={<Motors/>} />
//             <Route path='/factoryInchargeHome' element={<FactoryInchargeHome/>} />
//             <Route path='/floorInchargeHomePage' element={<FloorInchargeHomePage/>} />
            
//           </Routes>
//           </div>


//         </div>
//       </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default MainDash;

function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

function MainDash() {
  const { activeMenu } = useStateContext();

  const isLoginPageOrSignupPage = () => {
    const currentPath = window.location.pathname;
    return currentPath === '/' || currentPath === '/signuppage';
  };
  
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(getToken());
  }, [token]);
  return (
    <div>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          {/* <div className='fixed left-4 bottom-4' style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type='button'
                className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white'
                style={{ background: 'purple', borderRadius: '50%' }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div> */}
          
          {activeMenu && token && !isLoginPageOrSignupPage() ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <Sidebar />
            </div>
          ) : null}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu && token && !isLoginPageOrSignupPage() ? 'md:ml-72' : 'flex-2'
            }`}
          >
            {!isLoginPageOrSignupPage() && token && (
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                <Navbar />
              </div>
            )}

            <div>
              <Routes>
                
                <Route index path='/' element={<LoginPage user_details={token} set_token={setToken} />} />
                <Route index path='/signuppage' element={<SignupPage />} />

                <Route path='/adminHomePage' element={<AdminHomePage user_details={token} />} />
                <Route path='/areaspage' element={<AreasPage user_details={token} />} />
                <Route path='/factoriespage' element={<FactoriesPage user_details={token} />} />
                <Route path='/motors' element={<Motors user_details={token} />} />
                <Route
                  path='/factoryInchargeHome'
                  element={<FactoryInchargeHome user_details={token} />}
                />
                <Route
                  path='/floorInchargeHomePage'
                  element={<FloorInchargeHomePage user_details={token} />}
                />
                <Route
                path='/floorsPage'
                element={<FloorsPage user_details={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default MainDash;
