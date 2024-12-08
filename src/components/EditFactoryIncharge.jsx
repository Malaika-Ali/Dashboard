import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useForm, Controller } from 'react-hook-form';

import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_API_URL;

function EditFactoryIncharge({ closeForm, popup_data, factory_data_update, areas }) {

  const [open, setOpen] = useState(false);
  const { handleSubmit, control, setError, setValue, reset, formState: { errors }, getValues } = useForm({
    shouldUnregister: false, 
  });

  useEffect(() => {
    // Clear the form after the page is loaded
    if (popup_data) {
      setSelectedRole(popup_data.role);
      setValue('role', popup_data.role);
      reset({
        firstName: popup_data.first_name,
        lastName: popup_data.last_name,
        email: popup_data.email,
        employeeID: popup_data.employee_id,
        password: '',
        confirmPassword: '',
        role: popup_data.role,
        areaName: popup_data.area_name,
        factoryName: popup_data.factory_name,
      });
    }
    else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        employeeID: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
    }
  }, []);



  // state to handle the appearance of factory name input
  const [showFactoryName, setShowFactoryName] = useState(false);
  const [factories, setFactories] = useState([]);
  const [role, setSelectedRole] = useState('')


  const onSubmit = async (data) => {
    setOpen(true);

    if (popup_data) {
      alert('edit clicked')
      console.log(data)
      console.log(data.areaName)
      console.log(data.factoryName)
      await axios.post(
        API_URL + "update_factory_incharge_data",
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          }
        }
      ).then((result) => {

        factory_data_update(result.data);
        setOpen(false);
        closeForm();

      }).catch(async (error) => {
        setOpen(false);
        alert(error.response.data);
      })
    }
    else {
      await axios.post(
        API_URL + "add_factory_incharge_data",
        data,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          }
        }
      ).then((result) => {

        factory_data_update(result.data);
        setOpen(false);
        closeForm();

      }).catch(async (error) => {
        setOpen(false);
        alert(error.response.data);
      })
    }
  };


  // To ensure conditional fetching of factories
  const handleAreaChange = (e) => {
    const areaId = e.target.value;
    fetchFactories(areaId);
  };

// fetching only those factories which are in that particular area
  const fetchFactories = async (areaId) => {
    try {
      const response = await axios.get(`${API_URL}get_factories/${areaId}`);
      setFactories(response.data);
    } catch (error) {
      console.error('Error fetching factories:', error);
    }
  };




  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='fixed inset-0 bg-opacity-50 bg-gray-800 z-50 backdrop-blur-sm '>

        <div className='flex items-center justify-center h-full'>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white pt-8 p-8 rounded shadow-md mt-0 absolute">
            <button className='mb-4 absolute top-0 right-0 hover:bg-gray-200 rounded-full p-2' onClick={closeForm}><RxCross2 /></button>
            <div className='grid grid-cols-2 gap-x-8'>
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
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.firstName ? 'border-red-500' : ''}`}
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
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.lastName ? 'border-red-500' : ''}`}
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
                      readOnly={popup_data ? true : false}
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.email ? 'border-red-500' : ''}`}
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
                      readOnly={popup_data ? true : false}
                      autoComplete='username'
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.employeeID ? 'border-red-500' : ''}`}
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
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.password ? 'border-red-500' : ''}`}
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
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                  )}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaName">
                  Area Name
                </label>
                <Controller
                  name="areaName"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="areaName"
                      className={`w-full p-2 border rounded-md main-color-focus ${errors.areaName ? 'border-red-500' : ''}`}
                      onChange={(e) => {
                        field.onChange(e);
                        setShowFactoryName(!!e.target.value);
                        handleAreaChange(e)
                      }}
                    >
                      <option value="" disabled>
                        Select Area
                      </option>
                      {areas.map((area, index) => <option key={area.id} value={area.id}>{area.area_name}</option>)}

                    </select>
                  )}
                />
                {errors.areaName && <p className="text-red-500 text-xs italic">{errors.areaName.message}</p>}
              </div>


              {/* Factory Name Input (Conditionally Rendered) */}
              {showFactoryName && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="factoryName">
                    Factory Name
                  </label>
                  <Controller
                    name="factoryName"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="factoryName"
                        placeholder="Factory Name"
                        className={`w-full p-2 border rounded-md main-color-focus ${errors.factoryName ? 'border-red-500' : ''}`}
                      
                      >
                        <option value="" disabled>
                          Select Factory
                        </option>
                        {factories.map((factory) => (
                          <option key={factory.id} value={factory.id}>{factory.factory_name}</option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.factoryName && <p className="text-red-500 text-xs italic">{errors.factoryName.message}</p>}
                </div>

              )}



            </div>


            <div className="flex flex-row items-center justify-between gap-5">

              <button
                className="w-full main-color text-white p-2 rounded-md main-color-hover"
                type="submit">
                Save
              </button>

              <button
                className="w-full bg-transparent text-black border border-black p-2 rounded-md main-hover hover:text-white hover:border-transparent"
                type="reset" onClick={closeForm}>
                Cancel
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditFactoryIncharge
