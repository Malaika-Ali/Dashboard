import React,{useState} from 'react'
import FullPageCalendar from '../components/calendars/FullPageCalendar'
import CalendarClickModal from '../components/modals/CalendarClickModal';

const History = () => {

  const [dateClicked, setDateClicked] = useState(false);

  return (
    <div className='mx-4 lg:mt-5 lg:ml-5 lg:mr-5 large:mx-12 large:mt-[4rem]'>
      <FullPageCalendar dateClick={()=>setDateClicked(true)}/>
      {dateClicked &&
        <CalendarClickModal
        onClick={()=>setDateClicked(false)}
           TableHeading='Motors History'
        />
      }
    </div>
  )
}

export default History
