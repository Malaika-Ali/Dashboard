// import React, { useState } from 'react'
// import { FaArrowLeft } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import { ConfirmationModal } from '../components';
// import { SecondaryButton, PrimaryButton } from '../components/buttons'

// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import axios from 'axios';



// let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// function UserProfile(props) {
//     const token_data = props.user_details
//     const [open, setOpen] = useState(false);
//     const [isEditing, setisEditing] = useState(false)
//     const [firstName, setFirstName] = useState(token_data.first_name);
//     const [lastName, setLastName] = useState(token_data.last_name);
//     const [email, setEmail] = useState(token_data.email);
//     const [id, setId] = useState(token_data.employee_id);
//     const [password, setPassword] = useState(token_data.password);
//     const [role, setRole] = useState(token_data.role);
//     const [area, setarea] = useState("area")
//     const [factory, setfactory] = useState("factory")
//     const [floor, setfloor] = useState("1st")
//     const [confirmationModal, setconfirmationModal] = useState(false)


//     const position = props.user_details.role;

//     const handleSubmit = async (e) => {
//         // setconfirmationModal(true)
//         e.preventDefault();
//         if (isEditing){
//             let data = {first_name: firstName, last_name: lastName, password: password, employee_id: id};
//             await axios.post(
//                 API_URL + "user_profile_update",
//                 data,
//                 {
//                   headers: {
//                     'Content-type': 'multipart/form-data',
//                     "Access-Control-Allow-Origin": "*",
//                   }
//                 }
//               ).then((result) => {
//                 var item = JSON.parse(localStorage.getItem('token'));
//                 item.first_name = firstName
//                 item.last_name = lastName
//                 item.password = password
//                 localStorage.removeItem('token');
//                 localStorage.setItem('token', JSON.stringify(item));
//                 props.set_token(item)
//                 setOpen(false);
//                 alert(result.data);
//               }).catch(async (error) =>  {
//                 setOpen(false);
//                 alert(error.response.data);

//             })

//         }
//         setisEditing(!isEditing);
//     }

//     // for back button
//     const navigate = useNavigate();

//     const handleGoBack = () => {
//         navigate(-1);
//         // This will navigate back to the previous page in history
//     };

//     return (
//         <div>
//             <Backdrop
//                 sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                 open={open}
//             >
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//             <div className="flex flex-row mt-8 m-5 pl-14 gap-5" onClick={handleGoBack}>
//                 <FaArrowLeft className='h-8 w-8 cursor-pointer' />
//                 <h1 className='font-extrabold text-2xl tracking-tight   text-slate-900' >My Account</h1>
//             </div>

