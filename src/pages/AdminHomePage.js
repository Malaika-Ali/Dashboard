import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import factory from '../assets/factory.svg'
import motors_icon from '../assets/motors.svg'
import location from '../assets/location.svg'
import axios from 'axios';

import { PieChart } from '../components/charts'
import { CircularProgressChart } from '../components/charts'
import { LineChart } from '../components/charts'

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'


import TotalNumberCard from '../components/cards/TotalNumberCard';
import Table from '../components/tables/Table'
import Alert from '../components/Alert';
import ViewMotorModal from '../components/modals/ViewMotorModal';
import MotorsListModal from '../components/MotorsListModal';
import CalendarClickModal from '../components/modals/CalendarClickModal';
import { StateContext } from '../contexts/ContextProvider';
import { SmallCalendar } from '../components/calendars';
import SecondNavbar from '../components/SecondNavbar';

// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_USERS_API;

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

  const { loading, setLoading, searchTerm, setSearchTerm, activeMenu } = useContext(StateContext);

  // state to control popup of Motor View modal
  const [viewMotor, setViewMotor] = useState(false)
  const [selectedMotor, setSelectedMotor] = useState(null);

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

      setData(result?.data)

    }).catch(async (error) => {
      // setOpen(false);
      console.log(error)
      setLoading(true)
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
      setLoading(false)
      // setOpen(false);
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
        let bg = '';
        switch (row.status) {
          case 'Flawless':
            color = 'text-green-600';
            bg = 'bg-green-100';
            break;
          case 'Critical':
            color = 'text-red-600';
            bg = 'bg-red-100';
            break;
          case 'Faulty':
            color = 'text-yellow-600';
            bg = 'bg-yellow-100';
            break;
          default:
            color = '';
        }
        return <span className={`${color} ${bg} flex items-center justify-center w-auto h-auto px-1 border rounded-full`}>{row.status}</span>;
      },
      sortable: true
    },
    {
      name: "View",
      center: true,
      cell: row => <button className='bg-secondary-color text-white font-semibold py-1 px-4 rounded-full'
        onClick={() => {
          setViewMotor(true);
          setSelectedMotor(row);
        }}>
        View</button>
    }
  ];

  const lineChartData = {
    // X-axis labelling
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // Y-Axis labelling
    criticalValues: [10, 15, 8, 12, 18, 45, 16, 25, 32, 46, 55, 62],
    faultyValues: [5, 8, 3, 7, 10, 22, 33, 36, 45, 55, 66, 68],
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





  // *************************Search Functionality*********************
  const contentRef = useRef(null);

  // useEffect(() => {
  //   if (searchTerm) {
  //     const regex = new RegExp(`(${searchTerm})`, 'gi');
  //     const content = contentRef.current.innerHTML;
  //     const newContent = content.replace(regex, '<span class="highlight">$1</span>');

  //     contentRef.current.innerHTML = newContent;

  //     const firstMatch = contentRef.current.querySelector('.highlight');
  //     if (firstMatch) {
  //       firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     }
  //   }
  // }, [searchTerm]);


  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(`(?![^<>]*>)(${searchTerm})`, 'gi');
      const content = contentRef.current.innerHTML;
      const newContent = content.replace(regex, '<span class="highlight">$1</span>');

      contentRef.current.innerHTML = newContent;

      const firstMatch = contentRef.current.querySelector('.highlight');
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchTerm]);

  //  md:mx-2 large:mx-28



  return (
    <div
      ref={contentRef}>

      {/* *********Div To Show Page Name**************** */}
      <div className={`px-2.5 md:px-4 lg:px-2 my-6`}>
        <SecondNavbar pageName='Home' />
      </div>

      {/* *********Numbers of Areas, factories, motors **************** */}
      <div className={`cards-grid items-center ${activeMenu ? ' lg:gap-0.5' : ' lg:gap-10'} gap-1.5
       sm:gap-y-[0.8em] sm:gap-x-3
       md:gap-0.5 md:gap-y-4
         lg:gap-1 lg:gap-y-4
       large:gap-[6em]`}>
        {/* Flex Container */}
        {/* <div className='flex justify-between flex-wrap rounded-xl md:w-[72%] lg:w-[70%] large:w-[70%]'> */}

        {/* left box */}
        <TotalNumberCard iconSrc={location} placeName='Areas' quantity={'' + total_areas} onClick={() => navigate('/Areas')} />


        {/* middle box */}
        <TotalNumberCard iconSrc={factory} placeName='Factories' quantity={'' + total_factories} onClick={() => navigate('/Factories')} />


        {/* Right box */}
        <TotalNumberCard iconSrc={motors_icon} placeName='Motors' quantity={'' + total_motors} onClick={() => navigate('/Motors')} />

        {/* </div> */}

        {/* ********************Alerts Div************************* */}
        <div className='flex flex-col lg:items-center gap-2 lg:ml-2'>
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



      {/* ----- Line Chart ------------ */}
      {/* <div className='flex flex-col justify-center lg:items-start mt-8 md:w-[98%] lg:w-full large:w-full'>
        <h2 className='ml-3 main-font  text-xl font-semibold'>Overall Motors Analytics</h2>

        <div className=' rounded-xl flex items-center justify-start gap-8 large:gap-24 w-[98%] lg:w-[99%] large:w-[98%]'>

          <div className='bg-main-color flex justify-center items-center h-80 mt-8 rounded-xl shadow-xl w-[100%]
  lg:h-[50%] large:h-[29rem] pt-2 md:pt-4 lg:py-5  text-center'>
            <LineChart data={lineChartData} chartTitle="Monthly Performance Analytics" />
          </div>


        </div>

      </div> */}

      {/* ----------------- Pie Chart and Calendar ------------------------ */}
      {/* <div className='flex flex-col justify-center items-start mt-8'>

        <h2 className='ml-3 large:ml-6 main-font  text-xl font-semibold'>Monthly Motors Report</h2>

        <div className='-mt-2 rounded-xl flex items-center justify-start gap-8 large:gap-24 w-[98%] lg:w-[99%] large:w-[98%]'>


          <div className='main-color h-auto 
          md:h-[14rem] w-auto md:w-[14rem]  rounded-xl border border-1 border-gray-200  mt-4 pt-4 md:pt-6  flex flex-col flex-wrap lg:flex-nowrap justify-center items-center
          lg:h-[100%] lg:py-10 lg:w-[100%]
          large:h-[18rem] large:w-[19rem]
  '>
            <PieChart title="Motors' Performance" onClick={handleClick} series={pie_chart_series} />
          </div>

          <div className='flex justify-center items-center w-[100%] h-[100%] border-1 border-gray-300 rounded-lg bg-white'>
            <SmallCalendar onClickDay={() => setCalendarClick(true)} />
          </div>
          {
            calendarClick &&
            <CalendarClickModal
              onClick={() => setCalendarClick(false)}
              TableHeading='Motors Performance'
            />
          }
        </div>
      </div> */}



      <div className='charts-grid my-8 w-[100%]'>
        <div className='bg-main-color flex justify-center items-center rounded-xl shadow-xl 
        col-start-1 col-end-2
        text-center'>
          <LineChart data={lineChartData} chartTitle="Monthly Performance Analytics" />
        </div>

        <div className='flex-column lg:col-start-2 lg:col-end-3'>
        {/* lg:h-[17rem] lg:w-[17rem] */}
        <div className='main-color h-auto w-auto rounded-xl border border-1 border-gray-200  pt-4
        flex flex-col flex-wrap lg:flex-nowrap justify-center items-center
          md:h-[100%]  md:w-[45%]  md:pt-6  
         lg:w-auto lg:h-auto
          
  '>
        <PieChart title="Motors' Performance" onClick={handleClick} series={pie_chart_series} />
        </div>
        {/* lg:h-[20rem] lg:w-[17rem] */}
        <div className='flex my-2
        md:h-[100%] md:w-[42%]
        lg:w-auto lg:h-auto
        '>
        <SmallCalendar onClickDay={() => setCalendarClick(true)} />
          </div>
      
          {
            calendarClick &&
            <CalendarClickModal
              onClick={() => setCalendarClick(false)}
              TableHeading='Motors Performance'
            />
          }

        </div>

      </div>



      {/* ***************Tabular Motors Summary **************** */}
      <div className='mt-12 mx-auto bg-white rounded-xl w-[95%] large:w-[98%]'>
        <Table tableSubheading={'Overall Motors Report'} column_headings={columns} data={motors_data} />

        {/* **************handle view button in table *************/}
        {
          viewMotor &&
          <ViewMotorModal onClick={() => setViewMotor(false)}
            // motorName='MM-1' motorStatus='Flawless' floorNumber='2' factoryName='Agri' areaName='Maymar'
            motorName={selectedMotor.motorName}
            motorStatus={selectedMotor.status}
            floorNumber={selectedMotor.floorNumber}
            factoryName={selectedMotor.factoryName}
            areaName={selectedMotor.areaName}

          />
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