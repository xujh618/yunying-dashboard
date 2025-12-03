import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, icon, description, path, isDark }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div 
      className={`${isDark ? 'bg-white/10 backdrop-blur-md text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 hover:bg-opacity-80`}
      onClick={handleClick}
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className={`text-xl font-bold ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>{title}</h3>
      </div>
      <p className={`mb-4 ${isDark ? 'text-blue-200' : 'text-gray-600'}`}>{description}</p>
      <button className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors flex items-center`}>
        查看详情
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCard;