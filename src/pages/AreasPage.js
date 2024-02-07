import React, { useEffect, useState } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import filterby from '../assets/filterby.svg'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AreaCard } from '../components'
import { useNavigate } from 'react-router-dom';
import { FactoriesPage } from '../pages'
import { FaBullseye } from 'react-icons/fa'

let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
const AreasPage = (props) => {

    const [open, setOpen] = useState(false);
    const [total_critical, setTotalCritical] = useState(0);
    const [total_faulty, setTotalFaulty] = useState(0);
    const [total_flawless, setTotalFlawless] = useState(0);
    const [areas, setAreas] = useState([]);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    async function fetch_data(){

        await axios.get(
          API_URL + "area_page",
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
            setAreas(data.area_list);
          
        }
    }, [data]);

    const handleAreaCardClick = () => {
        // Navigate to the desired page with the areaName parameter
        
        // navigate(<FactoriesPage/>);
        navigate(`/FactoriesPage`);
    };
    return (


        <>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="flex flex-row justify-between m-5">
                <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Summary</h1>
                <div>Refresh</div>
            </div>

            {/* Flex Container */}
            <div className='flex justify-between mt-4 bg-slate-200 rounded-xl w-90 m-3'>

                {/* left box */}

                <div className='flex flex-wrap lg:flex-nowrap '>
                    <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between'>
                        <img src={criticalalert} />
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

            {/* Areas List Section */}
            <div className="flex flex-row justify-between mt-10 m-5">
                <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Areas List</h1>
                <div className='flex flex-row'>
                    <img src={filterby} alt="" />
                    Sort</div>
            </div>


            {/* boxes section */}
            <div className='flex flex-col justify-between mt-3 bg-slate-200 rounded-xl m-3 w-90 '>
           

            {
            
                areas.map((row, idx) => {
                
                return (
                   
                    <div className="flex flex-row justify-between">  

                    {
                        row.map((row_loop, idx) =>{
                        return(
                            <AreaCard AreaName={row_loop.area_name} onClick={() => handleAreaCardClick()}/>
                        )
                        })
                    }
                    
                    </div>
                   
                )
                
                })

            }

                {/* row 1 */}
                {/* <div className="flex flex-row justify-between">
                    <AreaCard AreaName="Gulshan-e-Iqbal" onClick={() => handleAreaCardClick()}/>
                    <AreaCard AreaName="Gulshan-e-Maymar" onClick={() => handleAreaCardClick()}/>
                    <AreaCard AreaName="Jauhar" onClick={() => handleAreaCardClick()} />
                </div>

                    ========= row 2 =========================
                <div className="flex flex-row justify-between">
                    <AreaCard AreaName="Gulshan-e-Hadeed" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Safoora Goth" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Korangi" onClick={() => handleAreaCardClick()}/>
                </div> */}
            </div>
        </>
    )
}

export default AreasPage
