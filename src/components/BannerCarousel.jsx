import React, { useState, useEffect } from 'react';
import { getNewsData } from '../data/mockData';

const BannerCarousel = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 定期获取最新的资讯数据
  const fetchNewsData = () => {
    const newsData = getNewsData();
    setNews(newsData);
  };

  useEffect(() => {
    // 初始获取数据
    fetchNewsData();
    
    // 每30秒刷新一次数据
    const interval = setInterval(fetchNewsData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (news.length === 0) {
    return <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
      <span className="text-gray-500">加载中...</span>
    </div>;
  }

  return (
    <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 to-blue-800">
      {news.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center p-4 md:p-6">
            <div className="text-center">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/90 text-sm md:text-base">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`跳转到第 ${index + 1} 张幻灯片`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;