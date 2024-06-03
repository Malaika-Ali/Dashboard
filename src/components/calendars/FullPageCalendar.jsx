import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './FullPageCalendar.css'
import criticalalert from '../../assets/criticalalert.png'


const localizer = momentLocalizer(moment);

const FullPageCalendar = ({ dateClick }) => {
    // const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        alert("day was clicked")
    };

    // setEvents([{
    //     icon: 'hello',
    //     message: 'exposed with fault'
    // }])

    const [events, setEvents] = useState([
        {
            start: new Date('2024-06-02T10:00:00'),
            end: new Date('2024-06-02T10:00:00'), // same as start time
            title: `Critical Alert in Motor ss1 at Floor 3 `
        },
        {
            start: new Date('2024-06-02T13:00:00'),
            end: new Date('2024-06-02T13:00:00'), // same as start time
            title: 'Faulty Alert in Motor ss5 at floor 4'
        },
    ]);

    const EventComponent = ({ event }) => (
        <span>{event.title}</span>
    );



    return (
        <div className="h-screen bg-white">
            <h1 className="text-xl text-center py-3 bg-seconday-color text-white w-full rounded-t-lg">Motors Performance History</h1>
            <div className="h-full bg-white">
                <Calendar
                    // localizer={localizer}
                    // events={events}
                    // startAccessor="start"
                    // endAccessor="end"
                    // style={{ height: '100%', width: '100%' }}
                    // onSelectEvent={handleEventClick}
                    // onSelectSlot={dateClick}
                    // views={['month', 'week', 'day']}
                    localizer={localizer}
                    events={events}
                    selectable='true'
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%' }}
                    onSelectEvent={handleEventClick}
                    onSelectSlot={dateClick}
                    views={['month', 'week', 'day']}
                // components={{
                //     toolbar: customToolbar,
                // }}
                components={{
                    event: EventComponent
                }}
                />
                {/* <button onClick={handleAddEvent} className="btn btn-primary mt-4">Add Event</button> */}
            </div>

        </div>
    );
};

export default FullPageCalendar;
