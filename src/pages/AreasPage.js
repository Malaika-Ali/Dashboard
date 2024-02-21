import React, { useEffect, useState } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import filterby from '../assets/filterby.svg'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AreaCard, SummaryAlertCard } from '../components'
import { useNavigate } from 'react-router-dom';
import { FactoriesPage } from '../pages'
import { AddNewArea, DeleteItem } from '../components/modals'
import { RiAddLine } from "react-icons/ri";
import CardsContainerHeader from '../components/headers/CardsContainerHeader'


let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
const AreasPage = (props) => {

    const [open, setOpen] = useState(false);
    const [total_critical, setTotalCritical] = useState(0);
    const [total_faulty, setTotalFaulty] = useState(0);
    const [total_flawless, setTotalFlawless] = useState(0);
    const [areas, setAreas] = useState([]);
    const [data, setData] = useState(null);
    // state to handle the addition of new area
    const [addNewItem, setAddNewItem] = useState(false)
    // state to handle the deletion of area
    const [deleteItem, setDeleteItem] = useState(false)
    const navigate = useNavigate();

    // State to handle sorting
    const [sortedAreas, setSortedAreas] = useState([]);

    async function fetch_data() {

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
            setAreas(data.area_list);

        }
    }, [data]);

    const handleAreaCardClick = () => {
        // Navigate to the desired page with the areaName parameter
        navigate(`/FactoriesPage`);
    };

    // function for handling areas sorting
    const handleSort = () => {
        const sorted = [...areas].sort((a, b) =>
            // APi update hone k baaad sorting aise karna
            // a.area_name.localeCompare(b.area_name)
            a[0].props.AreaName.localeCompare(b[0].props.AreaName)
        );
        setSortedAreas(sorted);
    };


    // UseEffect to reset sortedAreas when areas change
    useEffect(() => {
        setSortedAreas([]);
    }, [areas]);

    return (
        <div className='ml-3 mr-5 mt-5'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="flex flex-row justify-between m-5">
                <h1 className='font-extrabold text-xl tracking-tight   text-slate-900' >Summary</h1>
                {/* <div>Refresh</div> */}
            </div>

            {/* Flex Container */}
            <div className='flex justify-between mt-4 rounded-xl
                w-90 m-3'>


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
                   


                {/* left box */}
                {/* 
                <div className='flex flex-wrap lg:flex-nowrap '>
                    <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between'>
                        <img src={criticalalert} />
                        <span>Critical Alerts</span>
                        <span>{total_critical}</span>
                    </div>
                </div> */}


                {/* middle box */}

                {/* <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                    <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8 m-3 shadow-md flex flex-row justify-between'>
                        <img src={faultyalert} alt="" />
                        <span>Faulty Alerts</span>
                        <span>{total_faulty}</span>
                    </div>
                </div> */}


                {/* Right box */}

                {/* <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                    <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between '>
                        <img src={flawless} alt="" />
                        <div>Flawless</div>
                        <div>{total_flawless}</div>
                    </div>
                </div> */}

            </div>



            {/* *******************     Cards section     **************/}

            {/* *******************     Cards Header     **************/}
            <CardsContainerHeader headingName='Areas Details' name='Area'
                onAddButton={() => setAddNewItem(true)}
                onDeleteButton={() => setDeleteItem(true)}
                onSortButton={handleSort}
            />

            {/* logic for showing add modal */}
            {
                addNewItem &&
                <AddNewArea onClose={() => setAddNewItem(false)} name='Area' setArea={setAreas} />
            }
            {/* logic for showing delete modal */}
            {
                deleteItem &&
                <DeleteItem onClose={() => setDeleteItem(false)} name='Area'
                    options={[
                        { label: 'Option 1', value: 'opt1' },
                        { label: 'Option 2', value: 'opt2' },
                        { label: 'Option 3', value: 'opt3' },
                        { label: 'Option 4', value: 'opt4' },
                    ]}
                />
            }


            {/* ****************Areas Cards section************** */}
            {/* {        
                areas.map((row, idx) => {
                
                return (
                
                    <div className="grid justify-between h-52 mt-3 bg-slate-200 rounded-xl m-3 w-90"
                    style={{ overflowY: 'auto', maxHeight: '100%', padding: '10px' }}
                    >  

                    {
                        row.map((row_loop, idx) =>{
                        return(
                            <AreaCard AreaName={row_loop.area_name} onClick={() => handleAreaCardClick()}/>
                        )
                        })
                    }


                     
                    <AreaCard AreaName="Gulshan-e-Iqbal" onClick={() => handleAreaCardClick()}/>
                    <AreaCard AreaName="Gulshan-e-Maymar" onClick={() => handleAreaCardClick()}/>
                    <AreaCard AreaName="Jauhar" onClick={() => handleAreaCardClick()} />
                

                    
                    
               
                    <AreaCard AreaName="Gulshan-e-Hadeed" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Safoora Goth" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Korangi" onClick={() => handleAreaCardClick()}/>
                

                    <AreaCard AreaName="Gulshan-e-Hadeed" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Safoora Goth" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Korangi" onClick={() => handleAreaCardClick()}/>
                

               
                    <AreaCard AreaName="Gulshan-e-Hadeed" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Safoora Goth" onClick={() => handleAreaCardClick()} />
                    <AreaCard AreaName="Korangi" onClick={() => handleAreaCardClick()}/>
                    </div>  
                )
                })
            } */}

            {/* *******************     Cards Container     **************/}
            {
                sortedAreas.length > 0 ? (
                    sortedAreas.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-3  h-52 mt-3 main-color rounded-xl m-3 w-90 px-auto"
                            style={{ overflowY: 'auto', maxHeight: '100%' }}>
                            {
                                row.map((row_loop, idx) => (
                                    <AreaCard key={idx} AreaName={row_loop.area_name} onClick={() => handleAreaCardClick()} />
                                ))
                            }


                            {/* API update hone k baad yahan se remove karna */}
                            <AreaCard AreaName="Gulshan-e-Iqbal" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Gulshan-e-Maymar" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Jauhar" onClick={() => handleAreaCardClick()} />


                            <AreaCard AreaName="Gulshan-e-Hadeed" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Safoora Goth" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Korangi" onClick={() => handleAreaCardClick()} />

                            {/* yahan tak remove karna */}

                        </div>
                    ))
                ) : (
                    areas.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-3 justify-between h-52 mt-3 main-color rounded-xl m-3 w-90"
                            style={{ overflowY: 'auto', maxHeight: '100%', padding: '10px' }}>
                            {
                                row.map((row_loop, idx) => (
                                    <AreaCard key={idx} AreaName={row_loop.area_name} onClick={() => handleAreaCardClick()} />
                                ))
                            }



                            {/* API update hone k baad yahan se remove karna */}
                            {/* <AreaCard AreaName="Gulshan-e-Iqbal" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Gulshan-e-Maymar" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Jauhar" onClick={() => handleAreaCardClick()} />


                            <AreaCard AreaName="Gulshan-e-Hadeed" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Safoora Goth" onClick={() => handleAreaCardClick()} />
                            <AreaCard AreaName="Korangi" onClick={() => handleAreaCardClick()} /> */}

                            {/* yahan tak remove karna */}


                        </div>
                    ))
                )
            }
        </div>
    )
}

export default AreasPage
