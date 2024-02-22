import './App.css';
import React, {useEffect, useState}  from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import { ContextProvider } from './contexts/ContextProvider';



// Importing components
import  {Sidebar, Navbar} from './components'; 

// Importing Pages
import { FactoriesPage, LoginPage, SignupPage, Motors, AreasPage, FactoryInchargeHome, FloorInchargeHomePage, AdminHomePage, FloorsPage, UserProfile, EmployeeDetails } from './pages';


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
  const path_roles = {admin: "adminHomePage", floorIncharge: "FloorInchargeHomePage", factoryIncharge: "FactoryInchargeHomePage"};
  const [token, setToken] = useState(getToken());
  
  return (
    <div>
      {/* <ContextProvider> */}
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>   
          {activeMenu && token && !isLoginPageOrSignupPage() ? (
            <div className='fixed w-64 sidebar bg-white '>
              <Sidebar user_details={token} />
            </div>
          ) : null}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu && token && !isLoginPageOrSignupPage() ? 'md:ml-64' : 'flex-2'
            }`}
          >
            {!isLoginPageOrSignupPage() && token && (
              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                <Navbar user_details={token} set_token={setToken} />
              </div>
            )}

            <div>
              <Routes>
                
                <Route index path='/signin' element={token?<Navigate to={`/${path_roles[token.role]}`}/>:<LoginPage set_token={setToken} />} />
                <Route index path='/signuppage' element={token?<Navigate to={`/${path_roles[token.role]}`}/>:<SignupPage />} />
                <Route index path='/' element={token?<Navigate replace to={`/${path_roles[token.role]}`}/>:<Navigate replace to="/signin"/>} /> 

                <Route path='/adminHomePage' element={token?<AdminHomePage user_details={token}/>:<Navigate replace to="/signin"/>} />
                <Route path='/areaspage' element={token?<AreasPage user_details={token} />:<Navigate replace to="/signin"/>} />
                <Route path='/factoriespage' element={token?<FactoriesPage user_details={token} />:<Navigate replace to="/signin"/>} />
                <Route path='/motors' element={token?<Motors user_details={token} />:<Navigate replace to="/signin"/>} />
                <Route
                  path='/factoryInchargeHome'
                  element={token?<FactoryInchargeHome user_details={token} />:<Navigate replace to="/signin"/>}
                />
                <Route
                  path='/floorInchargeHomePage'
                  element={token?<FloorInchargeHomePage user_details={token} />:<Navigate replace to="/signin"/>}
                />
                <Route
                  path='/userProfile'
                  element={token?<UserProfile user_details={token} />:<Navigate replace to="/signin"/>}
                />
                <Route
                  path='/employeeDetails'
                  element={token?<EmployeeDetails user_details={token} />:<Navigate replace to="/signin"/>}
                />
                <Route
                path='/floorsPage'
                element={token?<FloorsPage user_details={token} />:<Navigate replace to="/signin"/>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
      {/* </ContextProvider> */}
    </div>
  );
}

export default MainDash;
