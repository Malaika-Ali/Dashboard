import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import factory from '../assets/factory.svg'
import motors_icon from '../assets/motors.svg'
import location from '../assets/location.svg'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { PieChart } from '../components/charts'
import { CircularProgressChart } from '../components/charts'
import { LineChart } from '../components/charts'

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'


import TotalNumberCard from '../components/cards/TotalNumberCard';
import { Table } from '../components';
import Alert from '../components/Alert';
import ViewMotorModal from '../components/modals/ViewMotorModal';
import MotorsListModal from '../components/MotorsListModal';
import DateRangePicker from '../components/DateRangePicker';
import CalendarClickModal from '../components/modals/CalendarClickModal';
import { StateContext } from '../contexts/ContextProvider';
import { SmallCalendar } from '../components/calendars';


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";

export default function AdminHomePage(props) {

  const [open, setOpen] = useState(false);
  const [total_areas, setTotalAreas] = useState('0');
  const [total_factories, setTotalFactories] = useState('0');
  const [total_motors, setTotalMotors] = useState('0');
  const [factories, setFactories] = useState([]);
  const [motors, setMotors] = useState([]);
  const [motors_data, setMotorsData] = useState([]);
  const [data, setData] = useState(null);
  const [pie_chart_series, setPieChartSeries] = useState([0, 0, 0]);
  const [small_charts_data, setSmallChartsData] = useState([0, 0, 0]);

const {loading, setLoading}=useContext(StateContext);

  // state to control popup of Motor View modal
  const [viewMotor, setViewMotor] = useState(false)

  const navigate = useNavigate();

  async function fetch_data() {

    await axios.get(
      API_URL + "admin_homepage",
      {
        headers: {
          'Content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        }
      }
    ).then((result) => {

      setData(result.data)

    }).catch(async (error) => {
      // setOpen(false);
      setLoading(true)
      alert(loading)
      // alert(error.response.data);
    })

  }

  useEffect(() => {

    // setOpen(true);
    setLoading(false)
    // alert(loading)
    fetch_data();


  }, []);

  useEffect(() => {
    if (data) {
      setOpen(false);
      setTotalAreas(data.areas_count);
      setTotalFactories(data.factories_count);
      setTotalMotors(data.motors_count);
      setFactories(data.factories_data);
      setMotors(data.motors_list);
      setMotorsData(data.motors_data);
      setPieChartSeries(data.pie_chart_result);
      setSmallChartsData(data.percentages);

    }
  }, [data])

  // table columns headings
  const columns = [
    {
      name: 'Motor Name',
      selector: row => row.motorName,
      sortable: true,
      center: true,
    },
    {
      name: "Floor Number",
      selector: row => row.floorNumber,
      sortable: true,
      center: true,
    },
    {
      name: "Factory Name",
      selector: row => row.factoryName,
      sortable: true,
      center: true,
    },
    {
      name: "Area Name",
      selector: row => row.areaName,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      center: true,
      selector: (row) => {
        // Conditional styling based on the "Status" value
        let color = '';
        switch (row.status) {
          case 'Flawless':
            color = 'text-green-500';
            break;
          case 'Critical':
            color = 'text-red-500';
            break;
          case 'Faulty':
            color = 'text-yellow-500';
            break;
          default:
            color = '';
        }
        return <span className={color}>{row.status}</span>;
      },
      sortable: true
    },
    {
      name: "View",
      center: true,
      cell: row => <button className='main-color text-white font-semibold py-2 px-4 rounded' onClick={() => setViewMotor(true)}>View</button>
    }
  ];

  const lineChartData = {
    // X-axis labelling
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // Y-Axis labelling
    criticalValues: [10, 15, 8, 12, 18, 45, 16, 25, 32, 46,55,62],
    faultyValues: [5, 8, 3, 7, 10, 22, 33, 36, 45, 55, 66,68],
    flawlessValues: [66, 60, 55, 48, 30, 24, 22, 20, 11, 9, 5, 0],
  };

  const factory_Incharge_headings = [
    {
      name: 'Incharge Name',
      selector: row => row.motorName,
      sortable: true
    },
    {
      name: "Factory Name",
      selector: row => row.factoryName,
      sortable: true
    },
    {
      name: "Area Name",
      selector: row => row.areaName,
      sortable: true
    },
    {
      name: "Email Address",
      selector: row => row.emailaddress,
      sortable: true
    },
  ];


  const [redPie, setRedPie] = useState(false)
  const [yellowPie, setYellowPie] = useState(false)
  const [greenPie, setGreenPie] = useState(false)


  const handleClick = (seriesIndex) => {
    // Reset all states
    setRedPie(false);
    setYellowPie(false);
    setGreenPie(false);

    // Set the state based on the clicked pie slice color
    switch (seriesIndex) {
      case 0:
        setGreenPie(true);
        break;
      case 1:
        setYellowPie(true);
        break;
      case 2:
        setRedPie(true);
        break;
      default:
        // Do nothing or handle unexpected seriesIndex
        break;
    }
  };


  // state to popup modal on click on calendar
  const [calendarClick, setCalendarClick] = useState(false)

  return (
    <div className='md:mt-8 md:mx-2 lg:ml-5 lg:mr-5 lg:mt-5 large:mx-16 large:mt-[4rem]'>
    
      {/* *********Numbers of Areas, factories, motors **************** */}
      <div className='flex flex-row flex-wrap lg:flex-nowrap md:w-[100%] md:gap-[1em] large:gap-[6em] lg:justify-between items-center w-full large:w-full'>
        {/* Flex Container */}
        <div className='flex justify-between rounded-xl md:w-[68%] lg:w-[70%] large:w-[70%]'>

          {/* left box */}
          <TotalNumberCard iconSrc={location} placeName='Areas' quantity={'' + total_areas} onClick={() => navigate('/AreasPage')} />


          {/* middle box */}
          <TotalNumberCard iconSrc={factory} placeName='Factories' quantity={'' + total_factories} onClick={() => navigate('/FactoriesPage')} />


          {/* Right box */}
          <TotalNumberCard iconSrc={motors_icon} placeName='Motors' quantity={'' + total_motors} onClick={() => navigate('/Motors')} />

        </div>

        {/* ********************Alerts Div************************* */}
        <div className='flex flex-col justify-center items-center gap-2'>
          {/* Critical Alerts card */}
          <Alert bgColor50='bg-red-50' borderColor600='border-red-600' textColor900='text-red-900' iconSrc={criticalalert} iconColor='red' message='Critical Alerts'
            alertsNumber={pie_chart_series[2]} textColor500='text-red-500' borderColor500='border-red-500' onClick={() => setRedPie(true)} />

          {/* Faulty Alerts Card */}
          <Alert iconSrc={faultyalert} iconColor='yellow' message='Faulty Alerts' alertsNumber={pie_chart_series[1]}
            bgColor50='bg-yellow-50' borderColor600='border-yellow-600' textColor900='text-yellow-900'
            textColor500='text-yellow-500' borderColor500='border-yellow-500'
            onClick={() => setYellowPie(true)} />
        </div>

        {
          redPie &&
          <MotorsListModal onClick={() => setRedPie(false)} TableHeading='Critical Motors' />
        }

        {
          yellowPie &&
          <MotorsListModal onClick={() => setYellowPie(false)} TableHeading='Faulty Motors' />
        }
      </div>


      {/* ----- PieChart & Circular Progress Charts ------------ */}
      <div className='flex flex-col justify-center items-start mt-5 md:w-[98%] lg:w-full large:w-full'>

        <h2 className='ml-3 main-font  text-2xl font-extrabold'>Overall Motors Analytics</h2>

        <div className='mt-2 rounded-xl flex flex-row items-center justify-between md:gap-6 lg:gap-10 md:w-[100%] lg:w-[98%] large:gap-[3em] large:w-full'>

          <div className='h-60 rounded-xl md:w-[68%] lg:w-[72%] text-center flex flex-row flex-wrap justify-center lg:flex-nowrap lg:justify-between items-center md:gap-4 lg:gap-6 md:ml-2 lg:ml-3 large:w-[68.5%]'>
            <CircularProgressChart progress={small_charts_data[0]} barColor='#31C431' motorCategory='Flawless' />
            <CircularProgressChart progress={small_charts_data[1]} barColor='#F9F502' motorCategory='Faulty' />
            <CircularProgressChart progress={small_charts_data[2]} barColor='#DB1915' motorCategory='Critical' />
          </div>

          <div className='main-color md:h-[14rem] md:w-[28%] lg:h-60 rounded-xl lg:w-60 md:pt-6 lg:pt-9  flex flex-col flex-wrap lg:flex-nowrap justify-center items-center large:h-[18rem] large:w-[19rem]'>
            <PieChart title="Motors' Performance" onClick={handleClick} series={pie_chart_series} />
          </div>
        </div>

      </div>

      {/* ----------------- Line Chart ------------------------ */}
      <div className='flex flex-col justify-center items-start mt-5'>

        <h2 className='ml-3 main-font  text-2xl font-extrabold'>Monthly Motors Report</h2>

      <div className='mt-2 rounded-xl flex flex-row justify-center items-center md:justify-center lg:justify-between gap-8 md:w-[98%] lg:w-[97%] large:w-full'>
        <div className='main-color h-80 mt-8 rounded-xl md:w-[90%] lg:w-[75%] large:w-[70%] large:h-[29rem] pt-9  text-center flex flex-col justify-center items-center flex-wrap lg:flex-nowrap'>
          <LineChart data={lineChartData} chartTitle="Monthly Performance Analytics"/>
        </div>

        <SmallCalendar onClickDay={()=> setCalendarClick(true)}/>
        {
          calendarClick &&
          <CalendarClickModal 
          onClick={()=>setCalendarClick(false)}
           TableHeading='Motors Performance'
           />
        }
      </div>
</div>
      {/* ***************Tabular Motors Summary **************** */}
      <div className='mt-12 mx-auto bg-white rounded-xl w-[98%] large:w-full'>
        <Table tableSubheading={'Overall Motors Report'} column_headings={columns} data={motors_data} />

        {/* **************handle view button in table *************/}
        {
          viewMotor &&
          <ViewMotorModal onClick={() => setViewMotor(false)}
            motorName='ABC' motorStatus='Flawless' floorNumber='2' factoryName='Agri' areaName='Maymar' />
        }

        {
          redPie &&
          <MotorsListModal onClick={() => setRedPie(false)} TableHeading='Critical Motors' />
        }

        {
          yellowPie &&
          <MotorsListModal onClick={() => setYellowPie(false)} TableHeading='Faulty Motors' />
        }
        {
          greenPie &&
          <MotorsListModal onClick={() => setGreenPie(false)} TableHeading='Flawless Motors' />
        }

      </div>
    </div>
  )
}