//             <form onSubmit={handleSubmit} className='flex  flex-col items-center justify-center'>
//                 <div className=' flex justify-between items-center  shadow-xl w-[30rem] card-color'>
//                     <table className='mt-5 mb-5 px-auto w-[32rem] ml-24'>
//                         <tbody>
//                             <tr>
//                                 <td className='py-2'>
//                                     <label className='text-left text-gray-400 font-medium text-lg'>First Name</label>
//                                 </td>
//                                 <td className='py-2'>
//                                     {isEditing ? (
//                                         <input
//                                             value={firstName}
//                                             className="border border-gray-500 p-2"
//                                             onChange={(e) => setFirstName(e.target.value)}
//                                         />
//                                     ) : (
//                                         <b className='text-gray-500'>{firstName}</b>
//                                     )}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className='py-2'>
//                                     <label className='text-left text-gray-400 font-medium text-lg'>Last Name</label>
//                                 </td>
//                                 <td className='py-2'>
//                                     {isEditing ? (
//                                         <input
//                                             className="border border-gray-500 p-2"
//                                             value={lastName}
//                                             onChange={(e) => setLastName(e.target.value)}
//                                         />
//                                     ) : (
//                                         <b className='text-gray-500'>{lastName}</b>
//                                     )}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className='py-2'>
//                                     <label className='text-left text-gray-400 font-medium text-lg'>Email Address</label>
//                                 </td>
//                                 <td className='py-2'>
//                                     {isEditing ? (
//                                         <input
//                                             className="border border-gray-500 p-2"
//                                             value={email}
//                                             readOnly={true}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                         />
//                                     ) : (
//                                         <b className='text-gray-500'>{email}</b>
//                                     )}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className='py-2'>
//                                     <label className='text-left text-gray-400 font-medium text-lg'>Employee ID</label>
//                                 </td>
//                                 <td className='py-2'>
//                                     {isEditing ? (
//                                         <input
//                                             className="border border-gray-500 p-2"
//                                             value={id}
//                                             readOnly={true}
//                                             onChange={(e) => setId(e.target.value)}
//                                         />
//                                     ) : (
//                                         <b className='text-gray-500'>{id}</b>
//                                     )}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className='py-2'>
//                                     <label className='text-left text-gray-400 font-medium text-lg'>Password</label>
//                                 </td>
//                                 <td className='py-2'>
//                                     {isEditing ? (
//                                         <input
//                                             className="border border-gray-500 p-2"
//                                             type='password'
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                         />
//                                     ) : (
//                                         <b className='text-gray-500'>{password}</b>
//                                     )}
//                                 </td>
//                             </tr>

//                             {/* <tr>
//                                 <td className='py-2'>
//                                     <label className='text-left text-gray-400 font-medium text-lg'>Role</label>
//                                 </td>
//                                 <td className='py-2'>
//                                     {isEditing ? (
//                                         // <div>
//                                         //     <input
//                                         //         type='radio'
//                                         //         id='adminRole'
//                                         //         name='userRole'
//                                         //         value={role}
//                                         //         checked={role === 'admin'}
//                                         //         onChange={() => setRole('Admin')}
//                                         //     />
//                                         //     <label htmlFor='adminRole'
//                                         //         className='mr-3'>Admin</label>

//                                         //     <input
//                                         //         type='radio'
//                                         //         id='factoryInchargeRole'
//                                         //         name='userRole'
//                                         //         value='Factory Incharge'
//                                         //         checked={role === 'Factory Incharge'}
//                                         //         onChange={() => setRole('Factory Incharge')}
//                                         //     />
//                                         //     <label htmlFor='factoryInchargeRole' className='mr-3'>Factory Incharge</label>

//                                         //     <input
//                                         //         type='radio'
//                                         //         id='floorInchargeRole'
//                                         //         name='userRole'
//                                         //         value='Floor Incharge'
//                                         //         checked={role === 'Floor Incharge'}
//                                         //         onChange={() => setRole('Floor Incharge')}
//                                         //     />
//                                         //     <label htmlFor='floorInchargeRole'>Floor Incharge</label>
//                                         </div>
//                                     ) : (
//                                         <b className='text-gray-500'>{role}</b>
//                                     )}
//                                 </td>
//                             </tr> */}


//                             {/* Conditionally rendering extra rows based on the position variable */}
//                             {position === 'factoryIncharge' && (
//                                 <>
//                                     <tr>
//                                         <td className='py-2'>
//                                             <label className='text-left text-gray-400 font-medium text-lg'>Area Name</label>
//                                         </td>
//                                         <td className='py-2'>
//                                             {isEditing ? (
//                                                 <input
//                                                     value={area}
//                                                     className="border border-gray-500 p-2"
//                                                     readOnly={true}
//                                                     onChange={(e) => setarea(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <b className='text-gray-500'>{area}</b>
//                                             )}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className='py-2'>
//                                             <label className='text-left text-gray-400 font-medium text-lg'>Factory Name</label>
//                                         </td>
//                                         <td className='py-2'>
//                                             {isEditing ? (
//                                                 <input
//                                                     value={factory}
//                                                     className="border border-gray-500 p-2"
//                                                     readOnly={true}
//                                                     onChange={(e) => setfactory(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <b className='text-gray-500'>{factory}</b>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 </>
//                             )}

