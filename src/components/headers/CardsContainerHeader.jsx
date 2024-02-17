import React from 'react'
// import {filterby} from '../assets/filterby.svg'
// import {filterby} from '.../assets/filterby'
import { GrSort } from "react-icons/gr";
import { AnimatedIconButton } from '../buttons';
import { RiAddLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";




function CardsContainerHeader({headingName, name, onAddButton, onDeleteButton,onSortButton }) {
  return (
    <div className="flex flex-row justify-between mt-10 m-5">
    <h1 className='header-heading' >{headingName}</h1>
    <div className='flex flex-row items-center gap-2'>
        {/* <button
            className="bg-blue-500 w-40 text-white p-2 rounded-md hover:bg-blue-600 flex flex-row items-center justify-center ml-auto" */}

            {/* // onClick={() => setAddNewItem(true)} */}
            
            {/* >
            Add Factory
        </button> */}

        <AnimatedIconButton  text={`Add ${name}`} color='main-color' onClick={onAddButton}>
        <RiAddLine size={23}  />
        </AnimatedIconButton>

        <AnimatedIconButton  text={`Delete ${name}`} color='main-color' onClick={onDeleteButton}>
        <RiDeleteBinLine size={20} />
        </AnimatedIconButton>

        <AnimatedIconButton  text={`Sort ${name}s`} color='main-color' onClick={onSortButton}>
        <GrSort size={18} />
        </AnimatedIconButton>

        </div>
        {/* {
        addNewItem &&
        <AddNewFactory onClose={() => setAddNewItem(false)} name='Factory' />
    } */}
        </div>

  )
}

export default CardsContainerHeader
