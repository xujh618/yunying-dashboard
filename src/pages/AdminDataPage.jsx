import React, { useState, useEffect } from 'react';
import DataImportForm from '../components/DataImportForm';
import MonthSelector from '../components/MonthSelector';
import supabase from '../utils/supabase';

const AdminDataPage = () => {
  const [currentMonth, setCurrentMonth] = useState('202401');
  const [operationData, setOperationData] = useState([]);

  useEffect(() => {
    fetchOperationData();
  }, [currentMonth]);

  const fetchOperationData = async () => {
    try {
      const { data, error } = await supabase
        .from('operation_data')
        .select('*')
        .eq('month', currentMonth);

      if (error) {
        throw error;
      }

      setOperationData(data || []);
    } catch (error) {
      console.error('获取运营数据失败:', error);
    }
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">数据管理</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DataImportForm />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">运营数据列表</h2>
              <MonthSelector onMonthChange={handleMonthChange} initialMonth={new Date()} />
            </div>
            
            {operationData.length === 0 ? (
              <p className="text-gray-500">暂无数据</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平台名称</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">访问量</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册量</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单量</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">营收金额</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operationData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.platform_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.visit_count}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.register_count}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.order_count}</td>
                      <td className="px-6 py-4 whitespace-nowrap">¥{item.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDataPage;
