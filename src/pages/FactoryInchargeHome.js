import React, { useEffect, useState } from 'react'
import { TotalNumberCard } from '../summaryCards';
import { Link, useNavigate } from 'react-router-dom';

import factory from '../assets/factory.svg'
import motors from '../assets/motors.svg'
import location from '../assets/location.svg'
import { Table } from '../components';

import { PieChart } from '../components/charts'
import { CircularProgressChart } from '../components/charts'
import { LineChart } from '../components/charts'
import MotorsListModal from '../components/MotorsListModal';
import Alert from '../components/Alert';

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import motors_icon from '../assets/motors.svg'
import { GiStairs} from "react-icons/gi";
import stairs from '../assets/stairs.png'

import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CalendarClickModal from '../components/modals/CalendarClickModal';
import ViewMotorModal from '../components/modals/ViewMotorModal';
import { SmallCalendar } from '../components/calendars';


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
const FactoryInchargeHome = (props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [total_floors, setTotalFloors] = useState('0');
  const [total_motors, setTotalMotors] = useState('0');
  const [motors_data, setMotorsData] = useState([]);
  const [data, setData] = useState(null);
  const [pie_chart_series, setPieChartSeries] = useState([0, 0, 0]);
  const [small_charts_data, setSmallChartsData] = useState([0, 0, 0]);

  const [viewMotor, setViewMotor] = useState(false)

  async function fetch_data() {
    console.log(props.user_details.employee_id)
    await axios.post(
      API_URL + "factory_incharge_homepage",
      {employee_id: props.user_details.employee_id},
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
      console.log(data.motors_data);
      setOpen(false);
      setTotalFloors(data.total_floors);
      setTotalMotors(data.total_motors);
      setMotorsData(data.motors_data);
      setPieChartSeries(data.pie_chart_result);
      setSmallChartsData(data.percentages);

    }
  }, [data]);

  // table columns headings
  const columns = [
    {
      name: 'Motor Name',
      selector: row => row.motorName,
      sortable: true,
      center: true
    },
    {
      name: "Floor Number",
      selector: row => row.floorNumber,
      sortable: true,
      center: true
    },
    // {
    //   name: "Factory Name",
    //   selector: row => row.factoryName,
    //   sortable: true
    // },
    // {
    //   name: "Area Name",
    //   selector: row => row.areaName,
    //   sortable: true
    // },
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

  // const data = [
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
  //     factoryName: 'new factory',
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
  //     areaName: 'new area',
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

  const lineChartData = {
    // X-axis labelling
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // Y-Axis labelling
    criticalValues: [10, 15, 8, 12, 18, 45, 66],
    faultyValues: [5, 8, 3, 7, 10, 22, 33],
    flawlessValues: [20, 25, 15, 22, 30, 54, 22],
  };

  // States to handle the motors list popup
  const [redPie, setRedPie] = useState(false)
  const [yellowPie, setYellowPie] = useState(false)
  const [greenPie, setGreenPie] = useState(false)

  // function to change the popup states on pie click
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

  // const pie_chart_series=['23','34','54']


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className='ml-4 mr-5 mt-5'>

        {/* *********Numbers of Areas, factories, motors **************** */}
        <div className='flex flex-row justify-between items-center'>
          {/* Flex Container */}
          <div className='flex justify-start gap-5 rounded-xl w-[70%]'>

            {/* left box */}
            <TotalNumberCard iconSrc={stairs} placeName='Floors'

              quantity={'' + total_floors}
              // quantity='13'

              onClick={() => navigate('/FloorsPage')} />


            {/* middle box */}
            {/* <TotalNumberCard iconSrc={factory} placeName='Factories' */}

            {/* quantity={'' + total_factories}  */}

              {/* quantity='10'
              onClick={() => navigate('/FactoriesPage')} /> */}


            {/* Right box */}
            <TotalNumberCard iconSrc={motors_icon} placeName='Motors'

              quantity={'' + total_motors} 
              // quantity='15'
              onClick={() => navigate('/Motors')} />

          </div>

          {/* ********************Alerts Div************************* */}
          <div className='flex flex-col justify-center items-center gap-2'>
            {/* Critical Alerts card */}
            <Alert bgColor50='bg-red-50' borderColor600='border-red-600' textColor900='text-red-900' iconSrc={criticalalert} iconColor='red' message='Critical Alerts'
               alertsNumber={pie_chart_series[2]} 
              // alertsNumber='20'
              textColor500='text-red-500' borderColor500='border-red-500' onClick={() => setRedPie(true)} />

            {/* Faulty Alerts Card */}
            <Alert iconSrc={faultyalert} iconColor='yellow' message='Faulty Alerts'
               alertsNumber={pie_chart_series[1]}
              // alertsNumber='12'
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
          {
            greenPie &&
            <MotorsListModal onClick={() => setGreenPie(false)} TableHeading='Flawless Motors' />
          }
        </div>


        {/* ----- PieChart & Circular Progress Charts ------------ */}

        <div className='flex flex-col justify-center items-start mt-5'>

        <h2 className='ml-3 main-font  text-2xl font-extrabold'>Overall Motors Analytics</h2>


        <div className='mt-2 rounded-xl flex flex-row items-center justify-between gap-10'>


          <div className='h-60 rounded-xl w-[75%] text-center flex flex-row flex-wrap lg:flex-nowrap justify-between items-center gap-6 ml-3'>
            <CircularProgressChart
             progress={small_charts_data[0]} 
            // progress={}
            barColor='#31C431' motorCategory='Flawless' />
            <CircularProgressChart 
            progress={small_charts_data[1]}
            // progress={12}
            barColor='#F9F502' motorCategory='Faulty' />
            <CircularProgressChart
             progress={small_charts_data[2]} 
            // progress={21}
            barColor='#DB1915' motorCategory='Critical' />
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

        <div className='mt-5 mx-auto bg-white rounded-xl w-[96%]'>
          <Table tableSubheading={'Overall Factory Report'} column_headings={columns} data={motors_data} />
        </div>

        {/* **************handle view button in table *************/}
        {
          viewMotor &&
          <ViewMotorModal onClick={() => setViewMotor(false)}
            motorName='ABC' motorStatus='Flawless' floorNumber='2' factoryName='Agri' areaName='Maymar' />
        }
      </div>
    </>
  )
}

export default FactoryInchargeHome
