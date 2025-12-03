import React, { useState } from 'react';

const DataTable = ({ data, product }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'asc') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // 根据产品类型获取表格列配置
  const getColumns = () => {
    switch (product) {
      case 'digital-library':
        return [
          { key: 'platform', label: '平台' },
          { key: 'month', label: '月份' },
          { key: 'visits', label: '访问次数' },
          { key: 'users', label: '访问人数' },
          { key: 'registers', label: '注册用户数' }
        ];
      case 'smart-procurement':
        return [
          { key: 'platform', label: '平台' },
          { key: 'month', label: '月份' },
          { key: 'visits', label: '访问次数' },
          { key: 'users', label: '访问人数' },
          { key: 'orders', label: '订单数' },
          { key: 'revenue', label: '成交金额' }
        ];
      case 'material-price':
        return [
          { key: 'platform', label: '平台' },
          { key: 'month', label: '月份' },
          { key: 'visits', label: '访问次数' },
          { key: 'users', label: '访问人数' },
          { key: 'materials', label: '材价数量' },
          { key: 'suppliers', label: '供应商数量' }
        ];
      default:
        return [
          { key: 'platform', label: '平台' },
          { key: 'month', label: '月份' },
          { key: 'visits', label: '访问次数' },
          { key: 'users', label: '访问人数' }
        ];
    }
  };

  const columns = getColumns();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-blue-500/30">
        <thead className="bg-white/10 backdrop-blur-sm">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider cursor-pointer hover:text-blue-200 transition-colors"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white/5 backdrop-blur-sm divide-y divide-blue-500/20">
          {sortedData.map((entry) => (
            <tr key={`${entry.platform}-${entry.month}`} className="hover:bg-white/10 transition-colors duration-300">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-blue-200">
                  {column.key === 'revenue' ? `¥${entry[column.key] || '-'}` : entry[column.key] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;