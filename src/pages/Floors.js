import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import AddNewFloor from '../components/modals/AddNewFloor';
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import { DeleteItem } from '../components/modals'
import { SummaryAlertCard } from '../components';
import FloorCard from '../components/cards/FloorCard';

import axios from 'axios';
import SecondNavbar from '../components/SecondNavbar';


// Load the API URL from the environment variable
let API_URL = process.env.REACT_APP_USERS_API;
const Floors = (props) => {

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
  // State to handle sorting
  const [sortedFloors, setSortedFloors] = useState([]);

  const handleFloorCardClick = (FloorNumber) => {
    navigate(`/Motors`, { state: { FloorNumber } });
  }

  async function fetch_data() {

    await axios.post(
      API_URL + "factory_incharge_floors_page", { employee_id: props.user_details.employee_id },
      {
        headers: {
          'Content-type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
        }
      }
    ).then((result) => {

      setData(result.data)
      console.log(result)

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

  const handleSort = () => {
    let sorted = factories_data.sort((a, b) => a.floor_number - b.floor_number);
    setSortedFloors(sorted);
  };



  return (
    <div className='md:ml-2 md:mr-2 mt-5 lg:ml-5 lg:mr-5 lg:mt-[4rem] large:mx-12 large:mt-[5rem]'>
     
      
         {/* *********Div To Show Page Name**************** */}
         <div className='px-4 sm:mt-14 sm:mb-2 md:mt-14 large:mr-10'>
                <SecondNavbar pageName='Floors' />
            </div>
        {/* Floors Report */}
        {/* <div className="flex flex-col m-5"> */}

        {/* heading section */}
        <div className="flex flex-row justify-between ml-4">
          <h1 className='font-semibold sm:text-base md:text-lg lg:text-xl main-font header-heading'>Summary</h1>
        </div>

        {/* Flex Container */}
        <div className='flex justify-between mt-4 rounded-xl md:w-[96%] sm:gap-3 md:gap-2 lg:w-[98%] m-3 large:w-[95%] large:gap-[2em]'>
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
          onAddButton={() => setAddNewItem(true)}
          onDeleteButton={() => setDeleteItem(true)}
          onSortButton={handleSort}
          role={props.user_details.role}
        />

        {/* *******************     Cards Container     **************/}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 large:grid-cols-4 justify-between sm:h-[40vh] md:h-[40vh] lg:h-[44vh] large:h-96 mt-3 main-color rounded-xl shadow-xl m-3 w-90 px-auto large:w-[96%]'
          style={{ overflowY: 'auto', maxHeight: '100%', padding: '10px' }}>
          {
              sortedFloors.length > 0 ? (
              sortedFloors.map((row, idx) => (
                <FloorCard FloorNumber={row.floor_number} FactoryName={factory_name} AreaName={area_name}
                  CriticalMotor={row.total_critical} FaultyMotors={row.total_faulty} FlawlessMotors={row.total_flawless}
                  onClick={()=>handleFloorCardClick(row.floor_number)} />
              ))
            ) : (
              factories_data.map((row, index) =>

                <FloorCard FloorNumber={row.floor_number} FactoryName={factory_name} AreaName={area_name}
                  CriticalMotor={row.total_critical} FaultyMotors={row.total_faulty} FlawlessMotors={row.total_flawless}
                  onClick={()=>handleFloorCardClick(row.floor_number)} />
              )
            )
          }
        </div>
      </div>
  )
}

export default Floors
