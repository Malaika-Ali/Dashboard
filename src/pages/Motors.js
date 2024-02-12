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


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
export default function Motors(props) {

  const [open, setOpen] = useState(false);
  const [total_critical, setTotalCritical] = useState(0);
  const [total_faulty, setTotalFaulty] = useState(0);
  const [total_flawless, setTotalFlawless] = useState(0);
  const [motors, setMotors] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();


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
          setTotalCritical(data.total_critical);
          setTotalFaulty(data.total_faulty);
          setTotalFlawless(data.total_flawless);
          setMotors(data.motors_list);
        
      }
  }, [data]);


    return (
        <div>
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


                {/* Flex Container */}
                <div className='flex justify-between mt-4 bg-slate-200 rounded-xl w-90 m-3'>

                    {/* left box */}

                    <div className='flex flex-wrap lg:flex-nowrap '>
                        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between'>
                            <img src={criticalalert}/>
                            <span>Critical Alerts</span>
                            <span>{total_critical}</span>
                        </div>
                    </div>


                    {/* middle box */}

                    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8 m-3 shadow-md flex flex-row justify-between'>
                            <img src={faultyalert} alt="" />
                            <span>Faulty Alerts</span>
                            <span>{total_faulty}</span>
                        </div>
                    </div>


                    {/* Right box */}

                    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between '>
                            <img src={flawless} alt="" />
                            <div>Flawless</div>
                            <div>{total_flawless}</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Motors Performance Section */}
            <div className="flex flex-row justify-between mt-10 m-5">
                <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Motors' Performance</h1>
                <div className='flex flex-row'>
                    <img src={filterby} alt="" />
                    Sort</div>
            </div>



{/* boxes section */}
<div className='flex flex-col justify-between mt-3 bg-slate-200 rounded-xl m-3 w-90 '>
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


      ========== row 2 ========
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

    )
}
