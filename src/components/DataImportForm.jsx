import React from 'react';
import { Modal, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const DataImportForm = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  const props = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        onSuccess();
      } else if (status === 'error') {
        console.error('上传失败');
      }
    },
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Import data:', values);
      onSuccess();
    });
  };

  return (
    <Modal
      title="导入数据"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item name="file">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
            <p className="ant-upload-hint">
              支持单个或批量上传，仅支持Excel文件
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button onClick={onCancel} className="mr-2">
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            导入
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DataImportForm;