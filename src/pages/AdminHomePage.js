import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import filterby from '../assets/filterby.svg'
import factory from '../assets/factory.svg'
import motors_icon from '../assets/motors.svg'
import location from '../assets/location.svg'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend
} from '@syncfusion/ej2-react-charts';



// import {PieChart, Button} from '../components'
// import { useStateContext } from '../contexts/ContextProvider'
import { TotalNumberCard } from '../summaryCards';
import { Table } from '../components';
import PieChart from '../components/charts/PieChart';
// import {PieChart} from '../components'
// import { PieChart } from '../components/charts/PieChart';
// import PieChart from './PieChart'

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

  async function fetch_data(){

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

    }).catch(async (error) =>  {
      setOpen(false);
      alert(error.response.data);
    })

  }
  
  useEffect(() => {
    if(!props.user_details){
      navigate("/")
    }
    else{
      setOpen(true);
      fetch_data();
       
    }
  }, []);

  useEffect(() => {
    if(data){
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

  // const dat = [
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



  return (
    

   
    <>


    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    

      {/* <div className='mt-8 bg-slate-200 rounded-xl m-3'>
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
          <div className='bg-white h-96 rounded-xl w-96  p-8 pt-9 m-3 '>
      

      
            
              <AccumulationChartComponent title='Motors Condition Summary' height='300px'
                width='300px'>
                <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend]}></Inject>
                <AccumulationSeriesCollectionDirective>
                  <AccumulationSeriesDirective type='Pie' dataSource={pie_data} xName='status' yName='number' dataLabel={{ visible: true, status: "textnum", position: "Inside" }}></AccumulationSeriesDirective>
                </AccumulationSeriesCollectionDirective>
              </AccumulationChartComponent>
         


          </div>
        </div>


      </div> */}



      {/* <div className='mt-8 bg-slate-200 rounded-xl m-3'>
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
          <div className='bg-white h-full rounded-xl w-full p-8 pt-9 m-3'> */}
            {/* <AccumulationChartComponent title='Motors Condition Summary' >
              <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip]}

                tooltip={{ enable: true }}
              />
              <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective type='Pie' dataSource={pie_data} xName='status' yName='number' dataLabel={{ visible: true, position: 'Inside', name: 'textnum' }} pointColorMapping='color' />
              </AccumulationSeriesCollectionDirective>
            </AccumulationChartComponent> */}
             {/* <PieChart data={pie_data} title='Motors Condition Summary'/> */}
      {/* </div>
          </div>
        </div> */}

       

      {/* Flex Container */}
      <div className='flex justify-between mt-4 bg-slate-200 rounded-xl w-90 m-3'>

        {/* left box */}
        <TotalNumberCard iconSrc={location} placeName='Areas' quantity={''+total_areas} />


        {/* middle box */}
        <TotalNumberCard iconSrc={factory} placeName='Factories' quantity={''+total_factories} />


        {/* Right box */}
        <TotalNumberCard iconSrc={motors_icon} placeName='Motors' quantity={''+total_motors} />

      </div>

      {/* Factories Report */}
      <div className="flex flex-col m-5">

        {/* heading section */}
        <div className="flex flex-row justify-between">
          <h1 className='font-extrabold text-xl tracking-tight   text-slate-900 '>Factories Report</h1>
          <div className="flex flex-row justify-between">
            <img src={filterby} alt="" />
            <span className='text-black'>Sort</span></div>
        </div>

        {/* boxes section */}
        <div className='flex flex-col justify-between mt-4 bg-slate-200 rounded-xl m-2 w-full '>
          {
            
            factories.map((row, idx) => {
              
              return (
                <div className="flex flex-row justify-between">    

                  {
                    row.map((row_loop, idx) =>{
                      return(
                        <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                          <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                            <span>{row_loop.factory_name}</span> <span>{row_loop.area}</span>
                          </div>
                          <span>{`Total critical motors: ${row_loop.critical}`}</span>
                          <span>{`Total Faulty motors: ${row_loop.faulty}`}</span>
                          <span>{`Total Flawless motors: ${row_loop.flawless}`}</span>
                        </div>
                      )
                    })
                  }
                  
                </div>
              )
            
            })

          }
          
          {/* row 1 */}
          {/* <div className="flex flex-row justify-between">

           

            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
              <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>Factory 1</span> <span>Area 1</span>
                </div>
                <span>{`Total critical motors: 2`}</span>
                <span>{`Total Faulty motors: 3`}</span>
                <span>{`Total Flawless motors: 0`}</span>


              </div>
            </div>

            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
              <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>Factory 1</span> <span>Area 1</span>
                </div>
                <span>{`Total critical motors: 2`}</span>
                <span>{`Total Faulty motors: 3`}</span>
                <span>{`Total Flawless motors: 0`}</span>


              </div>
            </div>

            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
              <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>Factory 2</span> <span>Area 1</span>
                </div>
                <span>{`Total critical motors: 2`}</span>
                <span>{`Total Faulty motors: 3`}</span>
                <span>{`Total Flawless motors: 0`}</span>

              </div>
            </div>
          </div>


           ------- row 2 --------------------
          <div className="flex flex-row justify-between">

            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
              <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>Factory 1</span> <span>Area 2</span>
                </div>
                <span>{`Total critical motors: 2`}</span>
                <span>{`Total Faulty motors: 3`}</span>
                <span>{`Total Flawless motors: 0`}</span>


              </div>
            </div>

            

            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
              <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>Factory 2</span> <span>Area 2</span>
                </div>
                <span>{`Total critical motors: 2`}</span>
                <span>{`Total Faulty motors: 3`}</span>
                <span>{`Total Flawless motors: 0`}</span>


              </div>
            </div>

            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
              <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-900 mb-8'>
                  <span>Factory 3</span> <span>Area 3</span>
                </div>
                <span>{`Total critical motors: 2`}</span>
                <span>{`Total Faulty motors: 3`}</span>
                <span>{`Total Flawless motors: 0`}</span>

              </div>
            </div>
          </div>
          */}

        </div> 


        {/* Motors Report */}
        <div className="flex flex-col m-2">

          {/* heading section */}
          <div className="flex flex-row justify-between">
            <h1 className='font-extrabold text-xl tracking-tight   text-slate-900 '>Motors Report</h1>
            <div className="flex flex-row justify-between">
              <img src={filterby} alt="" />
              <span className='text-black'>Sort</span></div>
          </div>

          {/* boxes section */}
          <div className='flex flex-col justify-between mt-4 bg-slate-200 rounded-xl m-0 w-full '>

          {
            
            motors.map((row, idx) => {
              
              return (
                <div className="flex flex-row justify-between">    

                  {
                    row.map((row_loop, idx) =>{
                      return(
                        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                          <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                            <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                              <span>{row_loop.factoryName}</span> <span>{row_loop.areaName}</span>
                            </div>
                            <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>{row_loop.motorName}</span>
                            <span className='mx-auto'>{`Status: ${row_loop.status}`}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                  
                </div>
              )
            
            })

          }

            {/* row 1 */}
            {/* <div className="flex flex-row justify-between">

              <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                  <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                    <span>Factory 1</span> <span>Area 1</span>
                  </div>
                  <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>ABC Motor</span>
                  <span className='mx-auto'>{`Status: Faulty`}</span>


                </div>
              </div>

              <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                  <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                    <span>Factory 1</span> <span>Area 1</span>
                  </div>
                  <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>DEF Motor</span>
                  <span className='mx-auto'>{`Status: Critical`}</span>



                </div>
              </div>


              <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                  <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                    <span>Factory 1</span> <span>Area 1</span>
                  </div>
                  <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>ABC Motor</span>
                  <span className='mx-auto'>{`Status: Faulty`}</span>


                </div>
              </div>
            </div>


             ---------- row 2 --------------------
            <div className="flex flex-row justify-between">

              <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                  <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                    <span>Factory 3</span> <span>Area 2</span>
                  </div>
                  <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>ABC Motor</span>
                  <span className='mx-auto'>{`Status: Faulty`}</span>



                </div>
              </div>

              <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                  <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                    <span>Factory 1</span> <span>Area 1</span>
                  </div>
                  <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>ABC Motor</span>
                  <span className='mx-auto'>{`Status: Faulty`}</span>

                </div>
              </div>

              <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className='bg-white dark:bg-secondary-dark-bg h-40 rounded-xl w-60 px-2 m-3 shadow-md flex flex-col justify-center '>
                  <div className='flex flex-row justify-between  font-extrabold text-xl tracking-tight   text-slate-500 mb-8'>
                    <span>Factory 1</span> <span>Area 1</span>
                  </div>
                  <span className='mx-auto font-extrabold text-xl tracking-tight   text-slate-900  pb-5'>ABC Motor</span>
                  <span className='mx-auto'>{`Status: Faulty`}</span>


                </div>
              </div>
            </div> */}

          </div>
        </div> 
      </div>


      {/* Table section */}
      <div className='mt-5 mx-auto bg-slate-200 rounded-xl w-[96%]'>
        <Table tableSubheading={'Overall Report'} column_headings={columns} data={motors_data} />
      </div>



    </>
  )
}
