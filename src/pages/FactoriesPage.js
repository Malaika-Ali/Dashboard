import React, { useEffect, useState } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import filterby from '../assets/filterby.svg'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

import { FactoryCard, SummaryAlertCard } from '../components'
import { AddNewFactory, DeleteItem } from '../components/modals'
import CardsContainerHeader from '../components/headers/CardsContainerHeader'



let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
const FactoriesPage = (props) => {

    const [open, setOpen] = useState(false);
    const [total_critical, setTotalCritical] = useState(0);
    const [total_faulty, setTotalFaulty] = useState(0);
    const [total_flawless, setTotalFlawless] = useState(0);
    const [factories, setFactories] = useState([]);
    const [factories_list, setFactoriesList] = useState([]);
    const [areas_list, setAreasList] = useState([]);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    // state to handle the addition of new factory
    const [addNewItem, setAddNewItem] = useState(false)

     // state to handle the deletion of factory
     const [deleteItem, setDeleteItem] = useState(false)


    async function fetch_data() {

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
            setFactories(data.factories_list);
            setFactoriesList(data.factories_data);
            setAreasList(data.areas);
        }
    }, [data]);

    const handleCardClick = (props) => {
        // Use the prop values in this function
        console.log('Clicked Card with Props:', props);
        navigate(`/FloorsPage`);
        // Now you can pass these props to AnotherComponent or perform any other action
    };


    return (
        <div className='ml-3 mr-5 mt-5'>
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
                <h1 className='font-extrabold text-2xl main-font ml-4 '>Factories Report</h1>
                {/* <div className="flex flex-row mr-5 justify-center">
                    <img src={filterby} alt="" />
                    <span className='text-black'>Sort</span></div> */}
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

  {/* logic for showing add modal */}
            {
                addNewItem &&
                <AddNewFactory onClose={() => setAddNewItem(false)} name='Factory' setFactory={setFactories} 
                setFactoriesList={setFactoriesList} areas_list={areas_list} />
            }
   {/* logic for showing delete modal */}
   {
                deleteItem &&
                <DeleteItem onClose={() => setDeleteItem(false)} name='Factory'
                    options={factories_list}
                />
            }


    {/* *******************     Cards section     **************/}

    {/* *******************     Cards Header     **************/}
            <CardsContainerHeader headingName='Factories Details' name='Factory'
                onAddButton={() => setAddNewItem(true)}
                onDeleteButton={() => setDeleteItem(true)}
                onSortButton={() => alert('Sorted')}
            />


{/* *******************     Cards Container     **************/}
            {
                factories.map((row, idx) => {

                    return (
                        <div className="grid grid-cols-3 h-60 mt-3 main-color rounded-xl m-3 w-90 px-auto"
                            style={{ overflowY: 'auto', maxHeight: '100%' }}>

                            {
                                row.map((row_loop, idx) => {
                                    return (
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


                            {/* <FactoryCard
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
                                onClick={handleCardClick} /> */}

                        </div>
                    )
                })
            }
        </div>
    )
}

export default FactoriesPage
