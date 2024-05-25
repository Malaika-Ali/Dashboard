import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types'; // Import PropTypes


const Table = ({ tableSubheading, column_headings, data }) => {
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
      <div className="flex flex-row justify-between w-[100%] mx-8 mt-[1.5rem] mb-4">
        <h1 className='main-font mt-[1.5rem]  text-2xl font-extrabold'>{tableSubheading}</h1>
        <div className="flex flex-row justify-between mt-[1.5rem]">
          {/* Div to contain the search bar and the search Icon */}
          <div className="flex flex-row justify-center items-center mr-[5rem]">
            <div className="relative">
              {/* Search Bar */}
              <div className="relative w-60 mb-3 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="text-gray-700 table-font border-2 border-gray-200 rounded-full py-2 px-4 w-full transition-all duration-300 focus:outline-none main-color-focus"
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
      </div>

      <DataTable className='table-font'
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
              fontWeight: '450',
              color: '#494F55'
            },
          },
          headRow: {
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
                paddingLeft: '0 8px',
                justifyContent: 'center',
                backgroundColor: '#F8FAFC',
                borderRadius: 0,

            },
            cells: {
              style: {
                textAlign: 'center',   // Change text alignment to center
                color: '#494F55' 
              },
            },
          },
        }}
      />
    </>
  );
}



export default Table;

