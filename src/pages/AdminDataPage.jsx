import React from 'react';
import { Card, Row, Col, Button, Table } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

const AdminDataPage = () => {
  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indicatorName',
      key: 'indicatorName',
    },
    {
      title: '数值',
      dataIndex: 'value',
      key: 'value',
      render: (text) => `¥${text}`,
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
  ];

  const data = [
    {
      key: '1',
      indicatorName: '总销售额',
      value: 1250000.00,
      date: '2024-01-15',
      category: '销售',
    },
    {
      key: '2',
      indicatorName: '活跃用户数',
      value: 89000.00,
      date: '2024-01-15',
      category: '用户',
    },
    {
      key: '3',
      indicatorName: '广告投放量',
      value: 150000.00,
      date: '2024-01-15',
      category: '广告',
    },
  ];

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">数据管理</h2>
      
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<UploadOutlined />} className="mr-2">
          导入数据
        </Button>
        <Button icon={<DownloadOutlined />}>
          导出数据
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

export default AdminDataPage;