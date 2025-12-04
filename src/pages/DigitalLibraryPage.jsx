import React from 'react';
import { Card, Row, Col, Input, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const DigitalLibraryPage = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
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
        <Button type="link">查看详情</Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      title: '数字经济发展报告2024',
      category: '报告',
      views: 1234,
      likes: 56,
      createdAt: '2024-01-15',
    },
    {
      key: '2',
      title: 'AI技术应用案例集',
      category: '案例',
      views: 987,
      likes: 45,
      createdAt: '2024-01-10',
    },
    {
      key: '3',
      title: '大数据分析实战指南',
      category: '指南',
      views: 765,
      likes: 34,
      createdAt: '2024-01-05',
    },
  ];

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">数字智库</h2>
      
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="搜索报告标题"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="w-64"
        />
        <Button type="primary">
          上传报告
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

export default DigitalLibraryPage;