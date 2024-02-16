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



// import { useStateContext } from '../contexts/ContextProvider'
import { TotalNumberCard } from '../summaryCards';
import { Table } from '../components';

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
    if (!props.user_details) {
      navigate("/")
    }
    else {
      setOpen(true);
      fetch_data();

    }
  }, []);

  useEffect(() => {
    if (data) {
      setOpen(false);
      setTotalAreas(data.areas_count);
      setTotalFactories(data.factories_count);
      setTotalMotors(data.motors_count);
      setFactories(data.factories_data);
      setMotors(data.motors_list);
      console.log(data.motors_data);
      setMotorsData(data.motors_data);

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
      cell: row => <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded' onClick={() => alert(row.id)}>View</button>
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // Y-Axis labelling
    criticalValues: [10, 15, 8, 12, 18, 45, 66],
    faultyValues: [5, 8, 3, 7, 10, 22, 33],
    flawlessValues: [20, 25, 15, 22, 30,54, 22],
  };

  const factory_Incharge_headings=[
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

  const factory_Incharge_data=[
    {
      name: "Ali",
      factory: "agri Auto",
      Area: "Saddar",
      email: "email"
    }
  ]

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

{/* *********Numbers of Areas, factories, motors **************** */}

      {/* Flex Container */}
      <div className='flex justify-between mt-4 rounded-xl w-[72%]'>

        {/* left box */}
        <TotalNumberCard iconSrc={location} placeName='Areas' quantity={'' + total_areas} />


        {/* middle box */}
        <TotalNumberCard iconSrc={factory} placeName='Factories' quantity={'' + total_factories} />


        {/* Right box */}
        <TotalNumberCard iconSrc={motors_icon} placeName='Motors' quantity={'' + total_motors} />

      </div>


     {/* -------------PieChart and line Chart---------------- */}
      <div className='mt-10 rounded-xl'>
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
          <div className='bg-white h-full rounded-xl w-100  p-8 pt-9 m-3 text-center flex flex-col justify-between gap-5'>
            <PieChart title="Motors' Performance" />
            <LineChart data={lineChartData} chartTitle="Monthly Report" chartHeight={300} chartWidth={800}/>
            
          </div>
        </div>
      </div>


      {/* -------Circular Progress Charts--------------------- */}
      <div className='mt-8 bg-slate-200 rounded-xl'>
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
          <div className='bg-white h-60 rounded-xl w-100 p-5 m-3 text-center flex flex-row justify-center items-center'>
            
            <CircularProgressChart  progress={76} barColor='#31C431' motorCategory='Flawless'/>
            <CircularProgressChart  progress={82} barColor='#F9F502' motorCategory='Faulty' />
            <CircularProgressChart  progress={31} barColor='#DB1915' motorCategory='Critical' />
          </div>
        </div>
      </div>

      {/* ***************Tabular Motors Summary **************** */}
      <div className='mt-5 mx-auto bg-slate-200 rounded-xl w-[96%]'>
        <Table tableSubheading={'Overall Report'} column_headings={columns} data={motors_data} />
      </div>
    </div>
  )
}


