import React, { useState } from 'react';
import { format, subMonths, addMonths } from 'date-fns';

const MonthSelector = ({ onMonthChange, initialMonth }) => {
  const [currentDate, setCurrentDate] = useState(initialMonth || new Date());

  const handleMonthChange = (direction) => {
    const newDate = direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1);
    setCurrentDate(newDate);
    onMonthChange(format(newDate, 'yyyyMM'));
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleMonthChange('prev')}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        上个月
      </button>
      <span className="text-lg font-medium">{format(currentDate, 'yyyy年MM月')}</span>
      <button
        onClick={() => handleMonthChange('next')}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        下个月
      </button>
    </div>
  );
};

export default MonthSelector;
