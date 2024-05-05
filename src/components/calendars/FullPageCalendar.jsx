import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './FullPageCalendar.css'

const localizer = momentLocalizer(moment);

const FullPageCalendar = ({dateClick}) => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
alert("day was clicked")
      };


    //   const customToolbar = () => {
    //     return (
    //       <div className="rbc-toolbar">
    //       <span className="rbc-btn-group">
    //           <button type="button" onClick={() => {}} className="rbc-btn">Month</button>
    //           <button type="button" onClick={() => {}} className="rbc-btn">Week</button>
    //           <button type="button" onClick={() => {}} className="rbc-btn">Day</button>
    //       </span>
    //       <span className="rbc-toolbar-label">
             
    //           <button type="button" onClick={() => {}} className="rbc-btn">Today</button>
    //           <button type="button" onClick={() => {}} className="rbc-btn">Back</button>
    //           <button type="button" onClick={() => {}} className="rbc-btn">Next</button>
    //       </span>
    //   </div>
    //     );
    // };


    return (
        <div className="h-screen">
            <h1 className="text-3xl text-center py-4 main-color text-white">Motor Performance Calendar</h1>
            <div className="h-full">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%' }}
                    onSelectEvent={handleEventClick}
                    onSelectSlot={dateClick}
                    // views={['month', 'week', 'day']} 
                    // components={{
                    //     toolbar: customToolbar,
                    // }}
                />
            </div>
                         
        </div>
    );
};

export default FullPageCalendar;
