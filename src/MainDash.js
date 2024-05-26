import './App.css';
import React, {useEffect, useState}  from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import { ContextProvider } from './contexts/ContextProvider';



// Importing components
import  {Sidebar, Navbar} from './components'; 
import FullPageCalendar from './components/calendars/FullPageCalendar'
import History from './pages/History';


// Importing Pages
import { FactoriesPage, LoginPage, SignupPage, Motors, AreasPage, FactoryInchargeHome, FloorInchargeHomePage, AdminHomePage, FloorsPage, UserProfile, EmployeeDetails } from './pages';
import NotificationsPage from './pages/NotificationsPage';

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
        <div className='flex relative'>   
          {activeMenu && token && !isLoginPageOrSignupPage() ? (
            <div className='fixed w-60 large:w-64'>
              <Sidebar user_details={token} />
            </div>
          ) : null}
          <div
            className={`min-h-screen w-full ${
              activeMenu && token && !isLoginPageOrSignupPage() ? 'md:ml-[15rem]' : 'flex-2'
            }`}
          >
            {!isLoginPageOrSignupPage() && token && (
              <div className='fixed md:static navbar w-full'>
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
                  element={token?<UserProfile user_details={token} set_token={setToken} />:<Navigate replace to="/signin"/>}
                />
                <Route
                  path='/employeeDetails'
                  element={token?<EmployeeDetails user_details={token} />:<Navigate replace to="/signin"/>}
                />
                <Route
                path='/floorsPage'
                element={token?<FloorsPage user_details={token} />:<Navigate replace to="/signin"/>} />
                 <Route
                path='/history'
                element={token?<History user_details={token} />:<Navigate replace to="/signin"/>} />
                <Route
                path='/notificationsPage'
                element={token?<NotificationsPage user_details={token} />:<Navigate replace to="/signin"/>} />
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
