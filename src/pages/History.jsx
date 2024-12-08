import React, { useState } from 'react'
import FullPageCalendar from '../components/calendars/FullPageCalendar'
import CalendarClickModal from '../components/modals/CalendarClickModal';
import SecondNavbar from '../components/SecondNavbar';

const History = () => {

  const [dateClicked, setDateClicked] = useState(false);

  return (
    <div>
      {/* *********Div To Show Page Name**************** */}
      <div className='px-2 lg:px-3.5 my-6'>
        <SecondNavbar pageName='History' />
      </div>

      <FullPageCalendar dateClick={() => setDateClicked(true)} />
      {dateClicked &&
        <CalendarClickModal
          onClick={() => setDateClicked(false)}
          TableHeading='Motors History'
        />
      }
    </div>
  )
}

export default History
