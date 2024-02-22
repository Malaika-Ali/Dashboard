import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaSearch } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import PropTypes from 'prop-types'; // Import PropTypes


const ModalTable = ({ tableSubheading, column_headings, data }) => {
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
      <div className="flex flex-row justify-between w-[90%] mx-5 mt-0">
        <h1 className='font-extrabold mt-4 mb-4 text-xl tracking-tight   text-slate-900'>{tableSubheading}</h1>
        <div className="flex flex-row justify-between">
          {/* Div to contain the search bar and the search Icon */}
          <div className="flex flex-row justify-center items-center mr-2">
            <div className="relative">
              {/* Search Bar */}
              <div className="relative w-48 mt-3 mb-3 ">
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
              <TooltipComponent content="Please enter a search term" position='BottomCenter'>
                <div className="absolute top-full mt-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Please enter a search term</div>
              </TooltipComponent>
            </div>
          </div>
        </div>
      </div>

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


// Add PropTypes for each prop
ModalTable.propTypes = {
  tableSubheading: PropTypes.string.isRequired,
  column_headings: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default ModalTable;

