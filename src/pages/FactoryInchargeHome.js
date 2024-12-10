import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import Table from '../components/tables/Table'
import TotalNumberCard from '../components/cards/TotalNumberCard';

import { PieChart } from '../components/charts'
import { CircularProgressChart } from '../components/charts'
import { LineChart } from '../components/charts'
import MotorsListModal from '../components/MotorsListModal';
import Alert from '../components/Alert';


import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import motors_icon from '../assets/motors.svg'
import stairs from '../assets/stairs.png'

import axios from 'axios';

import CalendarClickModal from '../components/modals/CalendarClickModal';
import ViewMotorModal from '../components/modals/ViewMotorModal';
import { SmallCalendar } from '../components/calendars';
import { StateContext } from '../contexts/ContextProvider';
import SecondNavbar from '../components/SecondNavbar';
import { lineChartData } from '../constants/constants';

// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_API_URL;

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
  const { setLoading, searchTerm, activeMenu } = useContext(StateContext);

  const [selectedMotor, setSelectedMotor] = useState(null);

  async function fetch_data() {
    console.log(props.user_details.employee_id)
    await axios.post(
      API_URL + "factory_incharge_homepage",
      { employee_id: props.user_details.employee_id },
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
      // alert(error.response.data);
      setLoading(true)
    })

  }

  useEffect(() => {

    setLoading(false)
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
      console.log(data)

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
      cell: row => <button className='main-color text-white font-semibold py-2 px-4 rounded' onClick={() => {
        setViewMotor(true)
        setSelectedMotor(row);
      }}>View</button>
    }
  ];


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

  return (
    <div>

      {/* *********Div To Show Page Name**************** */}
      <div className='lg:px-2 my-6'>
        <SecondNavbar pageName='Home' />
      </div>

      {/* *********Numbers of Areas, factories, motors **************** */}
      <div className={`flex items-center justify-between
      
       md:justify-between md:gap-y-4
         lg:gap-y-4
       large:gap-[1em]`}>


        {/* left box */}
        <TotalNumberCard iconSrc={stairs} placeName='Floors'
          quantity={'' + total_floors}
          onClick={() => navigate('/Floors')} />

        {/* Right box */}
        <TotalNumberCard iconSrc={motors_icon} placeName='Motors'
          quantity={'' + total_motors}
          onClick={() => navigate('/Motors')} />



        {/* ********************Alerts Div************************* */}
        <div className='flex flex-col justify-center items-center gap-2 lg:ml-2'>
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


      {/* ************************************Line Chart*********************************** */}
      <div className='bg-main-color border-opacity-[0.7] flex justify-center items-center h-80 mt-8 rounded-xl shadow-xl w-[100%]
  lg:h-full large:h-[29rem] pt-2 md:pt-4 lg:py-5  text-center'>
        <LineChart data={lineChartData} chartTitle="Monthly Performance Analytics" />
      </div>


      {/* ----- PieChart & Circular Progress Charts ------------ */}

      <div className='mt-4 rounded-xl flex flex-col md:flex-row items-center justify-start gap-8 large:gap-24 w-[98%] lg:w-[99%] large:w-[98%]'>





        <div className='main-color h-auto w-auto
           rounded-xl border border-1 border-gray-200 border-opacity-[0.7]  mt-4 pt-4 md:pt-6  flex flex-col flex-wrap lg:flex-nowrap justify-center items-center
          md:h-[100%] md:w-[100%]
          lg:h-[100%] lg:pt-5'>
          <PieChart title="Motors' Performance" onClick={handleClick} series={pie_chart_series} />
        </div>

        <div className='flex flex-col justify-center items-center
        w-auto
        md:w-[100%] h-[100%] rounded-xl border border-1 border-secondary-color py-2 pb-4'>
          <h2 className='py-2 main-font text-lg  lg:text-xl font-semibold'>Monthly Motors Report</h2>
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

      {/* ***************Tabular Motors Summary **************** */}

      <div className='mt-12 mx-auto bg-white rounded-xl w-[95%] large:w-[98%]'>
        <Table tableSubheading={'Overall Factory Report'} column_headings={columns} data={motors_data} />
      </div>

      {/* **************handle view button in table *************/}
      {
        viewMotor &&
        <ViewMotorModal onClick={() => setViewMotor(false)}
          // motorName='ABC' motorStatus='Flawless' floorNumber='2' factoryName='Agri' areaName='Maymar' 
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
  )
}

export default FactoryInchargeHome
