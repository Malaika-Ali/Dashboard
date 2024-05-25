import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';



// useEffect(()=>{
// const result= {data}.filter(motor =>{

// })
// },[searchTerm])

const TableSubHeader = ({tableSubheading, data}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState({data});

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const filteredData= records.filter(row=>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords=filteredData
  }


  return (
    <div>
      {/* heading section */}
      <div className="flex flex-row justify-between w-[91%] mx-auto mt-8">
          <h1 className='font-extrabold mt-2 text-xl tracking-tight   text-slate-900 '>{tableSubheading}</h1>
          <div className="flex flex-row justify-between">
            
         

            {/* Div to contain all nav elements */}
      <div className="flex mx-auto">
        <div className="relative">
          {/* Search Bar */}


          <div className="relative w-64 ">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 text-gray-700 border-2 border-gray-200 rounded-full py-2 px-4 w-full transition-all duration-300 focus:outline-none focus:border-blue-500"
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
            {/* <div className="absolute top-full mt-2 text-red-500 text-sm">Please enter a search term</div> */}
        </div>
        </div>

            </div>
        </div>
    </div>
  )
}

export default TableSubHeader




