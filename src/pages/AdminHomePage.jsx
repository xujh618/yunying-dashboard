import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { BarChart, PieChart } from '@ant-design/charts';

const AdminHomePage = () => {
  const barData = [
    { name: '1月', value: 1200 },
    { name: '2月', value: 1900 },
    { name: '3月', value: 3000 },
    { name: '4月', value: 2500 },
    { name: '5月', value: 2700 },
    { name: '6月', value: 3800 },
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

  const pieConfig = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
  };

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">管理后台</h2>
      
      <Row gutter={[16, 16]}>
        <Col span={24} md={6}>
          <Card>
            <Statistic title="总用户数" value={12345} />
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card>
            <Statistic title="总访问量" value={987654} />
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card>
            <Statistic title="总销售额" value={12345678} prefix="¥" />
          </Card>
        </Col>
        <Col span={24} md={6}>
          <Card>
            <Statistic title="数据条目" value={5678} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24} md={16}>
          <Card title="月度销售额">
            <BarChart {...barConfig} />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card title="业务分布">
            <PieChart {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHomePage;