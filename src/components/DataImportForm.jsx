import React, { useState } from 'react';
import axios from 'axios';

const DataImportForm = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('请选择一个文件');
      return;
    }

    setIsUploading(true);
    setMessage('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/api/upload-operation-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(`数据上传成功！共处理 ${response.data.results.length} 条记录`);
      setFile(null);
    } catch (err) {
      console.error('上传失败:', err);
      setError(err.response?.data?.error || '数据上传失败，请稍后重试');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">数据导入</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="form-label">上传Excel文件</label>
          <input
            type="file"
            id="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="form-input"
            disabled={isUploading}
          />
        </div>
        
        {file && (
          <p className="text-sm text-gray-600">
            已选择文件: {file.name}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={isUploading}
        >
          {isUploading ? '上传中...' : '上传数据'}
        </button>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default DataImportForm;
