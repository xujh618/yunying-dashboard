import React from 'react';
import { Table, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const NewsList = ({ data, onEdit, onDelete }) => {
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'published' ? 'green' : 'blue'}>
          {status === 'published' ? '已发布' : '草稿'}
        </Tag>
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
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            className="mr-2"
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default NewsList;