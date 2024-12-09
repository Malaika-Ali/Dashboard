import './App.css';
import React, { useState, lazy, useEffect } from 'react'
import Loadable from './shared/Loadable';

// importing react-router-dom components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [token, setToken] = useState(null);

  // function getToken() {
  //   const tokenString = localStorage.getItem('token');
  //   const userToken = JSON.parse(tokenString);
  //   return userToken
  // }
  // const userRole = token ? token.role : null;

  useEffect(() => {
    // Check for token in local storage on initial load
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      setToken(userToken); // Set the token state if it exists
    }
  }, []);

  const userRole = token ? token.role : null;

  const ProtectedRoute = ({ element, allowedRoles }) => {
    return token && allowedRoles.includes(userRole) ? element : <Navigate replace to="/login" />
  }

  const set_token = (newToken) => {
    setToken(newToken); 
  };


  // Defining lazy
  const LoginPage = Loadable(lazy(() => import('./pages/LoginPage')));
  const SignupPage = Loadable(lazy(() => import('./pages/SignupPage')));
  const AppLayout = Loadable(lazy(() => import('./layout/AppLayout')));
  const AdminHomePage = Loadable(lazy(() => import('./pages/AdminHomePage')));
  const FactoryInchargeHome = Loadable(lazy(() => import('./pages/FactoryInchargeHome')));
  const FloorInchargeHomePage = Loadable(lazy(() => import('./pages/FloorInchargeHomePage')));
  const Areas = Loadable(lazy(() => import('./pages/Areas')));
  const Factories = Loadable(lazy(() => import('./pages/Factories')));
  const Motors = Loadable(lazy(() => import('./pages/Motors')));
  const Employees = Loadable(lazy(() => import('./pages/Employees')));
  const Floors = Loadable(lazy(() => import('./pages/Floors')));
  const UserProfile = Loadable(lazy(() => import('./pages/UserProfile')));
  const History = Loadable(lazy(() => import('./pages/History')));
  const NotificationsPage = Loadable(lazy(() => import('./pages/NotificationsPage')));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<LoginPage set_token={set_token} />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Redirect unauthenticated users to login */}
          <Route
    path="/"
    element={
      token ? (
        <AppLayout />
      ) : (
        <Navigate replace to="/login" />
      )
    }
  />


          {/* Protected Routes with Layout */}
          <Route path="/" element={<AppLayout />}>

            <Route
              index
              element={
                <ProtectedRoute
                  element={
                    userRole === 'admin' ? <AdminHomePage user_details={token} /> :
                      userRole === 'factoryIncharge' ? <FactoryInchargeHome user_details={token} /> :
                        userRole === 'floorIncharge' ? <FloorInchargeHomePage user_details={token} /> :
                          <Navigate replace to="/login" />
                  }
                  allowedRoles={['admin', 'factoryIncharge', 'floorIncharge']}
                />    
              }
            />
            <Route path='/areas' element={<ProtectedRoute element={<Areas user_details={token} />} allowedRoles={['admin']} />} />
            <Route path='/factories' element={<ProtectedRoute element={<Factories user_details={token} />} allowedRoles={['admin']} />} />
            <Route path='/motors' element={<ProtectedRoute element={<Motors user_details={token} />} allowedRoles={['admin', 'factoryIncharge', 'floorIncharge']} />} />
            <Route path='/employees' element={<ProtectedRoute element={<Employees user_details={token} />} allowedRoles={['admin']} />} />
            <Route path='/factoryInchargeHome' element={<ProtectedRoute element={<FactoryInchargeHome user_details={token} />} allowedRoles={['factoryIncharge']} />} />
            <Route path='/floors' element={<ProtectedRoute element={<Floors user_details={token} />} allowedRoles={['factoryIncharge']} />} />
            <Route path='/floorInchargeHomePage' element={<ProtectedRoute element={<FloorInchargeHomePage user_details={token} />} allowedRoles={['floorIncharge']} />} />
            <Route path='/userProfile' element={<ProtectedRoute element={<UserProfile user_details={token} set_token={setToken} />} allowedRoles={['admin', 'factoryIncharge', 'floorIncharge']} />} />
            <Route path='/history' element={<ProtectedRoute element={<History user_details={token} />} allowedRoles={['admin', 'factoryIncharge', 'floorIncharge']} />} />
            <Route path='/notificationsPage' element={<ProtectedRoute element={<NotificationsPage user_details={token} />} allowedRoles={['admin', 'factoryIncharge', 'floorIncharge']} />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
