import React from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Table } from '../components';

function EmployeeDetails() {

    const factory_Incharge_headings = [
        {
            name: 'Incharge Name',
            selector: row => row.motorName,
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
            name: "Email Address",
            selector: row => row.emailaddress,
            sortable: true
        },
    ];

    const factory_Incharge_data = [
        {
            name: "Ali",
            factory: "agri Auto",
            Area: "Saddar",
            email: "email"
        }
    ]


    return (
        <>
            {/* Factory Incharge Table section */}
            <div className='mt-5 mx-auto bg-slate-200 rounded-xl w-[96%]'>
                <Table tableSubheading={'Factory Incharges Detail'} column_headings={factory_Incharge_headings} data={factory_Incharge_data} />
            </div>

            {/* Floor Incharge Table section */}
            <div className='mt-5 mx-auto bg-slate-200 rounded-xl w-[96%]'>
                <Table tableSubheading={'Floor Incharges Detail'} column_headings={factory_Incharge_headings} data={factory_Incharge_data} />
            </div>
        </>
    )
}

export default EmployeeDetails
