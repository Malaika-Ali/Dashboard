import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import filterby from '../assets/filterby.svg'
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



// import { useStateContext } from '../contexts/ContextProvider'
import { TotalNumberCard } from '../summaryCards';
import { Table } from '../components';
import Alert from '../components/Alert';
import ViewMotorModal from '../components/modals/ViewMotorModal';
import MotorsListModal from '../components/MotorsListModal';
import DateRangePicker from '../components/DateRangePicker';
import CalendarClickModal from '../components/modals/CalendarClickModal';


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
      setOpen(false);
      alert(error.response.data);
    })

  }

  useEffect(() => {

    setOpen(true);
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

  // const pie_data = [
  //   {
  //     "motorname": "Motor1",
  //     "status": "Faulty",
  //     "number": 25,
  //     "textnum": "25",
  //     "color": "#F9F502"
  //   },
  //   {
  //     "motorname": "Motor2",
  //     "status": "critical",
  //     "number": 25,
  //     "textnum": "25",
  //     "color": "#DB1915"
  //   },
  //   {
  //     "motorname": "Motor3",
  //     "status": "Flawless",
  //     "number": 50,
  //     "textnum": "50",
  //     "color": "#31C431"
  //   },
  // ]

  // table columns headings
  const columns = [
    {
      name: 'Motor Name',
      selector: row => row.motorName,
      sortable: true
    },
    {
      name: "Floor Number",
      selector: row => row.floorNumber,
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
      name: "Status",
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
      cell: row => <button className='main-color text-white font-semibold py-2 px-4 rounded' onClick={() => setViewMotor(true)}>View</button>
    }
  ];


  //   {
  //     id: 1,
  //     motorName: 'ss1',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Faulty'
  //   },
  //   {
  //     id: 2,
  //     motorName: 'ss2',
  //     floorNumber: 4,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Flawless'
  //   },
  //   {
  //     id: 3,
  //     motorName: 'ss3',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Critical'
  //   },
  //   {
  //     id: 4,
  //     motorName: 'ss1',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Faulty'
  //   },
  //   {
  //     id: 5,
  //     motorName: 'ss2',
  //     floorNumber: 4,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Flawless'
  //   },
  //   {
  //     id: 6,
  //     motorName: 'ss3',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Critical'
  //   },
  //   {
  //     id: 7,
  //     motorName: 'ss1',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Faulty'
  //   },
  //   {
  //     id: 8,
  //     motorName: 'ss2',
  //     floorNumber: 4,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Flawless'
  //   },
  //   {
  //     id: 9,
  //     motorName: 'ss3',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Critical'
  //   },
  //   {
  //     id: 10,
  //     motorName: 'ss1',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Faulty'
  //   },
  //   {
  //     id: 11,
  //     motorName: 'ss2',
  //     floorNumber: 4,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Flawless'
  //   },
  //   {
  //     id: 12,
  //     motorName: 'ss3',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Critical'
  //   },
  //   {
  //     id: 13,
  //     motorName: 'ss1',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Faulty'
  //   },
  //   {
  //     id: 14,
  //     motorName: 'ss2',
  //     floorNumber: 4,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Flawless'
  //   },
  //   {
  //     id: 15,
  //     motorName: 'ss3',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Critical'
  //   },
  //   {
  //     id: 16,
  //     motorName: 'ss1',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Faulty'
  //   },
  //   {
  //     id: 17,
  //     motorName: 'ss2',
  //     floorNumber: 4,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Flawless'
  //   },
  //   {
  //     id: 18,
  //     motorName: 'ss3',
  //     floorNumber: 2,
  //     factoryName: 'Industry',
  //     areaName: 'Industrial area',
  //     status: 'Critical'
  //   }
  // ];

  // useEffect(() => {
  //   console.log('Component is rendering');
  //   console.log('pie_data:', pie_data);

  // }, [pie_data]);


  // const lineChartData = {
  //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  //   values: [30, 40, 25, 50, 49],
  // };

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
    <div className='ml-5 mr-5 mt-5'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* *********Numbers of Areas, factories, motors **************** */}
      <div className='flex flex-row justify-between items-center'>
        {/* Flex Container */}
        <div className='flex justify-between rounded-xl w-[70%]'>

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
      <div className='flex flex-col justify-center items-start mt-5'>

        <h2 className='ml-3 main-font  text-2xl font-extrabold'>Overall Motors Analytics</h2>

        <div className='mt-2 rounded-xl flex flex-row items-center justify-between gap-10'>

          <div className='h-60 rounded-xl w-[75%] text-center flex flex-row flex-wrap lg:flex-nowrap justify-between items-center gap-6 ml-3'>
            <CircularProgressChart progress={small_charts_data[0]} barColor='#31C431' motorCategory='Flawless' />
            <CircularProgressChart progress={small_charts_data[1]} barColor='#F9F502' motorCategory='Faulty' />
            <CircularProgressChart progress={small_charts_data[2]} barColor='#DB1915' motorCategory='Critical' />
          </div>

          <div className='main-color h-60 rounded-xl w-60 pt-9  flex flex-col flex-wrap lg:flex-nowrap justify-center items-center'>
            <PieChart title="Motors' Performance" onClick={handleClick} series={pie_chart_series} />
          </div>
        </div>

      </div>

      {/* ----------------- Line Chart ------------------------ */}
      <div className='flex flex-col justify-center items-start mt-5'>

        <h2 className='ml-3 main-font  text-2xl font-extrabold'>Monthly Motors Report</h2>

      <div className='mt-2 rounded-xl flex flex-row items-center justify-between gap-8'>
        <div className='main-color h-80 mt-8 rounded-xl w-[80%]   pt-9  text-center flex flex-col flex-wrap lg:flex-nowrap justify-center ml-2'>
          <LineChart data={lineChartData} chartTitle="Monthly Performance Analytics" chartHeight={280} chartWidth={670} />
        </div>
        <DateRangePicker handleDateChange={()=>setCalendarClick(true)} />
        {
          calendarClick &&
          <CalendarClickModal onClick={()=>setCalendarClick(false)} TableHeading='Motors Performance'/>
        }
      </div>
</div>
      {/* ***************Tabular Motors Summary **************** */}
      <div className='mt-12 mx-auto bg-white rounded-xl w-[96%]'>
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


