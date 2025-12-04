import React, { useState } from 'react';
import { format, subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns';

const MonthRangeSelector = ({ onRangeChange, initialStartMonth, initialEndMonth }) => {
  const [startDate, setStartDate] = useState(initialStartMonth || subMonths(new Date(), 5));
  const [endDate, setEndDate] = useState(initialEndMonth || new Date());

  const handleStartMonthChange = (direction) => {
    const newStartDate = direction === 'prev' ? subMonths(startDate, 1) : addMonths(startDate, 1);
    if (newStartDate < endDate) {
      setStartDate(newStartDate);
      onRangeChange(format(newStartDate, 'yyyyMM'), format(endDate, 'yyyyMM'));
    }
  };

  const handleEndMonthChange = (direction) => {
    const newEndDate = direction === 'prev' ? subMonths(endDate, 1) : addMonths(endDate, 1);
    if (newEndDate > startDate) {
      setEndDate(newEndDate);
      onRangeChange(format(startDate, 'yyyyMM'), format(newEndDate, 'yyyyMM'));
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleStartMonthChange('prev')}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <span className="font-medium">{format(startDate, 'yyyy年MM月')}</span>
        <button
          onClick={() => handleStartMonthChange('next')}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>
      <span className="text-gray-500">至</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleEndMonthChange('prev')}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          ←
        </button>
        <span className="font-medium">{format(endDate, 'yyyy年MM月')}</span>
        <button
          onClick={() => handleEndMonthChange('next')}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MonthRangeSelector;
