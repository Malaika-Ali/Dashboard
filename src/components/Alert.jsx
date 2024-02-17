import React from 'react'

function Alert({ bgColor, textColor,iconSrc, iconColor, title, message, alertsNumber }) {
  return (
    <div className={`ml-auto mr-3 flex flex-col gap-2 w-60 border-b-4 border-${bgColor}-600`}>
    <div className={`bg-${bgColor}-50 rounded-t text-${textColor}-900 px-4 py-3`} role="alert">
      <div className="flex flex-row items-center justify-between">
        <div>
          <img src={iconSrc} className={`fill-current h-6 w-6 text-${iconColor}-500 mr-4`} />
        </div>
        <div>
          <p className={`text-sm text-${textColor}-500`}>{message}</p>
        </div>
          <span className={`text-${textColor}-500 text-xl p-1 rounded-full border border-${textColor}-500`}>{alertsNumber}</span>
      </div>
    </div>
  </div>
  )
}

export default Alert
