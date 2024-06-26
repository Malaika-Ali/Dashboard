import React, { useState } from 'react'
import FullPageCalendar from '../components/calendars/FullPageCalendar'
import CalendarClickModal from '../components/modals/CalendarClickModal';
import SecondNavbar from '../components/SecondNavbar';

const History = () => {

  const [dateClicked, setDateClicked] = useState(false);

  return (
    <div className='mx-4 lg:mt-[5rem] lg:ml-5 lg:mr-5 large:mx-12 large:mt-[4rem]'>
      {/* *********Div To Show Page Name**************** */}
      <div className='px-4 my-2 mt-10 mb-5'>
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
