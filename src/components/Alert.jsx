import React from 'react'

function Alert({ bgColor50, textColor900,iconSrc, iconColor, message, alertsNumber, borderColor600, textColor500,borderColor500, onClick }) {
  return (
    <div className={`ml-auto mr-3 flex flex-col gap-2 w-60 border-b-4 ${borderColor600} cursor-pointer`} onClick={onClick}>
    <div className={`${bgColor50} rounded-t ${textColor900} px-4 py-3`} role="alert">
      <div className="flex flex-row items-center justify-between">
        <div>
          <img src={iconSrc} className={`fill-current h-6 w-6 text-${iconColor}-500 mr-4`} />
        </div>
        <div>
          <p className={`text-sm ${textColor500}`}>{message}</p>
        </div>
          <span className={`${textColor500} text-xl p-1 rounded-full border ${borderColor500}`}>{alertsNumber}</span>
      </div>
    </div>
  </div>
  )
}

export default Alert
