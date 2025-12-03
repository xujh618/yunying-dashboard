import React from 'react';

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  // 生成从2025年1月到当前月份的选项
  const generateMonthOptions = () => {
    const months = [];
    const start = new Date(2025, 0); // 2025年1月
    const end = new Date(); // 当前月份
    
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const value = `${year}-${month}`;
      const label = `${year}年${month}月`;
      months.push({ value, label });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months.reverse(); // 最新月份在前
  };

  const monthOptions = generateMonthOptions();

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="month-select" className="text-lg font-medium text-blue-300">
        选择月份:
      </label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
      >
        <option value="" className="bg-blue-900">所有月份</option>
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value} className="bg-blue-900">
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;