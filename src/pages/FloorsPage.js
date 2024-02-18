import React, { useEffect, useState } from 'react'
import { FactoryCard } from '../components'
import { Link, useNavigate } from 'react-router-dom';

import criticalalert from '../assets/criticalalert.png'
import faultyalert from '../assets/faultyalert.png'
import flawless from '../assets/flawless.png'
import AddNewFloor from '../components/modals/AddNewFloor';
import CardsContainerHeader from '../components/headers/CardsContainerHeader'
import {DeleteItem} from '../components/modals'

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
        <div className='-ml-5 mr-5 mt-5'>
            {/* Floors Report */}
            <div className="flex flex-col m-5">

                {/* heading section */}
                <div className="flex flex-row justify-between">
                    <h1 className='font-extrabold text-xl tracking-tight text-slate-900'>Floors Report</h1>
                </div>

                {/* Flex Container */}
                <div className='flex justify-between mt-4 bg-slate-200 rounded-xl w-90 m-3'>

                    {/* left box */}

                    <div className='flex flex-wrap lg:flex-nowrap '>
                        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between'>
                            <img src={criticalalert} />
                            <span>Critical Alerts</span>
                            <span>05</span>
                        </div>
                    </div>


                    {/* middle box */}

                    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8 m-3 shadow-md flex flex-row justify-between'>
                            <img src={faultyalert} alt="" />
                            <span>Faulty Alerts</span>
                            <span>03</span>
                        </div>
                    </div>


                    {/* Right box */}

                    <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                        <div className='bg-white dark:bg-secondary-dark-bg h-20 rounded-xl w-72 p-8  m-3 shadow-md flex flex-row justify-between '>
                            <img src={flawless} alt="" />
                            <div>Flawless</div>
                            <div>14</div>
                        </div>
                    </div>

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
