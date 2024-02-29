import React from 'react'

function SecondaryButton({SecondaryButtonText, onClick}) {

  
  return (
    <button
      className=" border border-black bg-transparent text-black p-2 rounded-md main-hover hover:text-white hover:border-transparent w-16"
      type="button" onClick={onClick}>
      {SecondaryButtonText}
    </button>
  )
}

export default SecondaryButton
