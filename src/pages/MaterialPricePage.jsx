import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Table, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DataImportForm from '../components/DataImportForm';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const MaterialPricePage = () => {
  const [importVisible, setImportVisible] = useState(false);

  const columns = [
    {
      title: '材料名称',
      dataIndex: 'materialName',
      key: 'materialName',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `¥${text}`,
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const data = [
    {
      key: '1',
      materialName: '水泥',
      unit: '吨',
      price: 450.00,
      region: '北京',
      date: '2024-01-15',
    },
    {
      key: '2',
      materialName: '钢筋',
      unit: '吨',
      price: 4200.00,
      region: '上海',
      date: '2024-01-15',
    },
    {
      key: '3',
      materialName: '木材',
      unit: '立方米',
      price: 1800.00,
      region: '广州',
      date: '2024-01-15',
    },
  ];

  return (
    <div className="content">
      <h2 className="text-2xl font-bold mb-4">材价库</h2>
      
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <Search
          placeholder="搜索材料名称"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="w-64"
        />
        <Select placeholder="选择地区" style={{ width: 150 }}>
          <Option value="北京">北京</Option>
          <Option value="上海">上海</Option>
          <Option value="广州">广州</Option>
        </Select>
        <RangePicker style={{ width: 300 }} />
        <Button type="primary" onClick={() => setImportVisible(true)}>
          导入数据
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>

      <DataImportForm
        visible={importVisible}
        onCancel={() => setImportVisible(false)}
        onSuccess={() => setImportVisible(false)}
      />
    </div>
  );
};

export default MaterialPricePage;