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
import MotorCard from '../components/MotorCard';
import { useLocation } from 'react-router-dom';
import SecondNavbar from '../components/SecondNavbar';
import { StateContext } from '../contexts/ContextProvider';





let API_URL = "https://fyp-motors.srv462183.hstgr.cloud/";
// let API_URL = "http://localhost:5001/";
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

  async function fetch_data() {

    console.log(props.user_details.employee_id)
    await axios.post(
      API_URL + "motors_page",
      {role: props.user_details.role, employee_id: props.user_details.employee_id},
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

    }
  }, [data]);

  const handleSort = () => {
    let sorted = motors.sort((a, b) => a.motorName.localeCompare(b.motorName));
    setSortedMotors(sorted);
  };

  return (
    <div className='ml-3 mr-5 mt-5 lg:ml-5 lg:mr-5 lg:mt-[5.25rem] large:mx-12 large:mt-[4rem]'>

       {/* *********Div To Show Page Name**************** */}
       <div className='px-4 my-4'>
                <SecondNavbar pageName='Motors' />
            </div>

      
      <div className="flex flex-row justify-between ml-4">
        <h1 className='font-semibold text-xl large:text-3xl main-font' >Summary</h1>
        {/* <div>Refresh</div> */}
      </div>


      {/* Flex Container */}
      <div className='flex justify-between mt-4 rounded-xl md:w-[96%] lg:w-90 m-3 large:w-[95%] large:gap-[2em]'>
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


      {/* Motors Performance Section */}
      {/* logic for showing add modal */}
      {
        addNewItem &&
        <AddNewMotor onClose={() => setAddNewItem(false)} name='Motor' />
      }
      {/* logic for showing delete modal */}
      {
        deleteItem &&
        <DeleteItem onClose={() => setDeleteItem(false)} name='Motor'
          options={motors_data}
        />
      }

      {/* *******************     Cards section     **************/}

      {/* *******************     Cards Header     **************/}

      <CardsContainerHeader headingName={`${factoryName ? factoryName : 'Motors Details'}`} name='Motor'
        onAddButton={() => setAddNewItem(true)}
        onDeleteButton={() => setDeleteItem(true)}
        onSortButton={handleSort}
        role={props.user_details.role}
      />



      {/* *******************     Cards Container     **************/}
      <div className='grid grid-cols-2 lg:grid-cols-3 large:grid-cols-4 justify-between h-60 large:h-96 mt-3 main-color rounded-xl m-3 w-90 px-auto large:w-[96%]'
        style={{ overflowY: 'auto', maxHeight: '100%' }}>
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
