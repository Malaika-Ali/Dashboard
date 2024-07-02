import React, { useEffect, useState, useContext } from 'react'
import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddNewMotor from '../components/modals/AddNewMotor';
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import { DeleteItem } from '../components/modals'
import { SummaryAlertCard } from '../components';
import MotorCard from '../components/cards/MotorCard';
import { useLocation } from 'react-router-dom';
import SecondNavbar from '../components/SecondNavbar';
import { StateContext } from '../contexts/ContextProvider';


let API_URL = process.env.REACT_APP_USERS_API;
export default function Motors(props) {
  const location = useLocation();
  const { factoryName } = location.state || {};

  const [open, setOpen] = useState(false);
  const [total_critical, setTotalCritical] = useState(0);
  const [total_faulty, setTotalFaulty] = useState(0);
  const [total_flawless, setTotalFlawless] = useState(0);
  const [motors, setMotors] = useState([]);
  const [motors_data, setMotorsData] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // state to handle the addition of new motor
  const [addNewItem, setAddNewItem] = useState(false)
  // state to handle the deletion of motor
  const [deleteItem, setDeleteItem] = useState(false)
  // State to handle sorting
  const [sortedMotors, setSortedMotors] = useState([]);
  // state to handle loading of page
  const { loading, setLoading } = useContext(StateContext);

  const [areas, setAreas] = useState([]);
  const [floors, setFloors] = useState([]);

  const [factories_list, setFactoriesList] = useState([]);
  const [areas_list, setAreasList] = useState([]);
  const [factories, setFactories] = useState([]);


  async function fetch_data() {

    console.log(props.user_details.employee_id)
    await axios.post(
      API_URL + "motors_page",
      { role: props.user_details.role, employee_id: props.user_details.employee_id },
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
      setTotalCritical(data.total_critical);
      setTotalFaulty(data.total_faulty);
      setTotalFlawless(data.total_flawless);
      setMotors(data.motors_list);
      setMotorsData(data.motors_data);
      setAreasList(data.areas);
      setFactories(data.factories)
      setFloors(data.floors)
      console.log('data',data)

    }
  }, [data]);

  const handleSort = () => {
    let sorted = motors.sort((a, b) => a.motorName.localeCompare(b.motorName));
    setSortedMotors(sorted);
  };


  // ************************Add Motor Function************************
  const handleAddMotor = (newMotor) => {
    setMotors([...motors, newMotor]);
    setAddNewItem(false);
  };

  // ************************Delete Motor Function************************
  const handleDeleteMotor = async (motor_id) => {
    try {
      const response = await axios.delete(API_URL + 'delete_motor', {
        data: { motor_id, role: props.user_details.role }
      });
      if (response.status === 200) {
        // Refresh data after deletion
        fetch_data();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  // Fetching Data for AddMotor modal
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const areasResponse = await axios.get(API_URL + 'areas');
  //       const factoriesResponse = await axios.get(API_URL + 'factories');
  //       const floorsResponse = await axios.get(API_URL + 'floors');

  //       console.log('Areas:', areasResponse.data); // Check the data here
  //       console.log('Factories:', factoriesResponse.data); // Check the data here
  //       console.log('Floors:', floorsResponse.data); // Check the data here

  //       setAreas(areasResponse.data);
  //       setFactories(factoriesResponse.data);
  //       setFloors(floorsResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const areasResponse = await axios.get(API_URL + 'area_page');
      const factoriesResponse = await axios.get(API_URL + 'factories_page');
      const floorsResponse = await axios.get(API_URL + 'floors');
  
      console.log('Areas:', areasResponse.data); // Check the data here
      console.log('Factories:', factoriesResponse.data); // Check the data here
      console.log('Floors:', floorsResponse.data); // Check the data here
  
      setAreas(areasResponse.data);
      setFactories(factoriesResponse.data);
      setFloors(floorsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  


  return (
    <div className='md:ml-2 md:mr-2 mt-5 lg:ml-5 lg:mr-5 lg:mt-[4rem] large:mx-12 large:mt-[4rem]'>

      {/* *********Div To Show Page Name**************** */}
      <div className='px-4 sm:mt-14 sm:mb-2 md:mt-14'>
        <SecondNavbar pageName='Motors' />
      </div>


      <div className="flex flex-row justify-between ml-4">
        <h1 className='font-semibold sm:text-base md:text-lg lg:text-xl large:text-3xl main-font header-heading' >Summary</h1>
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


      {/* Motors Performance Section */}
      {/* logic for showing add modal */}
      {
        addNewItem &&
        <AddNewMotor
          onClose={() => setAddNewItem(false)}
          name='Motor'
          // onAddMotor={handleAddMotor}
          areas_list={areas_list}
          factories={factories}
          floors={floors} />
      }
      {/* logic for showing delete modal */}
      {
        deleteItem &&
        <DeleteItem onClose={() => setDeleteItem(false)} name='Motor'
          options={motors_data}
          // setMotor={setMotor} setMotorsList={setMotorsList} emp_id={props.user_details.employee_id}
          onDelete={handleDeleteMotor}
        />
      }

      {/* *******************     Cards section     **************/}

      {/* *******************    Header     **************/}

      <CardsContainerHeader headingName={`${factoryName ? factoryName : 'Motors Details'}`} name='Motor'
        onAddButton={() => setAddNewItem(true)}
        onDeleteButton={() => setDeleteItem(true)}
        onSortButton={handleSort}
        role={props.user_details.role}
      />


      {/* *******************     Cards Container     **************/}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 large:grid-cols-4 justify-between sm:h-[40vh] md:h-[40vh] lg:h-[44vh] large:h-96 mt-3 main-color rounded-xl shadow-xl m-3 w-90 px-auto large:w-[96%]'
        style={{ overflowY: 'auto', maxHeight: '100%', padding: '10px' }}>
        {
          sortedMotors.length > 0 ? (
            sortedMotors.map((row, idx) => (
              <MotorCard motorName={row.motorName} FloorNumber={row.floorNumber}
                AreaName={row.areaName} FactoryName={row.factoryName}
                motorStatus={row.status} />
            ))

          ) : (

            motors.map((row, idx) => {
              return (
                <MotorCard motorName={row.motorName} FloorNumber={row.floorNumber}
                  AreaName={row.areaName} FactoryName={row.factoryName}
                  motorStatus={row.status} />
              )
            })
          )
        }
      </div>
    </div>

  )
}
