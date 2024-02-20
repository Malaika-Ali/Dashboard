import React, { useState, useEffect } from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Table, PopupForm } from '../components';
import { RiAddLine } from "react-icons/ri";

let API_URL = "http://localhost:5001/";
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
    
      useEffect(() => {
        setOpen(true);
        fetch_data()
      }, []);

    // const factory_Incharge_data = [
    //     {
    //         name: "Ali",
    //         factory: "agri Auto",
    //         Area: "Saddar",
    //         email: "email"
    //     }
    // ]

    const factoryinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.first_name +" "+row.last_name,
            sortable: true
        },
        {
            name: "Factory Name",
            selector: row => row.factory_name,
            sortable: true
        },
        {
            name: "Area Name",
            selector: row => row.area_name,
            sortable: true
        },
        {
            name: "Action",
            cell: row => <div className='flex flex-row items-center gap-2'> <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-400' onClick={() =>
                handleEdit()
            }>Edit</button>
                <button className='bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-400' onClick={() => alert("Deleted")}>Delete</button>

            </div>
        }
    ];

    const floorinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.first_name +" "+row.last_name,
            sortable: true
        },
        {
            name: 'Floor Number',
            selector: row => row.floor_number,
            sortable: true
        },
        {
            name: "Factory Name",
            selector: row => row.factory_name,
            sortable: true
        },
        {
            name: "Area Name",
            selector: row => row.area_name,
            sortable: true
        },
        {
            name: "Action",
            cell: row => <div className='flex flex-row items-center gap-2'> <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-400' onClick={() =>
                handleEdit()
            }>Edit</button>
                <button className='bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-400' onClick={() => alert("Deleted")}>Delete</button>

            </div>
        }
    ];

    const [isEditing, setIsEditing] = useState(false)

    const [editFactoryIncharge, setEditFactoryIncharge] = useState(false)

    const [editFloorIncharge, setEditFloorIncharge] = useState(false)


    const handleEdit = (data) => {
        setEditData(data)
        setIsEditing(true)
    }

    return (
        <div className='ml-3 mr-5 mt-5'>
            {/* Factory Incharge Table section */}
            <div className='mt-5 mx-auto bg-slate-200  rounded-xl w-[96%]'>
                <Table tableSubheading={'Factory Incharges Detail'} column_headings={factoryinchargeHeadings} data={factory_Incharge_data} />
                <div className='bg-white'>
                    <button
                        className="bg-blue-500 w-40 text-white p-2 rounded-md hover:bg-blue-600 flex flex-row items-center justify-center ml-auto" onClick={() => setIsEditing(true)}><RiAddLine />
                        Add Employee
                    </button>
                </div>
            </div>


            {/* Floor Incharge Table section */}
            <div className='mt-8 mx-auto bg-slate-200 rounded-xl w-[96%]'>
                <Table tableSubheading={'Floor Incharges Detail'} column_headings={floorinchargeHeadings} data={factory_Incharge_data} />
                <div className='bg-white'>
                    <button
                        className="bg-blue-500 w-40 text-white p-2 rounded-md hover:bg-blue-600 flex flex-row items-center justify-center ml-auto" onClick={() => setIsEditing(true)}><RiAddLine />
                        Add Employee
                    </button>
                </div>
            </div>
            {
                isEditing &&
                <PopupForm closeForm={() => setIsEditing(false)} />
            }

            </div>
        </>
    )
}

export default EmployeeDetails
