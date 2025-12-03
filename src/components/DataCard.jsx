import React from 'react';

const DataCard = ({ title, value, change, icon, isDark }) => {
  // 确定变化指示器的颜色和符号
  const getChangeIndicator = () => {
    if (!change) return null;
    
    const isPositive = change > 0;
    const color = isDark 
      ? (isPositive ? 'text-green-400' : 'text-red-400') 
      : (isPositive ? 'text-green-600' : 'text-red-600');
    const symbol = isPositive ? '↑' : '↓';
    
    return (
      <span className={`${color} flex items-center ml-2`}>
        {symbol} {Math.abs(change)}%
      </span>
    );
  };

  return (
    <div className={`${isDark ? 'bg-white/10 backdrop-blur-md text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-blue-200' : 'text-gray-600'}`}>{title}</h3>
            <p className={`text-3xl font-bold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>{value}</p>
          </div>
          <div className={`${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} p-3 rounded-full`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        {change !== undefined && (
          <div className="mt-4 flex items-center">
            <span className={`text-sm ${isDark ? 'text-blue-300' : 'text-gray-500'}`}>较上月</span>
            {getChangeIndicator()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;