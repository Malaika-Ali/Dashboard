import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaSearch } from 'react-icons/fa';
import './Table.css';

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
      <div className="flex flex-row justify-between items-center w-[100%] mx-8  mb-3">
        <h1 className='py-auto  text-md text-secondary-color font-medium'>{tableSubheading}</h1>
        <div className="flex flex-row justify-between mt-[1rem]">
          {/* Div to contain the search bar and the search Icon */}
          <div className="flex flex-row justify-center items-center mr-[5rem]">
            <div className="relative">
              {/* Search Bar */}
              <div className="relative w-48 group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 text-gray-700 text-sm rounded-full py-2 px-2 pl-5 w-full transition-all duration-300 focus:outline focus:outline-secondary-color focus:bg-white"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {/* Search Icon */}
                <div className="absolute right-0 top-0 mt-1.5  sm:mt-1.5 md:mt-2  mr-4 text-gray-500 group-focus-within:text-secondary-color transition-all duration-300">
                  <FaSearch />
                </div>
              </div>

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
              fontSize: '13px',
              fontWeight: '420',
              color: '#5b6b79'
            },
          },
          headRow: {
            style: {
              fontSize: '14px',
              fontWeight: '450',
              color: 'rgb(107 114 128)',
              paddingLeft: '0 8px',
              justifyContent: 'center',
              backgroundColor: '#F8FAFC',
              borderRadius: 0,

            },
            cells: {
              style: {
                textAlign: 'center',
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

