import './App.css';
import React, { useState } from 'react'

// importing react-router-dom components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';

// Importing Pages
import { Factories, LoginPage, SignupPage, Motors, Areas, FactoryInchargeHome, FloorInchargeHomePage, AdminHomePage, Floors, UserProfile, Employees, History, NotificationsPage } from './pages';

// Importing layout
import AppLayout from './layout/AppLayout';

function App() {

  // const { token, setToken } = useStateContext();
  // if (!tokenString) {
  //   <Navigate to="/login" />
  // }

  const [token, setToken] = useState(getToken());

  // const [isLoggedIn, setIsLoggedIn] = useState(false)



  function getToken() {
    const tokenString = localStorage.getItem('token');
    // if (!tokenString) {
    //     console.log("No token found")
    // }

    const userToken = JSON.parse(tokenString);
    console.log("here's the token", userToken)

    return userToken
  }

  // const userRole = getToken().role
  const userRole = token ? token.role : null;
  console.log("The role of user is", userRole)

  const ProtectedRoute = ({ element, allowedRoles }) => {
    return token && allowedRoles.includes(userRole) ? element : <Navigate replace to="/login" />
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />


          <Route path="/signup" element={<SignupPage />} />


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
