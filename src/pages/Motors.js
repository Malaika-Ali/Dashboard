import React, { useEffect, useState } from 'react'
import { RiNotification3Line } from 'react-icons/ri';
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import filterby from '../assets/filterby.svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddNewMotor from '../components/modals/AddNewMotor';
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import { DeleteItem } from '../components/modals'
import { SummaryAlertCard } from '../components';
import MotorCard from '../components/MotorCard';




let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
export default function Motors(props) {

  const [open, setOpen] = useState(false);
  const [total_critical, setTotalCritical] = useState(0);
  const [total_faulty, setTotalFaulty] = useState(0);
  const [total_flawless, setTotalFlawless] = useState(0);
  const [motors, setMotors] = useState([]);
  const [motors_data, setMotorsData] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // state to handle the addition of new motor
  const [addNewItem, setAddNewItem] = useState(false)
  // state to handle the deletion of motor
  const [deleteItem, setDeleteItem] = useState(false)


  async function fetch_data() {

    await axios.get(
      API_URL + "motors_page",
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
      setTotalCritical(data.total_critical);
      setTotalFaulty(data.total_faulty);
      setTotalFlawless(data.total_flawless);
      setMotors(data.motors_list);
      setMotorsData(data.motors_data);

    }
  }, [data]);


  return (
    <div className='ml-3 mr-5 mt-5'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <div className="flex flex-row justify-between ml-4">
        <h1 className='font-extrabold text-2xl main-font' >Summary</h1>
        {/* <div>Refresh</div> */}
      </div>


      {/* Flex Container */}
      <div className='flex justify-between mt-4 rounded-xl w-90 m-3'>
        <SummaryAlertCard iconSrc={flawless} iconColor="text-green-700"
          // bgColor='bg-green-50'
          iconBgColor="bg-green-200"
          value={total_flawless}
          label="Flawless Motors"
          percentage="12.6"
          isPositive />
        <SummaryAlertCard iconSrc={faultyalert} iconColor="text-yellow-700"
          // bgColor='bg-yellow-100'
          iconBgColor="bg-yellow-200"
          value={total_faulty}
          label="Faulty Motors"
          percentage="11.6"
          isPositive />
        <SummaryAlertCard iconSrc={criticalalert} iconColor="text-red-700"
          //  bgColor='bg-red-50'
          iconBgColor="bg-red-200"
          value={total_critical}
          label="Critical Motors"
          percentage="9.6"
          isPositive />

      </div>


      {/* Motors Performance Section */}
      {/* logic for showing add modal */}
      {
        addNewItem &&
        <AddNewMotor onClose={() => setAddNewItem(false)} name='Motor' />
      }
      {/* logic for showing delete modal */}
      {
        deleteItem &&
        <DeleteItem onClose={() => setDeleteItem(false)} name='Motor'
          options={motors_data}
        />
      }

      {/* *******************     Cards section     **************/}

      {/* *******************     Cards Header     **************/}

      <CardsContainerHeader headingName='Motors Details' name='Motor'
        onAddButton={() => setAddNewItem(true)}
        onDeleteButton={() => setDeleteItem(true)}
        onSortButton={() => alert('Sorted')}
      />



      {/* *******************     Cards Container     **************/}
      <div className='grid grid-cols-3 justify-between h-60 mt-3 main-color rounded-xl m-3 w-90 px-auto'
        style={{ overflowY: 'auto', maxHeight: '100%' }}>
        {
          motors.map((row, idx) => {
            return (
              <>{ 
                  row.map((row_loop, index) => <MotorCard motorName={row_loop.motorName} FloorNumber={row_loop.floorNumber} 
                  AreaName={row_loop.areaName} FactoryName={row_loop.factoryName}
                  motorStatus={row_loop.status} />)
                }
                </>
                  )
                })
              }
      </div>
    </div>

  )
}
