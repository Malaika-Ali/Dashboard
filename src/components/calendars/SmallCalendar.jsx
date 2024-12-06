import Calendar from 'react-calendar';
import React,{useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import './SmallCalendar.css'; 


const SmallCalendar = ({onClickDay}) => {

  const [date,setDate] = useState(new Date());

  const onChange=date=>{
setDate(date)
  }

  return (
    
    <Calendar onChange={onChange} value={date} onClickDay={onClickDay} className='rounded-b-xl shadow-xl'/>
    
  )
}

export default SmallCalendar
