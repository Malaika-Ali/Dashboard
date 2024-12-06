import React from 'react'
import { GrSort } from "react-icons/gr";
import { AnimatedIconButton } from '../buttons';
import { RiAddLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";

function CardsContainerHeader({ headingName, name, onAddButton, onDeleteButton, onSortButton, role }) {
  return (
    <div className="flex flex-row justify-between sm:mt-6 md:mt-7 m-5 lg:mt-8 large:mt-16 large:w-[94%]">
      <h1 className='header-heading sm:text-base md:text-lg lg:text-xl main-font large:text-xl font-semibold' >{headingName}</h1>
      <div className='flex flex-row items-center gap-2'>
        {
          role == "admin" &&
          <AnimatedIconButton text={`Add ${name}`} color='main-color' onClick={onAddButton}>
            <RiAddLine size={23} />
          </AnimatedIconButton>
        }

        {
          role == "admin" &&
          <AnimatedIconButton text={`Delete ${name}`} color='main-color' onClick={onDeleteButton}>
            <RiDeleteBinLine size={20} />
          </AnimatedIconButton>
        }

        <AnimatedIconButton text={`Sort ${name}s`} color='main-color' onClick={onSortButton}>
          <GrSort size={18} />
        </AnimatedIconButton>

      </div>
    </div>

  )
}

export default CardsContainerHeader
