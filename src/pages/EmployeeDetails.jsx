import React, { useState } from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Table, PopupForm } from '../components';
import { RiAddLine } from "react-icons/ri";
import AnimatedIconButton from '../components/buttons/AnimatedIconButton';
import { RiDeleteBinLine } from "react-icons/ri";
import EditFactoryIncharge from '../components/EditFactoryIncharge';
import EditFloorIncharge from '../components/EditFloorIncharge';


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
            cell: row => <div className='flex flex-row items-center gap-2'> <button className='main-color text-white font-semibold py-2 px-4 rounded main-color-hover' onClick={() =>
                setEditFactoryIncharge(true)
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
            cell: row => <div className='flex flex-row items-center gap-2'> <button className='main-color text-white font-semibold py-2 px-4 rounded main-color-hover' onClick={() =>
                setEditFloorIncharge(true)
            }>Edit</button>
                <button className='bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-400' onClick={() => alert("Deleted")}>Delete</button>

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
        <div className='ml-3 mr-5 mt-5'>
            {/* Factory Incharge Table section */}
            <div className='mt-5 mx-auto bg-white  rounded-xl w-[96%]'>
                <Table tableSubheading={'Factory Incharges Detail'} column_headings={factoryinchargeHeadings} data={factory_Incharge_data} />
                <div className='bg-white flex flex-row items-center justify-end mb-5 mr-5 gap-2 pb-5'>
                 
                    {/* *******Add Factory Incharge Button***** */}
                    <AnimatedIconButton text='Add Factory Incharge' color='main-color' onClick={() => setEditFactoryIncharge(true)}>
                        <RiAddLine size={23} />
                    </AnimatedIconButton>

                    {/* *******Delete Factory Incharge Button***** */}
                    <AnimatedIconButton text='Delete Factory Incharge' color='main-color' onClick={() => alert('Delete')}>
                        <RiDeleteBinLine size={20} />
                    </AnimatedIconButton>
                </div>
            </div>


            {/* Floor Incharge Table section */}
            <div className='mt-8 mx-auto bg-white rounded-xl w-[96%]'>
                <Table tableSubheading={'Floor Incharges Detail'} column_headings={floorinchargeHeadings} data={factory_Incharge_data} />
                <div className='bg-white flex flex-row items-center justify-end mb-5 mr-5 gap-2 pb-5'>
                 
                    {/* *******Add Floor Incharge Button***** */}
                    <AnimatedIconButton text='Add Floor Incharge' color='main-color' onClick={() => setEditFloorIncharge(true)}>
                        <RiAddLine size={23} />
                    </AnimatedIconButton>

                    {/* *******Delete Floor Incharge Button***** */}
                    <AnimatedIconButton text='Delete Floor Incharge' color='main-color' onClick={() => alert('Delete')}>
                        <RiDeleteBinLine size={20} />
                    </AnimatedIconButton>
                </div>
            </div>
            {
                isEditing &&
                <PopupForm closeForm={() => setIsEditing(false)} />
            }
            {
                editFactoryIncharge &&
                <EditFactoryIncharge closeForm={() => setEditFactoryIncharge(false)} />
            }
             {
                editFloorIncharge &&
                <EditFloorIncharge closeForm={() => setEditFloorIncharge(false)} />
            }

        </div>
    )
}

export default EmployeeDetails
