import React, { useEffect, useState, useContext, useRef } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import axios from 'axios';

import { SummaryAlertCard } from '../components'
import AreaCard from '../components/cards/AreaCard'
import { useNavigate } from 'react-router-dom';
import { AddNewArea, DeleteItem } from '../components/modals'
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import { StateContext } from '../contexts/ContextProvider';
import SecondNavbar from '../components/SecondNavbar';


// let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_USERS_API;
const Areas = (props) => {

    const [open, setOpen] = useState(false);
    const [total_critical, setTotalCritical] = useState(0);
    const [total_faulty, setTotalFaulty] = useState(0);
    const [total_flawless, setTotalFlawless] = useState(0);
    const [areas, setAreas] = useState([]);
    const [areas_list, setAreasList] = useState([]);
    const [data, setData] = useState(null);
    // state to handle the addition of new area
    const [addNewItem, setAddNewItem] = useState(false)
    // state to handle the deletion of area
    const [deleteItem, setDeleteItem] = useState(false)

    // state to handle loading of page
    const { loading, setLoading, searchTerm, setSearchTerm } = useContext(StateContext);
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
            // setOpen(false);
            setLoading(true);
            alert(error.response.data);
        })

    }

    useEffect(() => {

        // setOpen(true);
        setLoading(false)
        fetch_data();

    }, []);

    useEffect(() => {
        if (data) {
setLoading(false)
            setOpen(false);
            setTotalCritical(data.total_critical);
            setTotalFaulty(data.total_faulty);
            setTotalFlawless(data.total_flawless);
            setAreas(data.area_list);
            setAreasList(data.areas_data)

        }
    }, [data]);

    const handleAreaCardClick = (areaName) => {
        // Navigate to the desired page with the areaName parameter
        navigate(`/Factories`, { state: { areaName } });
    };


    // function for handling areas sorting
    const handleSort = () => {
        let sorted = areas.sort((a, b) => a.area_name.localeCompare(b.area_name));
        setSortedAreas(sorted);
    };

    
// *************************Search Functionality*********************
    const contentRef = useRef(null);

useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(`(?![^<>]*>)(${searchTerm})`, 'gi');
      const content = contentRef.current.innerHTML;
      const newContent = content.replace(regex, '<span class="highlight">$1</span>');
      
      contentRef.current.innerHTML = newContent;
  
      const firstMatch = contentRef.current.querySelector('.highlight');
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchTerm]);


    return (
        <div className='md:ml-2 md:mr-2 mt-5 lg:ml-5 lg:mr-5 lg:mt-[4rem] large:mx-12 large:mt-[4rem]'
        ref={contentRef}>

            {/* *********Div To Show Page Name**************** */}
            <div className='px-4 sm:mt-14 sm:mb-2 md:mt-14'>
                <SecondNavbar pageName='Areas' />
            </div>

            <div className="flex flex-row justify-between ml-4">
                <h1 className='font-semibold sm:text-base md:text-lg lg:text-xl large:text-3xl main-font header-heading' >Summary</h1>
            </div>

            {/* Flex Container */}
            <div className='flex justify-between mt-4 rounded-xl md:w-[96%] sm:gap-3 md:gap-2 lg:w-[98%] m-3 large:w-[95%] large:gap-[2em]'>
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


            {/* *******************     Cards section     **************/}

            {/* *******************     Cards Header     **************/}
            <CardsContainerHeader headingName='Areas Details' name='Area'
                onAddButton={() => setAddNewItem(true)}
                onDeleteButton={() => setDeleteItem(true)}
                onSortButton={handleSort}
                role={props.user_details.role}
            />

            {/* logic for showing add modal */}
            {
                addNewItem &&
                <AddNewArea onClose={() => setAddNewItem(false)} name='Area' setArea={setAreas} setAreasList={setAreasList}
                    set_sorted_list={setSortedAreas} />
            }
            {/* logic for showing delete modal */}
            {
                deleteItem &&
                <DeleteItem onClose={() => setDeleteItem(false)} name='Area'
                    options={areas_list} setArea={setAreas} setAreasList={setAreasList} emp_id={props.user_details.employee_id}
                />
            }

            {/* ******************* Cards Container     **************/}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 large:grid-cols-4 justify-between sm:h-[40vh] md:h-[40vh] lg:h-[44vh] large:h-96 mt-3 main-color rounded-xl shadow-xl m-3 w-90 px-auto large:w-[96%]"
                style={{ overflowY: 'auto', maxHeight: '100%', padding: '10px' }}>
                {
                    sortedAreas.length > 0 ? (
                        sortedAreas.map((row, idx) => (
                            <AreaCard key={idx} AreaName={row.area_name} onClick={() => handleAreaCardClick(row.area_name)} />
                        ))
                    ) : (
                        areas.map((row, idx) => (
                            <AreaCard key={idx} AreaName={row.area_name} onClick={() => handleAreaCardClick(row.area_name)} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Areas


