import React from "react";

const ReusableStatsTile = ({ iconColor, iconBgColor, value, label, percentage, isPositive, iconSrc }) => {
  return (
    <div className="flex items-center sm:p-1 md:p-2 lg:p-4 bg-white  rounded shadow-xl border border-slate-200 sm:h-20 sm:w-60 md:h-20 lg:w-72 lg:h-20">
      <div className={`flex flex-shrink-0 items-center justify-center ${iconBgColor} sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded`}>
        <img src={iconSrc} className="w-5 h-5 large:w-6 large:h-6 fill-current" />
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="sm:text-sm lg:text-base large:text-lg font-bold">{value}</span>
        <div className="flex items-center justify-between sm:gap-1
         md:gap-2">
          <span className="text-gray-500 sm:text-xs lg:text-md large:text-sm">{label}</span>
          <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} sm:text-sm large:text-lg font-semibold ml-2`}>
            {isPositive ? `+${percentage}%` : `-${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReusableStatsTile;