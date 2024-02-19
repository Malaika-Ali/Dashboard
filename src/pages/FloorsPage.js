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

const FloorsPage = (props) => {

    const navigate = useNavigate();
    // useEffect(() => {
    //     if(!props.user_details){
    //       console.log("here", props.user_details)
    //       sessionStorage.clear();
    //       navigate("/")
    //     }
    //   }, [navigate, props.user_details]);

    // state to handle the addition of new floor
    const [addNewItem, setAddNewItem] = useState(false)
    // state to handle the deletion of floor
    const [deleteItem, setDeleteItem] = useState(false)


    return (
        <div className='ml-2 mr-5 mt-5'>
            {/* Floors Report */}
            <div className="flex flex-col m-5">

                {/* heading section */}
                <div className="flex flex-row justify-between">
                    <h1 className='font-extrabold text-xl tracking-tight text-slate-900'>Floors Report</h1>
                </div>

                {/* Flex Container */}
                <div className='flex justify-between mt-4 rounded-xl w-90 m-3'>

                <SummaryAlertCard iconSrc={flawless} iconColor="text-green-700"
                // bgColor='bg-green-50'
                    iconBgColor="bg-green-200"
                    value="12"
                    label="Flawless Motors"
                    percentage="12.6"
                    isPositive />
                <SummaryAlertCard iconSrc={faultyalert} iconColor="text-yellow-700"
                // bgColor='bg-yellow-100'
                    iconBgColor="bg-yellow-200"
                    value="10"
                    label="Faulty Motors"
                    percentage="11.6"
                    isPositive />
                         <SummaryAlertCard iconSrc={criticalalert} iconColor="text-red-700"
                        //  bgColor='bg-red-50'
                    iconBgColor="bg-red-200"
                    value="05"
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

                        <FactoryCard FactoryName="First Floor" />
                        <FactoryCard FactoryName="Second Floor" />
                        <FactoryCard FactoryName="Third Floor" />

                        <FactoryCard FactoryName="Fourth Floor" />
                        <FactoryCard FactoryName="Fifth Floor" />
                        <FactoryCard FactoryName="Sixth Floor" />
                </div>
            </div>
        </div>
    )
}

export default FloorsPage
