import React from "react";

const ReusableStatsTile = ({ iconColor, iconBgColor, value, label, percentage, isPositive, iconSrc }) => {
  return (
    <div className="flex items-center p-2 lg:p-4 bg-white  rounded dark-box-shadow lg:w-72 h-24">
      <div className={`flex flex-shrink-0 items-center justify-center ${iconBgColor} lg:h-14 lg:w-14 large:h-16 large:w-16 rounded`}>
        <img src={iconSrc} className="w-5 h-5 large:w-6 large:h-6 fill-current" />
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-md large:text-xl font-bold">{value}</span>
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-500 md:text-sm lg:text-md large:text-xl">{label}</span>
          <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} text-sm large:text-lg font-semibold ml-2`}>
            {isPositive ? `+${percentage}%` : `-${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReusableStatsTile;