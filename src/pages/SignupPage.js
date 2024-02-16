// Signup.js

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
// let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";

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
    const dat = { 'first_name': data.firstName, 'last_name': data.lastName, 'email': data.email, 'employee_id' : data.employeeID,
                  'password': data.password, 'role': data.role};
    if (data.role == 'factoryIncharge') {
      dat["area_name"] = data.areaName;
      dat["factory_name"] = data.factoryName;
    }
    else if(data.role == 'floorIncharge'){
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
      alert('Success');
      navigate('/');
    }).catch(async (error) =>  {
      setOpen(false);
      alert(error.response.data);
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

    

    

    // // Reset the form fields
    // await reset({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   employeeID: '',
    //   password: '',
    //   confirmPassword: '',
    //   role: 'selectedRole',
    // });

  };

  const passwordFieldValue = control.fieldsRef?.current?.password?.value;


  const renderAdditionalFields = (role) => {
    switch (role) {
      case 'factoryIncharge':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaName">
                Area Name
              </label>
              <Controller
                name="areaName"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="areaName"
                    placeholder="Area Name"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.areaName ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.areaName && <p className="text-red-500 text-xs italic">{errors.areaName.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="factoryName">
                Factory Name
              </label>
              <Controller
                name="factoryName"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="factoryName"
                    placeholder="Factory Name"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.factoryName ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.factoryName && <p className="text-red-500 text-xs italic">{errors.factoryName.message}</p>}
            </div>
          </div>
        );
      case 'floorIncharge':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaName">
                Area Name
              </label>
              <Controller
                name="areaName"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="areaName"
                    placeholder="Area Name"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.areaName ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.areaName && <p className="text-red-500 text-xs italic">{errors.areaName.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="factoryName">
                Factory Name
              </label>
              <Controller
                name="factoryName"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="factoryName"
                    placeholder="Factory Name"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.factoryName ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.factoryName && <p className="text-red-500 text-xs italic">{errors.factoryName.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floorNumber">
                Floor Number
              </label>
              <Controller
                name="floorNumber"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="floorNumber"
                    placeholder="Floor Number"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.floorNumber ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.floorNumber && <p className="text-red-500 text-xs italic">{errors.floorNumber.message}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96 mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
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
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
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
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
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
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.email ? 'border-red-500' : ''}`}
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
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.employeeID ? 'border-red-500' : ''}`}
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
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              />
            )}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Confirm Password
          </label>
          {/* <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'This field is required',
              validate: (value) => value === control.fieldsRef.current?.password.value || 'Passwords do not match',
            }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Confirm Password"
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              /> */}

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
                className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
            )}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Role
          </label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                onChange={handleRoleChange}
                // onChange={() => setValue('role', 'admin')}
                name="role"
                control={control}
                value="admin"
                className="mr-2 leading-tight"
              />
              <span className="text-sm">Admin</span>
            </label>
            <label className="mr-4">
              <input
                type="radio"
                onChange={handleRoleChange}
                // onChange={() => setValue('role', 'factoryIncharge')}
                name="role"
                control={control}
                value="factoryIncharge"
                className="mr-2 leading-tight"
              />
              <span className="text-sm">Factory Incharge</span>
            </label>
            <label>
              <input
                type="radio"
                onChange={handleRoleChange}
                // onChange={() => setValue('role', 'floorIncharge')}
                name="role"
                control={control}
                value="floorIncharge"
                className="mr-2 leading-tight"
              />
              <span className="text-sm">Floor Incharge</span>
            </label>
          </div>
          {errors.role && <p className="text-red-500 text-xs italic">{errors.role.message}</p>}
        </div>

        {/* Additional fields based on selected role */}
        {renderAdditionalFields(selectedRole)}

        <div className="flex items-center justify-between">
          
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            type="submit"
            // onClick={()=>navigate('/')}
          >
            Sign Up
          </button>
          
        </div>
      </form>
    </div>
    </>
  );
};

export default SignupPage;


