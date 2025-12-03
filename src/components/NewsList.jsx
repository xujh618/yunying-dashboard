import React from 'react';

const NewsList = ({ newsList, onEdit, onDelete }) => {
  const getStatusText = (status) => {
    return status === 'published' ? '已发布' : '草稿';
  };

  const getStatusColor = (status) => {
    return status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-blue-500/30">
        <thead className="bg-white/10 backdrop-blur-sm">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
              标题
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
              状态
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
              排序
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-300 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/5 backdrop-blur-sm divide-y divide-blue-500/20">
          {newsList.map((news) => (
            <tr key={news.id} className="hover:bg-white/10 transition-colors duration-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-blue-100">{news.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(news.status)}`}>
                  {getStatusText(news.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                {news.order}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(news)}
                  className="text-blue-400 hover:text-blue-300 mr-3 transition-colors"
                >
                  编辑
                </button>
                <button
                  onClick={() => onDelete(news.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;