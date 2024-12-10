import React, { useState, useEffect, useContext } from 'react'
import { PopupForm } from '../components';
import Table from '../components/tables/Table'

import { RiAddLine } from "react-icons/ri";
import AnimatedIconButton from '../components/buttons/AnimatedIconButton';
import EditFactoryIncharge from '../components/EditFactoryIncharge';
import EditFloorIncharge from '../components/EditFloorIncharge';
import { StateContext } from '../contexts/ContextProvider';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";


import axios from 'axios';
import SecondNavbar from '../components/SecondNavbar';

// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_API_URL;

function Employees() {
    const [open, setOpen] = useState(false);
    const [factory_Incharge_data, setFactoryInchargeData] = useState([]);
    const [floor_Incharge_data, setFloorInchargeData] = useState([]);
    const [edit_data, setEditData] = useState([]);
    const [areas, setAreas] = useState([])
    const [factories, setFactories] = useState([])
    // state to handle loading of page
    const { loading, setLoading } = useContext(StateContext);

    async function fetch_data() {

        await axios.get(
            API_URL + "get_factory_and_floor_incharge_details",
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        ).then((result) => {
            setLoading(false)
            setFactoryInchargeData(result.data.factory_incharge_data);
            setFloorInchargeData(result.data.floor_incharge_data);
            setAreas(result.data.areas)
            setFactories(result.data.factories)
        }).catch(async (error) => {
            setLoading(true);
            alert(error.response.data);
        })

    }



    async function deleteData(row) {
        setOpen(true);
        if (row.role == "floorIncharge") {
            await axios.post(
                API_URL + "delete_floor_incharge",
                { employeeID: row.employee_id },
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                    }
                }
            ).then((result) => {
                setLoading(false)
                setFloorInchargeData(result.data);
            }).catch(async (error) => {
                setLoading(true)
                alert(error.response.data);
            })
        }

        else if (row.role == "factoryIncharge") {
            await axios.post(
                API_URL + "delete_factory_incharge", { employeeID: row.employee_id },
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                    }
                }
            ).then((result) => {
                // setOpen(false);
                setLoading(false)
                setFactoryInchargeData(result.data);
            }).catch(async (error) => {
                // setOpen(false);
                setLoading(true)
                alert(error.response.data);
            })
        }


    }



    useEffect(() => {
        // setOpen(true);
        setLoading(false)
        fetch_data()
    }, []);

    const factoryinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.first_name + " " + row.last_name,
            sortable: true,
            center: true
        },
        {
            name: "Factory Name",
            selector: row => row.factory_name,
            sortable: true,
            center: true,
        },
        {
            name: "Area Name",
            selector: row => row.area_name,
            sortable: true,
            center: true,
        },
        {
            name: "Action",
            center: true,
            cell: row =>
                <div className='flex flex-row items-center gap-2'>
                    <button className='flex justify-center items-center border border-1 border-secondary-color text-white font-semibold p-2 rounded-full hover:bg-secondary-color group' onClick={() => { setEditData(row); setEditFactoryIncharge(true) }
                    }><MdEdit className='text-secondary-color group-hover:text-white transition-all duration-200' /></button>

                    <button className='flex justify-center items-center border border-1 border-red-500 text-white font-semibold p-2 rounded-full hover:bg-red-500 group' onClick={() => { deleteData(row) }}><RiDeleteBin6Line className='text-red-500 group-hover:text-white transition-all duration-200' /></button>

                </div>
        }
    ];

    const floorinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.first_name + " " + row.last_name,
            sortable: true,
            center: true,
        },
        {
            name: 'Floor Number',
            selector: row => row.floor_number,
            sortable: true,
            center: true,
        },
        {
            name: "Factory Name",
            selector: row => row.factory_name,
            sortable: true,
            center: true,
        },
        {
            name: "Area Name",
            selector: row => row.area_name,
            sortable: true,
            center: true,
        },
        {
            name: "Action",
            center: true,
            cell: row =>
                <div className='flex flex-row items-center gap-2'>
                    <button className='flex justify-center items-center border border-1 border-secondary-color text-white font-semibold p-2 rounded-full hover:bg-secondary-color group' onClick={() => { setEditData(row); setEditFloorIncharge(true) }
                    }><MdEdit className='text-secondary-color group-hover:text-white transition-all duration-200' /></button>

                    <button className='flex justify-center items-center border border-1 border-red-500 text-white font-semibold p-2 rounded-full hover:bg-red-500 group' onClick={() => { deleteData(row) }}><RiDeleteBin6Line className='text-red-500 group-hover:text-white transition-all duration-200' /></button>

                </div>
        }
    ];

    const [isEditing, setIsEditing] = useState(false)

    const [editFactoryIncharge, setEditFactoryIncharge] = useState(false)

    const [editFloorIncharge, setEditFloorIncharge] = useState(false)


    const handleEdit = () => {
        setIsEditing(true)
    }

    return (
        <div>

            {/* *********Div To Show Page Name**************** */}
            <div className='px-2 lg:px-3.5 my-6'>
                <SecondNavbar pageName='Employees' />
            </div>


            {/* Factory Incharge Table section */}
            <div className='mt-5 mx-auto bg-white  rounded-xl w-[96%]'>
                <Table tableSubheading={'Factory Incharges Detail'} column_headings={factoryinchargeHeadings} data={factory_Incharge_data}
                />
                <div className='bg-white flex flex-row items-center justify-end mb-5 mr-5 gap-2 pb-5'>

                    {/* *******Add Factory Incharge Button***** */}
                    <AnimatedIconButton text='Add Factory Incharge' color='main-color' onClick={() => {
                        setEditData(); setEditFactoryIncharge(true)
                    }}>
                        <RiAddLine size={23} />
                    </AnimatedIconButton>
                </div>
            </div>


            {/* Floor Incharge Table section */}
            <div className='mt-8 mx-auto bg-white rounded-xl w-[96%]'>
                <Table tableSubheading={'Floor Incharges Detail'} column_headings={floorinchargeHeadings} data={floor_Incharge_data} />
                <div className='bg-white flex flex-row items-center justify-end mb-5 mr-5 gap-2 pb-5'>

                    {/* *******Add Floor Incharge Button***** */}
                    <AnimatedIconButton text='Add Floor Incharge' color='main-color' onClick={() => { setEditData(); setEditFloorIncharge(true) }}>
                        <RiAddLine size={23} />
                    </AnimatedIconButton>
                </div>
            </div>
            {
                isEditing &&
                <PopupForm closeForm={() => setIsEditing(false)} />
            }
            {
                editFactoryIncharge &&
                <EditFactoryIncharge closeForm={() => setEditFactoryIncharge(false)} popup_data={edit_data}
                    factory_data_update={setFactoryInchargeData}
                    areas={areas} factories={factories} />
            }
            {
                editFloorIncharge &&
                <EditFloorIncharge closeForm={() => setEditFloorIncharge(false)} popup_data={edit_data}
                    floor_data_update={setFloorInchargeData}
                    areas={areas} />
            }

        </div>
    )
}

export default Employees