//                             {position === 'floorIncharge' && (
//                                 <>
//                                     <tr>
//                                         <td className='py-2'>
//                                             <label className='text-left text-gray-400 font-medium text-lg'>Area Name</label>
//                                         </td>
//                                         <td className='py-2'>
//                                             {isEditing ? (
//                                                 <input
//                                                     value={area}
//                                                     className="border border-gray-500 p-2"
//                                                     readOnly={true}
//                                                     onChange={(e) => setarea(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <b className='text-gray-500'>{area}</b>
//                                             )}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className='py-2'>
//                                             <label className='text-left text-gray-400 font-medium text-lg'>Factory Name</label>
//                                         </td>
//                                         <td className='py-2'>
//                                             {isEditing ? (
//                                                 <input
//                                                     value={factory}
//                                                     readOnly={true}
//                                                     className="border border-gray-500 p-2"
//                                                     onChange={(e) => setfactory(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <b className='text-gray-500'>{factory}</b>
//                                             )}
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className='py-2'>
//                                             <label className='text-left text-gray-400 font-medium text-lg'>Floor Name</label>
//                                         </td>
//                                         <td className='py-2'>
//                                             {isEditing ? (
//                                                 <input
//                                                     value={floor}
//                                                     readOnly={true}
//                                                     className="border border-gray-500 p-2"
//                                                     onChange={(e) => setfloor(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <b className='text-gray-500'>{floor}</b>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 </>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className='flex flex-row items-center justify-between mt-8 gap-5'>
//                     <button
//                         className="main-color text-white p-2 rounded-md main-color-hover w-16"
//                         type="submit"
//                     >
//                         {isEditing ? "Save" : "Edit"}
//                     </button>

//                     {
//                         isEditing ?
//                             <SecondaryButton SecondaryButtonText='Cancel' onClick={() => setisEditing(false)}/> :
//                             <SecondaryButton SecondaryButtonText='Delete' onClick={() => setconfirmationModal(true)} />
//                     }
//                 </div>
//             </form>

//             {
//                 confirmationModal &&
//                 <ConfirmationModal closeConfirmation={() => setconfirmationModal(false)} user_name={token_data.employee_id}/>
//             }

//         </div>
//     )
// }

// export default UserProfile











import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../components';
import { SecondaryButton, PrimaryButton } from '../components/buttons';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

let API_URL = 'https://fyp-motors.srv462183.hstgr.cloud/';

