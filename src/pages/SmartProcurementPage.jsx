import React from 'react';
import { Card, Row, Col, Input, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SmartProcurementPage = () => {
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `¥${text}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={status === 'active' ? 'text-green-500' : 'text-red-500'}>
          {status === 'active' ? '可用' : '不可用'}
        </span>
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link">立即采购</Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '智能广告投放系统',
      category: '系统',
      price: 19800.00,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      key: '2',
      name: '数据分析工具',
      category: '工具',
      price: 9800.00,
      status: 'active',
      createdAt: '2024-01-10',
    },
    {
      key: '3',
      name: '营销自动化平台',
      category: '平台',
      price: 29800.00,
      status: 'active',
      createdAt: '2024-01-05',
    },
  ];

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">广告智采</h2>
      
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="搜索产品名称"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="w-64"
        />
        <Button type="primary">
          发布产品
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SmartProcurementPage;