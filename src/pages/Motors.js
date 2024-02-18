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
import {DeleteItem} from '../components/modals'
import { SummaryAlertCard } from '../components';



let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
export default function Motors(props) {

  const [open, setOpen] = useState(false);
  const [total_critical, setTotalCritical] = useState(0);
  const [total_faulty, setTotalFaulty] = useState(0);
  const [total_flawless, setTotalFlawless] = useState(0);
  const [motors, setMotors] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // state to handle the addition of new motor
  const [addNewItem, setAddNewItem] = useState(false)
  // state to handle the deletion of motor
  const [deleteItem, setDeleteItem] = useState(false)


  async function fetch_data(){

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

      }).catch(async (error) =>  {
        setOpen(false);
        alert(error.response.data);
      })

    }

  useEffect(() => {
      
      setOpen(true);
      fetch_data();
      
    }, []);

  useEffect(() => {
      if(data){
        
          setOpen(false);
          setTotalCritical(data.total_critical);
          setTotalFaulty(data.total_faulty);
          setTotalFlawless(data.total_flawless);
          setMotors(data.motors_list);
        
      }
  }, [data]);


    return (
        <div className='-ml-5 mr-5 mt-5'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='mt-8'>

                <div className="flex flex-row justify-between m-5">
                    <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Summary</h1>
                    {/* <div>Refresh</div> */}
                </div>
                </div>

                {/* Flex Container */}
                <div className='flex justify-between mt-4 rounded-xl w-90 m-3'>
                <SummaryAlertCard iconSrc={flawless} iconColor="text-green-700"
                // bgColor='bg-green-50'
                    iconBgColor="bg-green-200"
                    value="12"
                    label="Flawless Motors"
                    percentage="12.6"
                    isPositive />
                <SummaryAlertCard iconSrc={faultyalert} iconColor="text-yellow-700"
                // bgColor='bg-yellow-100'
                    iconBgColor="bg-yellow-200"
                    value="10"
                    label="Faulty Motors"
                    percentage="11.6"
                    isPositive />
                         <SummaryAlertCard iconSrc={criticalalert} iconColor="text-red-700"
                        //  bgColor='bg-red-50'
                    iconBgColor="bg-red-200"
                    value="05"
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
                    options={[
                        { label: 'Option 1', value: 'opt1' },
                        { label: 'Option 2', value: 'opt2' },
                        { label: 'Option 3', value: 'opt3' },
                        { label: 'Option 4', value: 'opt4' },
                    ]}
                />
            }
        
{/* *******************     Cards section     **************/}

{/* *******************     Cards Header     **************/}

            <CardsContainerHeader headingName='Motors Details' name='Motor' 
            onAddButton={()=>setAddNewItem(true)} 
            onDeleteButton={() => setDeleteItem(true)}
            onSortButton={()=>alert('Sorted')}
            />



{/* *******************     Cards Container     **************/}
      {
        motors.map((row, idx) => {  
            return (
              <div className='grid grid-cols-3 justify-between h-60 mt-3 main-color rounded-xl m-3 w-90 px-auto'
              style={{ overflowY: 'auto', maxHeight: '100%' }}>
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
</div>

    )
}
