import React, { useState } from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Table, PopupForm } from '../components';
import { RiAddLine } from "react-icons/ri";

function EmployeeDetails() {

    const factory_Incharge_data = [
        {
            name: "Ali",
            factory: "agri Auto",
            Area: "Saddar",
            email: "email"
        }
    ]

    const factoryinchargeHeadings = [
        {
            name: 'Incharge Name',
            selector: row => row.inchargeName,
            sortable: true
        },
        {
            name: "Factory Name",
            selector: row => row.factoryName,
            sortable: true
        },
        {
            name: "Area Name",
            selector: row => row.areaName,
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
            selector: row => row.inchargeName,
            sortable: true
        },
        {
            name: 'Floor Number',
            selector: row => row.floorNumber,
            sortable: true
        },
        {
            name: "Factory Name",
            selector: row => row.factoryName,
            sortable: true
        },
        {
            name: "Area Name",
            selector: row => row.areaName,
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


    const handleEdit = () => {
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
    )
}

export default EmployeeDetails
