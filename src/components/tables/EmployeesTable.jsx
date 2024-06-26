import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaSearch } from 'react-icons/fa';
import AnimatedIconButton from '../buttons/AnimatedIconButton';



const EmployeesTable = ({ tableSubheading, column_headings, data, addButtonText, onClick, addButtonIcon, buttonIconSize  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [records, setRecords] = useState(data);

    useEffect(() => {
        setRecords(data);
    }, [data]);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        const filteredData = data.filter(row => {
            //   const floorNumber = String(row.motorName);


            //   return floorNumber.toLowerCase().includes(newSearchTerm.toLowerCase());
            // });
            return column_headings.some(column => {
                const cellValue = String(column.selector ? column.selector(row) : '');
                return cellValue.toLowerCase().includes(newSearchTerm.toLowerCase());
            });
        });
        setRecords(filteredData);
    };

    return (
        <>
            {/* heading section */}
            <div className="flex flex-row justify-between w-[100%] mx-4 mt-8">
                <h1 className='mt-4 mb-4 main-font  text-2xl font-extrabold'>{tableSubheading}</h1>
                <div className="flex flex-row justify-between">
                    
                    {/* *******Add Employee Button***** */}
                    <AnimatedIconButton text={addButtonText} color='main-color' onClick={onClick}
                        icon={addButtonIcon} size={buttonIconSize} />

                    {/* Div to contain the search bar and the search Icon */}
                    <div className="flex flex-row justify-center items-center mr-8">
                        <div className="relative">
                            {/* Search Bar */}
                            <div className="relative w-60 mt-3 mb-3 ">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-full py-2 px-4 w-full transition-all duration-300 focus:outline-none main-color-focus"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />

                                {/* Search Icon */}
                                <div className="absolute right-0 top-0 mt-3 mr-4 text-gray-500">
                                    <FaSearch />
                                </div>
                            </div>

                            {/* Tooltip */}
                                <div className="absolute top-full mt-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Please enter a search term</div>
                        </div>
                    </div>
            </div>
        </div >

            <DataTable
                columns={column_headings}
                data={records}
                highlightOnHover
                pointerOnHover
                responsive
                pagination
                fixedHeader
                fixedHeaderScrollHeight='450px'
                // selectableRows
                selectableRowsHighlight
                customStyles={{
                    rows: {
                        style: {
                            fontSize: '14px',
                        },
                    },
                    headRow: {
                        style: {
                            fontSize: '16px',
                            // backgroundColor: '#DCDCDC'
                        },
                    },
                }}
            />
    </>
  );
}



export default EmployeesTable;

