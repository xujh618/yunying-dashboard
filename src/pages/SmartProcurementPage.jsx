import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import DataCard from '../components/DataCard';
import MonthRangeSelector from '../components/MonthRangeSelector';
import supabase from '../utils/supabase';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const SmartProcurementPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [procurementData, setProcurementData] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从Supabase获取广咨智采数据
    const fetchSmartProcurementData = async () => {
      setLoading(true);
      try {
        // 从Supabase获取所有相关数据
        const [monthlyTrendResult, monthlyUsersResult] = await Promise.all([
          supabase.from('smart_procurement_monthly_trend').select('*'),
          supabase.from('smart_procurement_monthly_users').select('*')
        ]);

        // 提取数据
        const monthlyTrend = monthlyTrendResult.data || [];
        const monthlyUsers = monthlyUsersResult.data || [];

        // 根据选中的月份筛选数据或加总所有数据
        const filterData = (data) => {
          if (!selectedMonth) {
            // 选择全部月份，加总所有数据
            if (data.length === 0) return null;
            
            // 计算所有月份数据的总和
            const sumData = data.reduce((acc, current) => {
              const result = { ...acc };
              // 遍历所有属性，将可转换为数值的属性进行累加
              Object.keys(current).forEach(key => {
                if (key !== 'month') {
                  const value = parseFloat(current[key]);
                  if (!isNaN(value)) {
                    result[key] = (result[key] || 0) + value;
                  }
                }
              });
              return result;
            }, {});
            
            return sumData;
          }
          // 选择特定月份，返回匹配的数据
          return data.find(item => item.month === selectedMonth) || null;
        };

        const latestTrend = filterData(monthlyTrend);
        const latestUsers = filterData(monthlyUsers);

        // 设置核心数据
        if (latestUsers) {
          setProcurementData({
            users: latestUsers.total_users || 0,
            usersChange: 0, // 暂时固定为0，后续可根据实际数据计算
            newUsers: latestUsers.new_users || 0,
            newUsersChange: 0, // 暂时固定为0，后续可根据实际数据计算
            companies: latestUsers.companies || 0,
            companiesChange: 0, // 暂时固定为0，后续可根据实际数据计算
            newCompanies: latestUsers.new_companies || 0,
            newCompaniesChange: 0, // 暂时固定为0，后续可根据实际数据计算
            visits: latestUsers.page_views || 0,
            visitsChange: 0, // 暂时固定为0，后续可根据实际数据计算
            visitCount: latestUsers.visit_count || 0,
            visitCountChange: 0, // 暂时固定为0，后续可根据实际数据计算
            orders: latestUsers.order_count || 0,
            ordersChange: 0, // 暂时固定为0，后续可根据实际数据计算
            revenue: latestUsers.revenue || 0,
            revenueChange: 0, // 暂时固定为0，后续可根据实际数据计算
            newProjects: latestUsers.new_projects || 0,
            newProjectsChange: 0, // 暂时固定为0，后续可根据实际数据计算
            serviceFee: latestUsers.service_fee || 0,
            serviceFeeChange: 0 // 暂时固定为0，后续可根据实际数据计算
          });
        }

        // 设置趋势数据
        if (monthlyTrend && monthlyUsers) {
          // 合并两个数据源的趋势数据
          const months = monthlyTrend.map(item => item.month);
          const visits = monthlyTrend.map(item => item.visits || 0);
          const users = monthlyTrend.map(item => item.users || 0);
          const orders = monthlyUsers.map(item => item.order_count || 0);
          const serviceFee = monthlyUsers.map(item => item.service_fee || 0);

          setTrendData({
            months,
            visits,
            users,
            orders,
            serviceFee
          });
        }
      } catch (error) {
        console.error('Failed to fetch smart procurement data:', error);
        // 初始化状态，确保页面能正常显示
        setProcurementData({
          users: 0,
          usersChange: 0,
          newUsers: 0,
          newUsersChange: 0,
          companies: 0,
          companiesChange: 0,
          newCompanies: 0,
          newCompaniesChange: 0,
          visits: 0,
          visitsChange: 0,
          visitCount: 0,
          visitCountChange: 0,
          orders: 0,
          ordersChange: 0,
          revenue: 0,
          revenueChange: 0,
          newProjects: 0,
          newProjectsChange: 0,
          serviceFee: 0,
          serviceFeeChange: 0
        });
        setTrendData({
          months: [],
          visits: [],
          users: [],
          orders: [],
          serviceFee: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSmartProcurementData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // 趋势图表配置
  const trendChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#93c5fd',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: '平台运营趋势',
        color: '#bfdbfe',
        font: { size: 16 }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 138, 0.9)',
        titleColor: '#bfdbfe',
        bodyColor: '#93c5fd',
        borderColor: '#3b82f6',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#93c5fd'
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: '服务费收入',
          color: '#93c5fd'
        },
        ticks: {
          color: '#93c5fd'
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: '订单数量',
          color: '#fbbf24'
        },
        ticks: {
          color: '#fbbf24'
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  const trendChartData = {
    labels: trendData ? trendData.months : [],
    datasets: [
      {
        label: '服务费收入',
        data: trendData ? trendData.serviceFee : [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        type: 'bar',
        yAxisID: 'y',
      },
      {
        label: '订单数',
        data: trendData ? trendData.orders : [],
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        borderColor: 'rgba(234, 179, 8, 1)',
        borderWidth: 2,
        type: 'line',
        yAxisID: 'y1',
        tension: 0.4,
        pointBackgroundColor: '#fbbf24',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <header className="py-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <Link 
                to="/" 
                className="bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回首页
              </Link>
              <Link 
                to="/admin" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                后台管理
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              广咨智采运营数据详情
            </h1>
            <p className="text-blue-200 mt-2">用户分析 · 订单数据 · 趋势洞察</p>
          </div>
        </header>

        {/* 月份筛选器 */}
        <div className="mb-8">
          <MonthRangeSelector 
            selectedMonth={selectedMonth} 
            onMonthChange={handleMonthChange} 
          />
        </div>

        {/* 核心数据卡片区 */}
        {procurementData && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              核心业务数据
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DataCard 
                title="用户数量" 
                value={procurementData.users} 
                change={procurementData.usersChange} 
                icon="👥" 
                isDark={true}
              />
              <DataCard 
                title="新增用户数量" 
                value={procurementData.newUsers} 
                change={procurementData.newUsersChange} 
                icon="👤" 
                isDark={true}
              />
              <DataCard 
                title="企业数量" 
                value={procurementData.companies} 
                change={procurementData.companiesChange} 
                icon="🏢" 
                isDark={true}
              />
              <DataCard 
                title="新增企业数量" 
                value={procurementData.newCompanies} 
                change={procurementData.newCompaniesChange} 
                icon="🏭" 
                isDark={true}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <DataCard 
                title="订单数量" 
                value={procurementData.orders} 
                change={procurementData.ordersChange} 
                icon="📋" 
                isDark={true}
              />
              <DataCard 
                title="服务费收入" 
                value={procurementData.serviceFee} 
                change={procurementData.serviceFeeChange} 
                icon="💵" 
                isDark={true}
              />
            </div>
          </section>
        )}

        {/* 趋势图表区 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            运营趋势分析
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <Chart type="bar" data={trendChartData} options={trendChartOptions} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SmartProcurementPage;