import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { BarChart, LineChart, PieChart } from '@ant-design/charts';
import BannerCarousel from '../components/BannerCarousel';
import ProductCard from '../components/ProductCard';
import platformData from '../data/mockData';

const HomePage = () => {
  const barData = [
    { name: '1月', value: 1200 },
    { name: '2月', value: 1900 },
    { name: '3月', value: 3000 },
    { name: '4月', value: 2500 },
    { name: '5月', value: 2700 },
    { name: '6月', value: 3800 },
  ];

  const lineData = [
    { name: '1月', value: 800 },
    { name: '2月', value: 1500 },
    { name: '3月', value: 2000 },
    { name: '4月', value: 1800 },
    { name: '5月', value: 2200 },
    { name: '6月', value: 3000 },
  ];

  const pieData = [
    { type: '数字智库', value: 35 },
    { type: '广告智采', value: 45 },
    { type: '材价库', value: 20 },
  ];

  const barConfig = {
    data: barData,
    xField: 'name',
    yField: 'value',
    colorField: 'name',
  };

  const lineConfig = {
    data: lineData,
    xField: 'name',
    yField: 'value',
  };

  const pieConfig = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
  };

  return (
    <div className="content">
      <BannerCarousel />
      
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">平台产品</h2>
        <Row gutter={[16, 16]}>
          {platformData.products.map((product) => (
            <Col span={8} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">运营数据概览</h2>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Card title="月度销售额">
              <BarChart {...barConfig} />
            </Card>
          </Col>
          <Col span={24} md={12}>
            <Card title="月度活跃用户">
              <LineChart {...lineConfig} />
            </Card>
          </Col>
          <Col span={24} md={8}>
            <Card title="业务分布">
              <PieChart {...pieConfig} />
            </Card>
          </Col>
          <Col span={24} md={16}>
            <Card title="近期动态">
              <ul className="list-disc pl-5">
                <li className="mb-2">数字智库新增50篇行业报告</li>
                <li className="mb-2">广告智采系统升级完成</li>
                <li className="mb-2">材价库数据更新至最新月份</li>
                <li className="mb-2">管理后台新增数据导出功能</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;