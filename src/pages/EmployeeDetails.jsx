import React, { useState, useEffect} from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Table, PopupForm } from '../components';
import { RiAddLine } from "react-icons/ri";
import AnimatedIconButton from '../components/buttons/AnimatedIconButton';
import { RiDeleteBinLine } from "react-icons/ri";
import EditFactoryIncharge from '../components/EditFactoryIncharge';
import EditFloorIncharge from '../components/EditFloorIncharge';

import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
function EmployeeDetails() {
    const [open, setOpen] = useState(false);
    const [factory_Incharge_data, setFactoryInchargeData] = useState([]);
    const [floor_Incharge_data, setFloorInchargeData] = useState([]);
    const [edit_data, setEditData] = useState([]);

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
            console.log(result.data);
            setOpen(false);
            setFactoryInchargeData(result.data.factory_incharge_data);
            setFloorInchargeData(result.data.floor_incharge_data);
        }).catch(async (error) => {
          setOpen(false);
          alert(error.response.data);
        })
    
    }

    async function deleteData(row) {
        setOpen(true);
        console.log(row);
        if (row.role == "floorIncharge"){
            await axios.post(
                API_URL + "delete_floor_incharge",
                {employeeID: row.employee_id},
                {
                  headers: {
                    'Content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                  }
                }
              ).then((result) => {
                  setOpen(false);
                  setFloorInchargeData(result.data);
              }).catch(async (error) => {
                setOpen(false);
                alert(error.response.data);
            })
        }
        
        else if (row.role == "factoryIncharge"){
            await axios.post(
                API_URL + "delete_factory_incharge", {employeeID: row.employee_id},
                {
                  headers: {
                    'Content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*",
                  }
                }
              ).then((result) => {
                  setOpen(false);
                  setFactoryInchargeData(result.data);
              }).catch(async (error) => {
                setOpen(false);
                alert(error.response.data);
            })
        }
        
    
    }
    
    

    useEffect(() => {
        setOpen(true);
        fetch_data()
    }, []);

      


    const factoryinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.first_name +" "+row.last_name,
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
            cell: row => <div className='flex flex-row items-center gap-2'> <button className='main-color text-white font-semibold py-2 px-4 rounded main-color-hover' onClick={() =>
                {setEditData(row); setEditFactoryIncharge(true)}
            }>Edit</button>
                <button className='bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-400' onClick={() => {deleteData(row)}}>Delete</button>

            </div>
        }
    ];

    const floorinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.first_name +" "+row.last_name,
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
            cell: row => <div className='flex flex-row items-center gap-2'> <button className='main-color text-white font-semibold py-2 px-4 rounded main-color-hover' onClick={() =>
                {setEditData(row); setEditFloorIncharge(true)}
            }>Edit</button>
                <button className='bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-400' onClick={() => {deleteData(row)}}>Delete</button>

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
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        <div className='ml-3 mr-5 mt-5'>
            {/* Factory Incharge Table section */}
            <div className='mt-5 mx-auto bg-white  rounded-xl w-[96%]'>
                <Table tableSubheading={'Factory Incharges Detail'} column_headings={factoryinchargeHeadings} data={factory_Incharge_data} />
                <div className='bg-white flex flex-row items-center justify-end mb-5 mr-5 gap-2 pb-5'>
                 
                    {/* *******Add Factory Incharge Button***** */}
                    <AnimatedIconButton text='Add Factory Incharge' color='main-color' onClick={() => {
                        setEditData(); setEditFactoryIncharge(true)}}>
                        <RiAddLine size={23} />
                    </AnimatedIconButton>

                    {/* *******Delete Factory Incharge Button***** */}
                    {/* <AnimatedIconButton text='Delete Factory Incharge' color='main-color' onClick={() => alert('Delete')}>
                        <RiDeleteBinLine size={20} />
                    </AnimatedIconButton> */}
                </div>
            </div>


            {/* Floor Incharge Table section */}
            <div className='mt-8 mx-auto bg-white rounded-xl w-[96%]'>
                <Table tableSubheading={'Floor Incharges Detail'} column_headings={floorinchargeHeadings} data={floor_Incharge_data} />
                <div className='bg-white flex flex-row items-center justify-end mb-5 mr-5 gap-2 pb-5'>
                 
                    {/* *******Add Floor Incharge Button***** */}
                    <AnimatedIconButton text='Add Floor Incharge' color='main-color' onClick={() => {setEditData(); setEditFloorIncharge(true)}}>
                        <RiAddLine size={23} />
                    </AnimatedIconButton>

                    {/* *******Delete Floor Incharge Button***** */}
                    {/* <AnimatedIconButton text='Delete Floor Incharge' color='main-color' onClick={() => alert('Delete')}>
                        <RiDeleteBinLine size={20} />
                    </AnimatedIconButton> */}
                </div>
            </div>
            {
                isEditing &&
                <PopupForm closeForm={() => setIsEditing(false)}  />
            }
            {
                editFactoryIncharge &&
                <EditFactoryIncharge closeForm={() => setEditFactoryIncharge(false)} popup_data={edit_data} 
                factory_data_update={setFactoryInchargeData} />
            }
             {
                editFloorIncharge &&
                <EditFloorIncharge closeForm={() => setEditFloorIncharge(false)}  popup_data={edit_data} 
                floor_data_update={setFloorInchargeData} />
            }

        </div>
    </>
    )
}

export default EmployeeDetails