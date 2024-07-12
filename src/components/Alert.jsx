import React from 'react'

function Alert({ bgColor50, textColor900,iconSrc, iconColor, message, alertsNumber, borderColor600, textColor500,borderColor500, onClick }) {
  return (
    <div className={`flex flex-col gap-2 shadow-xl md:w-56 lg:w-[17rem] large:w-72 border-b-4 ${borderColor600} cursor-pointer lato-regular-16 font-bold large:text-xl rounded-lg card-up`} onClick={onClick}>
    <div className={`${bgColor50} rounded-t ${textColor900} px-4 py-3`} role="alert">
      <div className="flex flex-row items-center justify-between">
        <div>
          <img src={iconSrc} className={`fill-current h-6 w-6 text-${iconColor}-500 mr-4`} />
        </div>
        <div>
          <p className={`text-sm large:text-base ${textColor500}`}>{message}</p>
        </div>
          {/* <span className={`${textColor500} text-xl p-2 rounded-full border ${borderColor500} text-xs`}>{alertsNumber}</span> */}
          <div className={`${textColor500} flex justify-center items-center text-xl h-6 w-6 p-2 rounded-full border ${borderColor500}`}><span className='text-sm large:text-base'>{alertsNumber}</span> </div>
      </div>
    </div>
  </div>
  )
}

export default Alert
