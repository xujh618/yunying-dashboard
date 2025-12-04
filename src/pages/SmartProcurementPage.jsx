import React, { useState, useEffect } from 'react';
import DataCard from '../components/DataCard';
import PlatformChart from '../components/PlatformChart';
import supabase from '../utils/supabase';
import { format, subMonths } from 'date-fns';

const SmartProcurementPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    fetchPlatformData();
  }, []);

  const fetchPlatformData = async () => {
    try {
      setIsLoading(true);
      
      // 获取最近6个月的广咨智采数据
      const sixMonthsAgo = subMonths(new Date(), 5);
      const months = [];
      
      for (let i = 0; i < 6; i++) {
        const monthDate = addMonths(sixMonthsAgo, i);
        months.push(format(monthDate, 'yyyyMM'));
      }

      const { data, error } = await supabase
        .from('operation_data')
        .select('*')
        .eq('platform_name', '广咨智采')
        .in('month', months)
        .order('month', { ascending: true });

      if (error) {
        throw error;
      }

      // 整理数据，确保每个月都有数据
      const completeData = months.map(month => {
        const existingData = data.find(item => item.month === month);
        return existingData || {
          platform_name: '广咨智采',
          month,
          visit_count: 0,
          register_count: 0,
          order_count: 0,
          revenue: 0
        };
      });

      setData(completeData);
      
      // 准备图表数据
      prepareChartData(completeData);
    } catch (error) {
      console.error('获取广咨智采数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const prepareChartData = (data) => {
    const labels = data.map(item => `${item.month.slice(4)}-${item.month.slice(0, 4)}`);
    
    setChartData({
      labels,
      datasets: [
        {
          label: '访问量',
          data: data.map(item => item.visit_count),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          tension: 0.1
        },
        {
          label: '注册量',
          data: data.map(item => item.register_count),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        },
        {
          label: '订单量',
          data: data.map(item => item.order_count),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        }
      ]
    });
  };

  // 添加缺失的addMonths函数
  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center py-8">加载中...</div>;
  }

  // 计算最新月份的数据
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  // 计算环比变化
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">广咨智采 - 运营数据</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DataCard
          title="总访问量"
          value={latestData.visit_count.toLocaleString()}
          change={calculateChange(latestData.visit_count, previousData.visit_count)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>}
          color="blue"
        />
        
        <DataCard
          title="总注册量"
          value={latestData.register_count.toLocaleString()}
          change={calculateChange(latestData.register_count, previousData.register_count)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>}
          color="green"
        />
        
        <DataCard
          title="总订单量"
          value={latestData.order_count.toLocaleString()}
          change={calculateChange(latestData.order_count, previousData.order_count)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          color="orange"
        />
        
        <DataCard
          title="总营收"
          value={`¥${latestData.revenue.toLocaleString()}`}
          change={calculateChange(latestData.revenue, previousData.revenue)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>}
          color="purple"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">广咨智采 - 运营数据趋势</h2>
        <PlatformChart
          chartType="line"
          data={chartData.datasets}
          title="近6个月运营数据趋势"
          labels={chartData.labels}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">数据详情</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">月份</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">访问量</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册量</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单量</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">营收金额</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.visit_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.register_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.order_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">¥{item.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 添加缺失的addMonths函数辅助函数
const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export default SmartProcurementPage;
