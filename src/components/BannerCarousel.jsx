import React from 'react';
import { Carousel } from 'antd';

const BannerCarousel = () => {
  const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>广告智采 - 智能化采购平台</h3>
      </div>
      <div>
        <h3 style={contentStyle}>数字智库 - 数据驱动决策</h3>
      </div>
      <div>
        <h3 style={contentStyle}>材价库 - 实时材料价格查询</h3>
      </div>
    </Carousel>
  );
};

export default BannerCarousel;