function UserProfile(props) {
    const token_data = props.user_details;
    const [open, setOpen] = useState(false);
    const [isEditing, setisEditing] = useState(false);
    const [firstName, setFirstName] = useState(token_data.first_name);
    const [lastName, setLastName] = useState(token_data.last_name);
    const [email, setEmail] = useState(token_data.email);
    const [id, setId] = useState(token_data.employee_id);
    const [password, setPassword] = useState(token_data.password);
    const [role, setRole] = useState(token_data.role);
    const [area, setArea] = useState('area');
    const [factory, setFactory] = useState('factory');
    const [floor, setFloor] = useState('1st');
    const [confirmationModal, setConfirmationModal] = useState(false);

    const position = props.user_details.role;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            let data = { first_name: firstName, last_name: lastName, password: password, employee_id: id };
            await axios
                .post(
                    API_URL + 'user_profile_update',
                    data,
                    {
                        headers: {
                            'Content-type': 'multipart/form-data',
                            'Access-Control-Allow-Origin': '*',
                        },
                    }
                )
                .then((result) => {
                    var item = JSON.parse(localStorage.getItem('token'));
                    item.first_name = firstName;
                    item.last_name = lastName;
                    item.password = password;
                    localStorage.removeItem('token');
                    localStorage.setItem('token', JSON.stringify(item));
                    props.set_token(item);
                    setOpen(false);
                    alert(result.data);
                })
                .catch(async (error) => {
                    setOpen(false);
                    alert(error.response.data);
                });
        }
        setisEditing(!isEditing);
    };

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg flex flex-col items-center justify-center ml-44 mt-10 mb-14">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="px-4 py-5 sm:px-6 mr-20">
                <div className="flex flex-row mt-8 m-5 pl-14 gap-5" onClick={handleGoBack}>
                    <FaArrowLeft className="h-8 w-8 cursor-pointer" />
                    <h1 className="font-extrabold text-2xl tracking-tight text-slate-900">My Account</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">First Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        value={firstName}
                                        className="border border-gray-500 p-2 w-full"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                ) : (
                                    <b className="text-gray-500">{firstName}</b>
                                )}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        value={lastName}
                                        className="border border-gray-500 p-2 w-full"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                ) : (
                                    <b className="text-gray-500">{lastName}</b>
                                )}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        value={email}
                                        readOnly={true}
                                        className="border border-gray-500 p-2 w-full"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                ) : (
                                    <b className="text-gray-500">{email}</b>
                                )}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        value={id}
                                        readOnly={true}
                                        className="border border-gray-500 p-2 w-full"
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                ) : (
                                    <b className="text-gray-500">{id}</b>
                                )}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Password</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        type="password"
                                        value={password}
                                        className="border border-gray-500 p-2 w-full"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                ) : (
                                    <b className="text-gray-500">{password}</b>
                                )}
                            </dd>
                        </div>

                        {position === 'factoryIncharge' && (
                            <>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Area Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                value={area}
                                                readOnly={true}
                                                className="border border-gray-500 p-2 w-full"
                                                onChange={(e) => setArea(e.target.value)}
                                            />
                                        ) : (
                                            <b className="text-gray-500">{area}</b>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Factory Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                value={factory}
                                                readOnly={true}
                                                className="border border-gray-500 p-2 w-full"
                                                onChange={(e) => setFactory(e.target.value)}
                                            />
                                        ) : (
                                            <b className="text-gray-500">{factory}</b>
                                        )}
                                    </dd>
                                </div>
                            </>
                        )}

                        {position === 'floorIncharge' && (
                            <>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Area Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                value={area}
                                                readOnly={true}
                                                className="border border-gray-500 p-2 w-full"
                                                onChange={(e) => setArea(e.target.value)}
                                            />
                                        ) : (
                                            <b className="text-gray-500">{area}</b>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Factory Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                value={factory}
                                                readOnly={true}
                                                className="border border-gray-500 p-2 w-full"
                                                onChange={(e) => setFactory(e.target.value)}
                                            />
                                        ) : (
                                            <b className="text-gray-500">{factory}</b>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Floor Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                value={floor}
                                                readOnly={true}
                                                className="border border-gray-500 p-2 w-full"
                                                onChange={(e) => setFloor(e.target.value)}
                                            />
                                        ) : (
                                            <b className="text-gray-500">{floor}</b>
                                        )}
                                    </dd>
                                </div>
                            </>
                        )}
                    </dl>
                </div>

                <div className='flex flex-row items-center justify-between mt-8 gap-5 mb-5'>
                    <button
                        className="main-color text-white p-2 rounded-md main-color-hover w-16"
                        type="submit"
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>

                    {
                        isEditing ?
                            <SecondaryButton SecondaryButtonText='Cancel' onClick={() => setisEditing(false)} /> :
                            <SecondaryButton SecondaryButtonText='Delete' onClick={() => setConfirmationModal(true)} user_name={token_data.employee_id} />
                    }
                </div>
            </form>

            {
                confirmationModal &&
                <ConfirmationModal closeConfirmation={() => setConfirmationModal(false)} />
            }

        </div>
    )
}

export default UserProfile