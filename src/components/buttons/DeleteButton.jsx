import React from 'react'

function DeleteButton({name}) {
  return (
    <button
    type="submit"
    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
<svg
  className="me-1 -ms-1 w-5 h-5"
  fill="currentColor"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="12" height="2" x="4" y="9" fill-rule="evenodd" />
</svg>


    Delete {name}
  </button>
  )
}

export default DeleteButton
