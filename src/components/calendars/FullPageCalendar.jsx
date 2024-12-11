import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './FullPageCalendar.css'
import criticalalert from '../../assets/criticalalert.png'


const localizer = momentLocalizer(moment);

const FullPageCalendar = ({ dateClick }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    
    };

    const [events, setEvents] = useState([
     {
            start: new Date('2024-12-02T10:00:00'),
            end: new Date('2024-12-02T10:00:00'), 
            title: `Critical Alert in Motor ss1 at Floor 3 `
        },
        {
            start: new Date('2024-12-01T13:00:00'),
            end: new Date('2024-12-04T23:00:00'), 
            title: 'Critical Alert in Motor MM-1 at floor 1 Of Innovative in Malir'
        },
        {
            start: new Date('2024-12-06T11:00:00'),
            end: new Date('2024-12-10T16:00:00'), 
            title: 'Critical Alert in Motor MS-2 at floor 1 Of Samsung in South City'
        },
    ]);

    const EventComponent = ({ event }) => (
        <span>{event.title}</span>
    );



    return (
        <div className="h-screen bg-white">
            <h1 className="text-xl text-center py-3 bg-secondary-color text-white w-full rounded-t-lg">Motors Performance History</h1>
            <div className="h-full bg-white">
                <Calendar
                    localizer={localizer}
                    events={events}
                    selectable='true'
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', width: '100%' }}
                    onSelectEvent={handleEventClick}
                    onSelectSlot={dateClick}
                    views={['month', 'week', 'day']}
                components={{
                    event: EventComponent
                }}
                />
            </div>

        </div>
    );
};

export default FullPageCalendar;
