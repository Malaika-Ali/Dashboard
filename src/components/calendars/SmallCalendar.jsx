import Calendar from 'react-calendar';
import React,{useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import './SmallCalendar.css'; // Import custom CSS file


const SmallCalendar = ({onClickDay}) => {

  const [date,setDate] = useState(new Date());

  const onChange=date=>{
setDate(date)
  }

  return (
    
    <Calendar onChange={onChange} value={date} onClickDay={onClickDay} className='rounded-xl'/>
    
  )
}

export default SmallCalendar
