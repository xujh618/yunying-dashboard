import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const NewsForm = ({ form, onSubmit, onCancel }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label="标题"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item
        name="category"
        label="分类"
        rules={[{ required: true, message: '请选择分类' }]}
      >
        <Select placeholder="请选择分类">
          <Option value="公告">公告</Option>
          <Option value="功能">功能</Option>
          <Option value="活动">活动</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="content"
        label="内容"
        rules={[{ required: true, message: '请输入内容' }]}
      >
        <TextArea rows={6} placeholder="请输入内容" />
      </Form.Item>
      <Form.Item
        name="status"
        label="状态"
        rules={[{ required: true, message: '请选择状态' }]}
      >
        <Select placeholder="请选择状态">
          <Option value="published">已发布</Option>
          <Option value="draft">草稿</Option>
        </Select>
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button onClick={onCancel} className="mr-2">
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewsForm;