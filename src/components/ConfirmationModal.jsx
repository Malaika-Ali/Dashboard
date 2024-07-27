import React from 'react'
import { IoWarning} from 'react-icons/io5'

function ConfirmationModal({closeConfirmation, user_name, message, name, onConfirm}) {
  return (
    <div className='w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center'>
      <div className='bg-white p-10 rounded-md shadow-md'>
        <h1 className='font-bold text-center text-lg my-5'>Delete {name}</h1>
        <p>
          Are you sure you want to delete <b>{user_name}</b>?
          <p className='bg-[#ffe9d9] p-2 border-l-2 border-[#fa703f] text-[#bc4c2e] flex flex-col text-sm my-1'>
            <span className='text-[#771505] font-bold flex items-center gap-1'>
              <IoWarning />
              Warning
            </span>
            
            {message}
          </p>
        </p>
        <div className='flex justify-between mt-5'>
          <button className='outline outline-1 outline-main-color bg-main-color text-white py-2 px-4 hover:bg-transparent hover:text-black rounded-full'
          onClick={closeConfirmation}
          >Cancel</button>
          <button className='outline outline-1 outline-main-color hover:bg-main-color  hover:text-white py-2 px-4 bg-transparent text-black rounded-full'
          onClick={onConfirm}
          >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
