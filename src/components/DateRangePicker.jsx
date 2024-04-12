import React, {useRef} from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const DateRangePicker = ({handleDateChange}) => {

  const datetimeRef = useRef(null);

  // const handleModalOpen = () => {
  //   // Close the calendar when the modal opens
  //   if (datetimeRef.current) {
  //     datetimeRef.current.closeCalendar();
  //     handleDateChange
  //   }
  // };
  
  return (
    <div className="hidden lg:flex lg:relative lg:max-w-sm mt-[-243px]">
      {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div> */}
      <Datetime
      ref={datetimeRef}
        inputProps={{
          className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:main-color focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-5",
          placeholder: "Select date"
        }}
        open // Always display the calendar


        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateRangePicker;


