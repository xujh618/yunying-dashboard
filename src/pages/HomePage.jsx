import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';
import DataCard from '../components/DataCard';
import PlatformChart from '../components/PlatformChart';
import ProductCard from '../components/ProductCard';
import MonthRangeSelector from '../components/MonthRangeSelector';
import supabase from '../utils/supabase';

const HomePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [platformData, setPlatformData] = useState({});
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从Supabase获取首页数据
    const fetchHomepageData = async () => {
      setLoading(true);
      try {
        // 从Supabase获取所有产品的月度访问趋势数据
        const [digitalLibraryResult, smartProcurementResult, materialPriceResult] = await Promise.all([
          supabase.from('digital_library_monthly_trend').select('*'),
          supabase.from('smart_procurement_monthly_trend').select('*'),
          supabase.from('material_price_monthly_trend').select('*')
        ]);

        // 提取数据
        const digitalLibraryData = digitalLibraryResult.data || [];
        const smartProcurementData = smartProcurementResult.data || [];
        const materialPriceData = materialPriceResult.data || [];

        // 计算总计
        let totalVisits = 0;
        let totalUsers = 0;
        
        // 如果没有选择月份，计算所有月份的累计数据
        if (!selectedMonth) {
          // 计算数字智库所有月份的累计数据
          totalVisits += digitalLibraryData.reduce((sum, item) => sum + parseInt(item.visits || 0), 0);
          totalUsers += digitalLibraryData.reduce((sum, item) => sum + parseInt(item.users || 0), 0);
          
          // 计算材价库所有月份的累计数据
          totalVisits += materialPriceData.reduce((sum, item) => sum + parseInt(item.visits || 0), 0);
          totalUsers += materialPriceData.reduce((sum, item) => sum + parseInt(item.users || 0), 0);
        } else {
          // 如果选择了月份，只计算该月份的数据
          const filterData = (data) => {
            return data.filter(item => item.month === selectedMonth);
          };

          const digitalData = filterData(digitalLibraryData);
          const materialData = filterData(materialPriceData);

          // 计算该月份的总计，去掉广咨智采的数据，确保转换为数字类型
          totalVisits = parseInt(digitalData[0]?.visits || 0) +
                       parseInt(materialData[0]?.visits || 0);

          totalUsers = parseInt(digitalData[0]?.users || 0) +
                      parseInt(materialData[0]?.users || 0);
        }

        // 计算环比变化
        const calculateChange = (current, previous) => {
          if (!previous || previous === 0) return 0;
          return parseFloat(((current - previous) / previous * 100).toFixed(1));
        };

        // 从localStorage获取平台核心数据
        const platformCount = parseInt(localStorage.getItem('platformCount')) || 20;
        const aiToolCount = parseInt(localStorage.getItem('aiToolCount')) || 10;

        // 平台数据
        const platforms = {
          platformCount,
          aiToolCount,
          totalVisits,
          totalUsers,
          platformChange: 0, // 已移除显示
          aiToolChange: 0, // 已移除显示
          visitsChange: 0, // 暂时固定为0，后续可根据实际数据计算
          usersChange: 0 // 暂时固定为0，后续可根据实际数据计算
        };

        // 计算产品数据（用于图表展示）
        let products = [];
        
        // 根据是否选择月份计算产品数据
        if (!selectedMonth) {
          // 如果没有选择月份，使用最新月份的数据
          const latestDigital = digitalLibraryData[0] || { visits: 0, users: 0 };
          const latestProcurement = smartProcurementData[0] || { visits: 0, users: 0 };
          const latestMaterial = materialPriceData[0] || { visits: 0, users: 0 };
          
          products = [
            {
              name: '广咨智采',
              visits: latestProcurement.visits || 0,
              users: latestProcurement.users || 0
            },
            {
              name: '数字智库',
              visits: latestDigital.visits || 0,
              users: latestDigital.users || 0
            },
            {
              name: '材价库',
              visits: latestMaterial.visits || 0,
              users: latestMaterial.users || 0
            }
          ];
        } else {
          // 如果选择了月份，使用该月份的数据
          const filterData = (data) => {
            return data.filter(item => item.month === selectedMonth);
          };
          
          const digitalData = filterData(digitalLibraryData);
          const procurementData = filterData(smartProcurementData);
          const materialData = filterData(materialPriceData);
          
          products = [
            {
              name: '广咨智采',
              visits: procurementData[0]?.visits || 0,
              users: procurementData[0]?.users || 0
            },
            {
              name: '数字智库',
              visits: digitalData[0]?.visits || 0,
              users: digitalData[0]?.users || 0
            },
            {
              name: '材价库',
              visits: materialData[0]?.visits || 0,
              users: materialData[0]?.users || 0
            }
          ];
        }

        setPlatformData(platforms);
        setProductData(products);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
        // 初始化状态，确保页面能正常显示
        setPlatformData({
          platformCount: 20,
          aiToolCount: 10,
          totalVisits: 0,
          totalUsers: 0,
          platformChange: 0,
          aiToolChange: 0,
          visitsChange: 0,
          usersChange: 0
        });
        setProductData([
          {
            name: '广咨智采',
            visits: 0,
            users: 0
          },
          {
            name: '数字智库',
            visits: 0,
            users: 0
          },
          {
            name: '材价库',
            visits: 0,
            users: 0
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题和管理入口 */}
        <header className="py-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                广咨国际数字化产品运营数据总览
              </h1>
              <p className="text-blue-200 mt-2">实时监控 · 数据驱动 · 智能决策</p>
            </div>
            <Link 
              to="/admin" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>后台管理</span>
            </Link>
          </div>
        </header>

        {/* 月份筛选器 */}
        <div className="mb-8">
          <MonthRangeSelector 
            selectedMonth={selectedMonth} 
            onMonthChange={handleMonthChange} 
          />
        </div>

        {/* Hero Banner 区域 */}
        <div className="mb-10 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg">
          <BannerCarousel />
        </div>

        {/* 平台数据展示区 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            平台核心数据
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataCard 
              title="数字化平台数量" 
              value={platformData.platformCount || 20} 
              icon="📊" 
              isDark={true}
            />
            <DataCard 
              title="AI工具数量" 
              value={platformData.aiToolCount || 10} 
              icon="🤖" 
              isDark={true}
            />
            <DataCard 
              title="累计访问量" 
              value={platformData.totalVisits !== undefined ? platformData.totalVisits : 0} 
              change={platformData.visitsChange || 0} 
              icon="👁️" 
              isDark={true}
            />
            <DataCard 
              title="累计访问人数" 
              value={platformData.totalUsers !== undefined ? platformData.totalUsers : 0} 
              change={platformData.usersChange || 0} 
              icon="👥" 
              isDark={true}
            />
          </div>
        </section>

        {/* 图表展示区 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            产品访问数据
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <PlatformChart data={productData} isDark={true} />
          </div>
        </section>

        {/* 产品详细数据跳转区 */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            产品详情
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard 
              title="广咨智采" 
              icon="🛒" 
              description="智能采购平台，提供一站式采购解决方案" 
              path="/smart-procurement" 
              isDark={true}
            />
            <ProductCard 
              title="数字智库" 
              icon="📚" 
              description="知识管理平台，汇聚行业智慧与数据资源" 
              path="/digital-library" 
              isDark={true}
            />
            <ProductCard 
              title="材价库" 
              icon="🧱" 
              description="材料价格数据库，提供精准的价格参考" 
              path="/material-price" 
              isDark={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;