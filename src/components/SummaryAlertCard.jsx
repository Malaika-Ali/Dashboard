import React from "react";

const ReusableStatsTile = ({ iconColor, iconBgColor, value, label, percentage, isPositive, iconSrc }) => {
  return (
    <div className="flex items-center p-4 bg-white  rounded dark-box-shadow ">
      <div className={`flex flex-shrink-0 items-center justify-center ${iconBgColor} h-16 w-16 rounded`}>
        <img src={iconSrc} className="w-6 h-6 fill-current" />
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-xl font-bold">{value}</span>
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-500">{label}</span>
          <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} text-sm font-semibold ml-2`}>
            {isPositive ? `+${percentage}%` : `-${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReusableStatsTile;