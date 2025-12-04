import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';

const { Option } = Select;

const AdminNewsPage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const newsData = [
    {
      id: 1,
      title: '平台升级公告',
      content: '平台将于近期进行系统升级，升级期间可能会出现短暂的服务中断，敬请谅解。',
      category: '公告',
      status: 'published',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: '新功能上线',
      content: '材价库新增数据导出功能，用户可以将数据导出为Excel格式。',
      category: '功能',
      status: 'published',
      createdAt: '2024-01-10',
    },
  ];

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setIsEdit(true);
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    console.log('Delete news:', id);
  };

  const handleSubmit = (values) => {
    console.log('Submit news:', values);
    setModalVisible(false);
  };

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">资讯管理</h2>
      
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          发布资讯
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <NewsList
              data={newsData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={isEdit ? '编辑资讯' : '发布资讯'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <NewsForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default AdminNewsPage;