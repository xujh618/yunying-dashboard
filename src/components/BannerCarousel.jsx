import React, { useState, useEffect } from 'react';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      id: 1,
      title: '数字智库',
      description: '提供专业的数字智库服务',
      image: 'https://via.placeholder.com/1200x400?text=数字智库',
      link: '/digital-library'
    },
    {
      id: 2,
      title: '广咨智采',
      description: '智能化采购平台',
      image: 'https://via.placeholder.com/1200x400?text=广咨智采',
      link: '/smart-procurement'
    },
    {
      id: 3,
      title: '材价库',
      description: '材料价格查询服务',
      image: 'https://via.placeholder.com/1200x400?text=材价库',
      link: '/material-price'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full flex-shrink-0">
            <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${banner.image})` }}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4 text-center">
                <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                <p className="text-lg mb-4">{banner.description}</p>
                <a 
                  href={banner.link} 
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all"
                >
                  了解更多
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
