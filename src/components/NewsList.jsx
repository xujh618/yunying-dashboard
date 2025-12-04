import React from 'react';
import DataTable from './DataTable';
import { format } from 'date-fns';

const NewsList = ({ news, onDelete }) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: '标题' },
    { key: 'author', label: '作者' },
    {
      key: 'create_time',
      label: '创建时间',
      render: (value) => format(new Date(value), 'yyyy-MM-dd HH:mm')
    },
    { key: 'status', label: '状态' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">新闻列表</h2>
      <DataTable
        columns={columns}
        data={news}
        onDelete={onDelete}
      />
    </div>
  );
};

export default NewsList;
