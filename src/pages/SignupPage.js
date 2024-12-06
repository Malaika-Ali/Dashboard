// Signup.js

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import Swal from 'sweetalert2';
import logo from '../assets/MotorLogo3.png'

// let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_USERS_API;


const SignupPage = () => {

  useEffect(() => {
    // Clear the form after the page is loaded
    reset({
      firstName: '',
      lastName: '',
      email: '',
      employeeID: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
  }, []); // Empty dependency array ensures this effect runs only once

  const [open, setOpen] = useState(false);

  const { handleSubmit, control, setError, setValue, reset, formState: { errors }, getValues } = useForm({
    shouldUnregister: false, // Prevent automatic unregistering of fields
  });

  const [selectedRole, setSelectedRole] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Perform signup logic here
    // setValue('role', selectedRole);
    // console.log(data);
    setOpen(true);
    const dat = {
      'first_name': data.firstName, 'last_name': data.lastName, 'email': data.email, 'employee_id': data.employeeID,
      'password': data.password, 'role': data.role
    };
    if (data.role == 'factoryIncharge') {
      dat["area_name"] = data.areaName;
      dat["factory_name"] = data.factoryName;
    }
    else if (data.role == 'floorIncharge') {
      dat["area_name"] = data.areaName;
      dat["factory_name"] = data.factoryName;
      dat["floor_number"] = data.floorNumber;
    }

    await axios.post(
      API_URL + "signup_user",
      dat,
      {
        headers: {
          'Content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        }
      }
    ).then((result) => {
      setOpen(false);
      // Show SweetAlert message on successful registration
      Swal.fire({
        icon: 'success',
        title: 'Registration Success',
        text: 'You have successfully registered!',
      });
      navigate('/');
    }).catch(async (error) => {
      setOpen(false);
      // alert(error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred while registering. Please try again later.',
      });
      // Reset the form fields
      await reset({
        firstName: '',
        lastName: '',
        email: '',
        employeeID: '',
        password: '',
        confirmPassword: '',
        role: 'selectedRole',
      });
    })
  };

  const passwordFieldValue = control.fieldsRef?.current?.password?.value;


  const handleRoleChange = (event) => {
    // setSelectedRole(event.target.value);
    setValue('role', event.target.value); // Use setValue from useForm
    setSelectedRole(event.target.value);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="min-h-screen flex items-center justify-center bg-main-color">

{/* **********************logo************************** */}
      <div className='w-24 absolute top-4 left-4 lg:w-14 large:w-44'>
      <img src={logo} alt="company logo" />
      </div>


        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-[50%] large:w-[40%] mt-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-secondary-color">Sign Up</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8'>
            <div className="mb-4 ">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="First Name"
                    className={`w-full p-2 border rounded-md focus:outline-secondary-color ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Last Name"
                    className={`w-full p-2 border rounded-md focus:outline-secondary-color ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'This field is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    className={`w-full p-2 border rounded-md focus:outline-secondary-color ${errors.email ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Employee ID
              </label>
              <Controller
                name="employeeID"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Employee ID"
                    autoComplete='username'
                    className={`w-full p-2 border rounded-md focus:outline-secondary-color ${errors.employeeID ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.employeeID && <p className="text-red-500 text-xs italic">{errors.employeeID.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    className={`w-full p-2 border rounded-md focus:outline-secondary-color ${errors.password ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Confirm Password
              </label>

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'This field is required',
                  // validate: (value) => {
                  //   const passwordField = control.fieldsRef?.current?.password;
                  //   const passwordFieldValue = passwordField?.value;
                  //   return value === passwordFieldValue || 'Passwords do not match';
                  // },
                  validate: (value) => {
                    const passwordFieldValue = getValues('password');
                    return value === passwordFieldValue || 'Passwords do not match';
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    className={`w-full p-2 border rounded-md focus:outline-secondary-color ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
            </div>


          </div>

          <div className="flex items-center justify-between">

            <button
              className="w-full main-color text-white p-2 rounded-md main-color-hover"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <div className='flex justify-center items-center mt-[0.5em]'>Already Have An Account?
            <Link to="/login"><span className='text-blue-500 cursor-pointer hover:text-blue-400'>{`  Login`}</span>
            </Link></div>
        </form>



      </div>
    </>

  );
};

export default SignupPage;


