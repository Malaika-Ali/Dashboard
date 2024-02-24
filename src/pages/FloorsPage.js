import React, { useEffect, useState } from 'react'
import { FactoryCard } from '../components'
import { Link, useNavigate } from 'react-router-dom';

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import AddNewFloor from '../components/modals/AddNewFloor';
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import {DeleteItem} from '../components/modals'
import { SummaryAlertCard } from '../components';
import FloorCard from '../components/FloorCard';

import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
const FloorsPage = (props) => {

    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);
    const [total_critical, setTotalCritical] = useState('0');
    const [total_faulty, setTotalFaulty] = useState('0');
    const [total_flawless, setTotalFlawless] = useState('0');
    const [factories_data, setFactoriesData] = useState([]);
    const [area_name, setAreaName] = useState('');
    const [data, setData] = useState(null);
    const [factory_name, setFactoryName] = useState(''); 

    // state to handle the addition of new floor
    const [addNewItem, setAddNewItem] = useState(false)
    // state to handle the deletion of floor
    const [deleteItem, setDeleteItem] = useState(false)

    const handleFloorCardClick=()=>{
        navigate('/Motors')
    }
    async function fetch_data() {
        
        await axios.post(
          API_URL + "factory_incharge_floors_page",{employee_id: props.user_details.employee_id},
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
          setFactoryName(data.factory);
          setAreaName(data.area);
          setFactoriesData(data.factories_data);
          setTotalFlawless(data.total_flawless);
          setTotalFaulty(data.total_faulty);
          setTotalCritical(data.total_critical);
        console.log(factories_data)
        }
      }, [data]);


    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='ml-3 mr-5 mt-5'>
                {/* Floors Report */}
                {/* <div className="flex flex-col m-5"> */}

                    {/* heading section */}
                    <div className="flex flex-row justify-between">
                        <h1 className='font-extrabold text-2xl main-font ml-4'>Floors Report</h1>
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
                        <AddNewFloor onClose={() => setAddNewItem(false)} name='Floor' />
                    }
                    {/* logic for showing delete modal */}
                {
                    deleteItem &&
                    <DeleteItem onClose={() => setDeleteItem(false)} name='Floor'
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

                <CardsContainerHeader headingName='Floors Details' name='Floor' 
                onAddButton={()=>setAddNewItem(true)} 
                onDeleteButton={() => setDeleteItem(true)}
                onSortButton={()=>alert('Sorted')}
                />

    {/* *******************     Cards Container     **************/}
                
                    <div className='grid grid-cols-3 justify-between h-60 mt-3 main-color rounded-xl m-3 w-90 px-auto'
                    style={{ overflowY: 'auto', maxHeight: '100%' }}>
                            {factories_data.map((row, index) => 

                                <FloorCard FloorNumber={row.floor_number} FactoryName={factory_name} AreaName={area_name} 
                                CriticalMotor={row.total_critical} FaultyMotors={row.total_faulty} FlawlessMotors={row.total_flawless}
                                onClick={handleFloorCardClick} />

                            )
                            }
    {/* 
                            <FloorCard FloorNumber='1' FactoryName='Agri' AreaName='Maymar' CriticalMotor='2' FaultyMotors='3' FlawlessMotors='4'
                            onClick={handleFloorCardClick} />

                            <FloorCard FloorNumber='1' FactoryName='Agri' AreaName='Maymar' CriticalMotor='2' FaultyMotors='3' FlawlessMotors='4' 
                            onClick={handleFloorCardClick}/>

                            <FloorCard FloorNumber='1' FactoryName='Agri' AreaName='Maymar' CriticalMotor='2' FaultyMotors='3' FlawlessMotors='4' 
                            onClick={handleFloorCardClick}/>

                            <FloorCard FloorNumber='1' FactoryName='Agri' AreaName='Maymar' CriticalMotor='2' FaultyMotors='3' FlawlessMotors='4'
                            onClick={handleFloorCardClick} />

                            <FloorCard FloorNumber='1' FactoryName='Agri' AreaName='Maymar' CriticalMotor='2' FaultyMotors='3' FlawlessMotors='4' 
                            onClick={handleFloorCardClick}/> */}
                            
                            {/* <FactoryCard FactoryName="Second Floor" />
                            <FactoryCard FactoryName="Third Floor" />

                            <FactoryCard FactoryName="Fourth Floor" />
                            <FactoryCard FactoryName="Fifth Floor" />
                            <FactoryCard FactoryName="Sixth Floor" /> */}
                    </div>
                </div>
        </>    
            // </div>
    )
}

export default FloorsPage
