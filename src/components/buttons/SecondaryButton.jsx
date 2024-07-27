import React from 'react'

function SecondaryButton({SecondaryButtonText, onClick}) {

  
  return (
    <button
      className=" border border-black bg-transparent text-black px-4 py-2 rounded-full main-hover hover:text-white hover:border-transparent"
      type="button" onClick={onClick}>
      {SecondaryButtonText}
    </button>
  )
}

export default SecondaryButton
