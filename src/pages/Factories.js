import React, { useEffect, useState, useContext, useRef } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { StateContext } from '../contexts/ContextProvider';
import { useParams } from 'react-router-dom';


import { SummaryAlertCard } from '../components'
import FactoryCard from '../components/cards/FactoryCard';
import { AddNewFactory, DeleteItem } from '../components/modals'
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import SecondNavbar from '../components/SecondNavbar'


// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_USERS_API;
const Factories = (props) => {

    const location = useLocation();
    const { areaName } = location.state || {};

    const { areaId } = useParams();
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

    // State to handle sorting
    const [sortedFactories, setSortedFactories] = useState([]);

    // state to handle loading of the page
    const { loading, setLoading, searchTerm } = useContext(StateContext);



    // async function fetch_data() {

    //     await axios.get(
    //         API_URL + "factories_page",
    //         {
    //             headers: {
    //                 'Content-type': 'multipart/form-data',
    //                 "Access-Control-Allow-Origin": "*",
    //             }
    //         }
    //     ).then((result) => {

    //         setData(result.data)

    //     }).catch(async (error) => {
    //         setLoading(true)
    //         alert(error.response.data);
    //     })

    // }




    async function fetch_data(areaId) {
        await axios.get(
          `${API_URL}factories_page`,
          {
            headers: {
              'Content-type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
            },
            params: {
              areaId, // pass areaId as a query parameter
            },
          }
        )
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          setLoading(true);
          alert(error.response.data);
        });
      }

    useEffect(() => {

        // setOpen(true);
        setLoading(false)
        fetch_data(areaId);

    }, [areaId]);

    useEffect(() => {
        if (data) {

            // setOpen(false);
            setLoading(false)
            setTotalCritical(data.total_critical);
            setTotalFaulty(data.total_faulty);
            setTotalFlawless(data.total_flawless);
            setFactories(data.factories_list);
            setFactoriesList(data.factories_data);
            setAreasList(data.areas);
        }
    }, [data]);

    const handleCardClick = (factoryName) => {
        navigate(`/Motors`, { state: { factoryName } });
    };

    const handleSort = () => {
        let sorted = factories.sort((a, b) => a.factory_name.localeCompare(b.factory_name));
        setSortedFactories(sorted);
    };

     // ****************Delete Factory Function************************
//   const handleDeleteFactory = async (factory_id) => {
//     alert("Deleing factory", factory_id)
//     try {
//       const response = await axios.delete(API_URL + 'delete_factory', {
//         data: { factory_id }
//       });
//       if (response.status === 200) {
//         // Refresh data after deletion
//         fetch_data();
//         alert('Deleted 2', factory_id)
//       }
//     } catch (error) {
//     //   alert(error.response.data.error);
//     }
//   };



const handleDeleteFactory = async (factory_id)=>{
    try {
        const response = await axios.delete(API_URL + 'delete_factory', {
          data: { factory_id, role: props.user_details.role }
        });
        if (response.status === 200) {
          // Refresh data after deletion
          fetch_data();
        }
      } catch (error) {
        alert(error.response.data.error);
      }

}


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
        <div
        
        ref={contentRef}>

            {/* *********Div To Show Page Name**************** */}
            <div className='px-2 lg:px-3.5 my-6'>
                <SecondNavbar pageName='Factories' />
            </div>

            {/* heading section */}
            <div className="flex flex-row justify-between ml-4">
                <h1 className='font-semibold sm:text-base md:text-lg lg:text-xl main-font header-heading'>Summary</h1>
            </div>


            {/* Flex Container */}
            <div className='flex flex-col sm:flex-row items-center justify-center md:justify-between mt-4 rounded-xl w-full md:w-[96%] gap-3 md:gap-2 lg:w-[98%] md:m-3 large:w-[95%] large:gap-[2em]'>
                <SummaryAlertCard
                    iconSrc={flawless}
                    iconColor="text-green-700"
                    // bgColor='bg-green-50'
                    iconBgColor="bg-green-200"
                    value={total_flawless}
                    label="Flawless Motors"
                    percentage="12.6"
                    isPositive />
                <SummaryAlertCard
                    iconSrc={faultyalert}
                    iconColor="text-yellow-700"
                    // bgColor='bg-yellow-100'
                    iconBgColor="bg-yellow-200"
                    value={total_faulty}
                    label="Faulty Motors"
                    percentage="11.6"
                    isPositive />
                <SummaryAlertCard
                    iconSrc={criticalalert}
                    iconColor="text-red-700"
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
                    setFactoriesList={setFactoriesList} areas_list={areas_list} sorted_list={setSortedFactories} />
            }
            {/* logic for showing delete modal */}
            {
                deleteItem &&
                <DeleteItem
                    onClose={() => setDeleteItem(false)}
                    name='Factory'
                    options={factories_list}
                    onDelete={handleDeleteFactory}
                />
            }


            {/* *******************     Cards section     **************/}

            {/* *******************     Cards Header     **************/}
            <CardsContainerHeader headingName={`${areaName ? areaName : 'Factories'} Details`} name='Factory'
                onAddButton={() => setAddNewItem(true)}
                onDeleteButton={() => setDeleteItem(true)}
                onSortButton={handleSort}
                role={props.user_details.role}
            />


            {/* *******************Cards Container**************/}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 large:grid-cols-4 justify-between sm:h-[40vh] md:h-[40vh] lg:h-[44vh] large:h-96 mt-3 main-color rounded-xl shadow-xl m-3 w-90 px-auto large:w-[96%]"
                style={{ overflowY: 'auto', maxHeight: '100%', padding: '10px' }}>
                {
                    sortedFactories.length > 0 ? (
                        sortedFactories.map((row, idx) => (
                            <FactoryCard
                                FactoryName={row.factory_name}
                                AreaName={row.area_name}
                                CriticalMotor={row.critical}
                                FaultyMotors={row.faulty}
                                FlawlessMotors={row.flawless}
                                onClick={() => handleCardClick(row.factory_name)} />
                        ))
                    ) : (

                        factories.map((row, idx) => {

                            return (
                                <FactoryCard
                                    FactoryName={row.factory_name}
                                    AreaName={row.area_name}
                                    CriticalMotor={row.critical}
                                    FaultyMotors={row.faulty}
                                    FlawlessMotors={row.flawless}
                                    onClick={() => handleCardClick(row.factory_name)} />
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default Factories
