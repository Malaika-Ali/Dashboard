import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";

const LoginPage = (props) => {
  const navigate = useNavigate();
  

  const { handleSubmit, control, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if(props.user_details){

      if(props.user_details.role==='admin'){
        navigate("/adminHomePage");
      }
      else if(props.user_details.role==='factoryIncharge'){
        navigate("/factoryInchargeHome");
      }
      else if(props.user_details.role==='floorIncharge'){
        navigate("/floorInchargeHomePage");
      }
    }

    // Clear the form after the page is loaded
    reset({
      email: '',
      password: '',
    });
    // eslint-disable-next-line
  }, [navigate, props.user_details]); // Empty dependency array ensures this effect runs only once
  const [open, setOpen] = useState(false);
  const onSubmit =async (data) => {
    // Handle login logic here
    // console.log(data);
    setOpen(true);
    const dat = { 'email': data.email, 'password': data.password};

    await axios.post(
      API_URL + "signin_user",
      dat,
      {
        headers: {
          'Content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        }
      }
    ).then((result) => {
      // setOpen(false);
      // alert('Success');
      // navigate('/');
      // console.log("result", result);
      let data = Object.fromEntries(Object.entries(result.data).filter(([_, v]) => v != null));
      // console.log(data);
      localStorage.setItem('token', JSON.stringify(data));
      props.set_token(data);
      setOpen(false);
      if(data.role==='admin'){
        navigate("/adminHomePage");
      }
      else if(data.role==='factoryIncharge'){
        navigate("/factoryInchargeHome");
      }
      if(data.role==='floorIncharge'){
        navigate("/floorInchargeHomePage");
      }

    }).catch(async (error) =>  {
      setOpen(false);
      alert(error.response.data);
      // Reset the form fields
      await reset({
        email: '',
        password: '',
      });
      
    })

    // <Link to="/signuppage"></Link>

    // Reset the form fields
    // await reset({
    //   email: '',
    //   password: '',
    // });
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
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="malaika.baig@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                  )}
                </>
              )}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password is required',
                // minLength: {
                //   value: 6,
                //   message: 'Password must be at least 6 characters long',
                // },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    className={`w-full p-2 border rounded-md focus:outline-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="********"
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                  )}
                </>
              )}
            />
          </div>
          {/* <Link to="/adminHomePage"> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
          {/* </Link> */}
          <span className='text-center mt-4'>
            Not registered on our platform yet?
            <Link to="/signuppage"><span className='text-blue-900 mx-auto text-center'> Register Now </span></Link>
          </span>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
