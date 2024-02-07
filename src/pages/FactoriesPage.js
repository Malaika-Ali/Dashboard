import React, { useEffect, useState } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import filterby from '../assets/filterby.svg'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

import { FactoryCard } from '../components'


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
const FactoriesPage = (props) => {

    const [open, setOpen] = useState(false);
    const [total_critical, setTotalCritical] = useState(0);
    const [total_faulty, setTotalFaulty] = useState(0);
    const [total_flawless, setTotalFlawless] = useState(0);
    const [factories, setFactories] = useState([]);
    const [data, setData] = useState(null);
    const navigate = useNavigate();


    async function fetch_data(){

        await axios.get(
          API_URL + "factories_page",
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
            setFactories(data.factories_list);
          
        }
    }, [data]);

    const handleCardClick = (props) => {
        // Use the prop values in this function
        console.log('Clicked Card with Props:', props);
        // Now you can pass these props to AnotherComponent or perform any other action
      };

      
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* Factories Report */}
            {/* <div className="flex flex-col m-5"> */}

            {/* heading section */}
            <div className="flex flex-row justify-between">
                <h1 className='font-extrabold text-xl tracking-tight m-5 mr-10  text-slate-900 '>Factories Report</h1>
                <div className="flex flex-row mr-5 justify-center">
                    <img src={filterby} alt="" />
                    <span className='text-black'>Sort</span></div>
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
                <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Factories List</h1>
                <div className='flex flex-row'>
                    <img src={filterby} alt="" />
                    Sort</div>
            </div>


            {/* boxes section */}
            <div className='flex flex-col justify-between mt-3 bg-slate-200 rounded-xl m-3 w-90 '>

                {
                
                    factories.map((row, idx) => {
                    
                        return (
                            <div className="flex flex-row justify-between">  

                            {
                                row.map((row_loop, idx) =>{
                                return(
                                    <FactoryCard
                                    FactoryName={row_loop.factory_name}
                                    AreaName={row_loop.area_abbreviation}
                                    CriticalMotor={row_loop.critical}
                                    FaultyMotors={row_loop.faulty}
                                    FlawlessMotors={row_loop.flawless}
                                    onClick={handleCardClick} />
                                )
                                })
                            }
                            
                            </div>
                        )
                        
                    })

                }


                {/* row 1 */}
                {/* <div className="flex flex-row justify-between">
                    <FactoryCard
                        FactoryName="Agri" AreaName="Jauhar" CriticalMotor='2'
                        FaultyMotors='3'
                        FlawlessMotors='2'
                        onClick={handleCardClick} />

                    <FactoryCard
                        FactoryName="Matco"
                        AreaName="Jauhar"
                        CriticalMotor='5'
                        FaultyMotors='6'
                        FlawlessMotors='12'
                        onClick={handleCardClick} />

                    <FactoryCard
                        FactoryName="Auto"
                        AreaName="Jauhar"
                        CriticalMotor='9'
                        FaultyMotors='8'
                        FlawlessMotors='13'
                        onClick={handleCardClick} />
                </div>

                 ======= row 2 ======
                <div className="flex flex-row justify-between">
                    <FactoryCard
                        FactoryName="Hems"
                        AreaName="Jauhar"
                        CriticalMotor='10'
                        FaultyMotors='7'
                        FlawlessMotors='11'
                        onClick={handleCardClick} />

                    <FactoryCard
                        FactoryName="WebTech"
                        AreaName="Jauhar"
                        CriticalMotor='4'
                        FaultyMotors='7'
                        FlawlessMotors='10'
                        onClick={handleCardClick} />

                    <FactoryCard
                        FactoryName="Auto"
                        AreaName="Jauhar"
                        CriticalMotor='6'
                        FaultyMotors='5'
                        FlawlessMotors='14'
                        onClick={handleCardClick} />
                </div> */}
            </div>




            {/* </div> */}
        </div>
    )
}

export default FactoriesPage
