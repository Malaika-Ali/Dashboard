import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


function UserProfile() {

    const [isEditing, setisEditing] = useState(false)
    const [firstName, setFirstName] = useState("AJ")
    const [lastName, setLastName] = useState("Lee")
    const [email, setEmail] = useState("ajlee@gmail.com")
    const [id, setId] = useState("16")
    const [password, setPassword] = useState("pass")
    const [role, setrole] = useState("admin")
    const [area, setarea] = useState("area")
    const [factory, setfactory] = useState("factory")
    const [floor, setfloor] = useState("1st")

    const handleSubmit = (e) => {
        e.preventDefault();
        setisEditing(!isEditing);
    }

    const position = "admin";

    // for back button
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
        // This will navigate back to the previous page in history
      };

    return (
        <>
            <div className="flex flex-row mt-8 m-5 pl-14 gap-5" onClick={handleGoBack}>
                <FaArrowLeft className='h-8 w-8 cursor-pointer' />
                <h1 className='font-extrabold text-2xl tracking-tight   text-slate-900' >My Account</h1>
            </div>

            {/* <div className='flex flex-col justify-center items-center rounded gap-2 mt-10 w-96'> */}

            <form onSubmit={handleSubmit}>


                <table className='mt-10 w-96 mx-auto'>
                    <tbody>
                        <tr>
                            <td className='py-2'>
                                <label className='text-left text-gray-400 font-medium text-lg'>First Name</label>
                            </td>
                            <td className='py-2'>
                                {isEditing ? (
                                    <input
                                        value={firstName}
                                        className="border border-gray-500 p-2 "
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                ) : (
                                    <b className='text-gray-500'>{firstName}</b>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2'>
                                <label className='text-left text-gray-400 font-medium text-lg'>Last Name</label>
                            </td>
                            <td className='py-2'>
                                {isEditing ? (
                                    <input
                                        className="border border-gray-500 p-2"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                ) : (
                                    <b className='text-gray-500'>{lastName}</b>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2'>
                                <label className='text-left text-gray-400 font-medium text-lg'>Email Address</label>
                            </td>
                            <td className='py-2'>
                                {isEditing ? (
                                    <input
                                        className="border border-gray-500 p-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                ) : (
                                    <b className='text-gray-500'>{email}</b>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2'>
                                <label className='text-left text-gray-400 font-medium text-lg'>Employee ID</label>
                            </td>
                            <td className='py-2'>
                                {isEditing ? (
                                    <input
                                        className="border border-gray-500 p-2"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                ) : (
                                    <b className='text-gray-500'>{id}</b>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className='py-2'>
                                <label className='text-left text-gray-400 font-medium text-lg'>Password</label>
                            </td>
                            <td className='py-2'>
                                {isEditing ? (
                                    <input
                                        className="border border-gray-500 p-2"
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                ) : (
                                    <b className='text-gray-500'>{password}</b>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className='py-2'>
                                <label className='text-left text-gray-400 font-medium text-lg'>Role</label>
                            </td>
                            <td className='py-2'>
                                {isEditing ? (
                                    <input
                                        className="border border-gray-500 p-2"
                                        type='password'
                                        value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                    />
                                ) : (
                                    <b className='text-gray-500'>{role}</b>
                                )}
                            </td>
                        </tr>




                        {/* Conditionally rendering extra rows based on the position variable */}
                        {position === 'factoryIncharge' && (
                            <>
                                <tr>
                                    <td className='py-2'>
                                        <label className='text-left text-gray-400 font-medium text-lg'>Area Name</label>
                                    </td>
                                    <td className='py-2'>
                                        {isEditing ? (
                                            <input
                                                value={area}
                                                className="border border-gray-500 p-2"
                                                onChange={(e) => setarea(e.target.value)}
                                            />
                                        ) : (
                                            <b className='text-gray-500'>{area}</b>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>
                                        <label className='text-left text-gray-400 font-medium text-lg'>Factory Name</label>
                                    </td>
                                    <td className='py-2'>
                                        {isEditing ? (
                                            <input
                                                value={factory}
                                                className="border border-gray-500 p-2"
                                                onChange={(e) => setfactory(e.target.value)}
                                            />
                                        ) : (
                                            <b className='text-gray-500'>{factory}</b>
                                        )}
                                    </td>
                                </tr>
                            </>
                        )}

                        {position === 'floorIncharge' && (
                            <>
                                <tr>
                                    <td className='py-2'>
                                        <label className='text-left text-gray-400 font-medium text-lg'>Area Name</label>
                                    </td>
                                    <td className='py-2'>
                                        {isEditing ? (
                                            <input
                                                value={area}
                                                className="border border-gray-500 p-2"
                                                onChange={(e) => setarea(e.target.value)}
                                            />
                                        ) : (
                                            <b className='text-gray-500'>{area}</b>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>
                                        <label className='text-left text-gray-400 font-medium text-lg'>Factory Name</label>
                                    </td>
                                    <td className='py-2'>
                                        {isEditing ? (
                                            <input
                                                value={factory}
                                                className="border border-gray-500 p-2"
                                                onChange={(e) => setfactory(e.target.value)}
                                            />
                                        ) : (
                                            <b className='text-gray-500'>{factory}</b>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-2'>
                                        <label className='text-left text-gray-400 font-medium text-lg'>Floor Name</label>
                                    </td>
                                    <td className='py-2'>
                                        {isEditing ? (
                                            <input
                                                value={floor}
                                                className="border border-gray-500 p-2"
                                                onChange={(e) => setfloor(e.target.value)}
                                            />
                                        ) : (
                                            <b className='text-gray-500'>{floor}</b>
                                        )}
                                    </td>
                                </tr>
                            </>
                        )}









                        <tr>
                            <td className='py-5'>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-16"
                                    type="submit"
                                >
                                    {isEditing ? "Save" : "Edit"}
                                </button>
                            </td>
                            <td className='py-5'>
                                <button
                                    className=" border border-black bg-transparent text-black p-2 rounded-md hover:bg-blue-500 hover:text-white hover:border-transparent w-16"
                                    type="reset"
                                >
                                    {isEditing ? "Cancel" : "Delete"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {/* </div> */}
        </>
    )
}

export default UserProfile
