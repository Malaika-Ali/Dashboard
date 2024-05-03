import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SmallCalendar = ({ selectedDate, onChange }) => {
  return (
    <div className="custom-calendar">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
      />
    </div>
  );
};

export default SmallCalendar;
