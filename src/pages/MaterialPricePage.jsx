import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DataCard from '../components/DataCard';
import MonthRangeSelector from '../components/MonthRangeSelector';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const MaterialPricePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [materialData, setMaterialData] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从后端API获取材价库数据
    const fetchMaterialPriceData = async () => {
      setLoading(true);
      try {
        // 获取所有相关数据
        const [monthlyTrend, monthlyCore, departmentVisits] = await Promise.all([
          fetch(`http://localhost:3002/api/data/material-price/monthly-trend`).then(res => res.json()),
          fetch(`http://localhost:3002/api/data/material-price/monthly-core`).then(res => res.json()),
          fetch(`http://localhost:3002/api/data/material-price/department-visits`).then(res => res.json())
        ]);

        // 根据选中的月份筛选数据或加总所有数据
        const filterData = (data) => {
          if (!selectedMonth) {
            // 选择全部月份，加总所有数据
            if (data.length === 0) return null;
            
            // 计算所有月份数据的总和
            const sumData = data.reduce((acc, current) => {
              const result = { ...acc };
              // 遍历所有属性，将数值类型或可转换为数值的属性进行累加
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
        const latestCore = filterData(monthlyCore);
        const latestDepartmentVisits = filterData(departmentVisits);

        // 设置核心数据
        if (latestCore && latestTrend) {
          setMaterialData({
            visits: latestTrend.visits || 0,
            visitsChange: 0, // 暂时固定为0，后续可根据实际数据计算
            users: latestTrend.users || 0,
            usersChange: 0, // 暂时固定为0，后续可根据实际数据计算
            materialPrices: latestCore.material_count || 0,
            materialPricesChange: 0, // 暂时固定为0，后续可根据实际数据计算
            standardItems: latestCore.standard_items || 0,
            standardItemsChange: 0, // 暂时固定为0，后续可根据实际数据计算
            inquiries: latestCore.inquiry_count || 0,
            inquiriesChange: 0, // 暂时固定为0，后续可根据实际数据计算
            inquiryMaterials: latestCore.inquiry_materials || 0,
            inquiryMaterialsChange: 0, // 暂时固定为0，后续可根据实际数据计算
            suppliers: latestCore.supplier_count || 0,
            suppliersChange: 0 // 暂时固定为0，后续可根据实际数据计算
          });
        }

        // 设置部门数据
        if (latestDepartmentVisits) {
          // 定义部门名称映射，将英文字段名转换为中文部门名称
          const departmentNameMap = {
            // 用户提供的映射关系
            'da_shu_ju_zhong_xin': '大数据中心',
            'zao_jia_guan_li_san_bu': '造价管理三部',
            'xin_xi_hua_guan_li_bu': '信息化管理部',
            'zao_jia_san_bu': '造价三部',
            'ji_tuan_ling_dao': '集团领导',
            'zao_jia_zi_xun_yi_bu': '造价咨询一部',
            'zao_jia_guan_li_yi_bu': '造价管理一部',
            'dong_guan_tou_zi_ping_shen_bu': '东莞投资评审部',
            'ping_shen_yi_shi': '评审一室',
            'feng_xian_ping_gu_zhong_xin': '风险评估中心',
            'zao_jia_wu_bu': '造价五部',
            'dong_guan_tou_zi_zi_xun_bu': '东莞投资咨询部',
            'shu_zi_zao_jia_san_bu_shu_zi_zao_jia_ji_shu_zhong_xin': '数字造价三部（数字造价技术中心）',
            'cai_gou_zi_xun_er_bu': '采购咨询二部',
            'zi_xun_san_bu_jiao_yu_zi_xun_bu': '咨询三部（教育咨询部）',
            'zheng_fu_cai_gou_yi_bu': '政府采购一部',
            'zong_gong_ban_chuang_xin_guan_li_bu': '总工办（创新管理部）',
            'shen_zhen_zao_jia_zi_xun_bu': '深圳造价咨询部',
            'hai_nan_zao_jia_zi_xun_bu': '海南造价咨询部',
            'gui_hua_zi_xun_er_bu_zi_xun_si_bu': '规划咨询二部（咨询四部）',
            'cai_gou_zi_xun_liu_bu': '采购咨询六部',
            'gui_hua_zi_xun_san_bu': '规划咨询三部',
            'zi_xun_ba_bu': '咨询八部',
            'da_jian_kang_zi_xun_bu': '大健康咨询部',
            'shen_zhen_xiang_mu_guan_li_bu': '深圳项目管理部',
            'jing_ying_ji_he_tong_guan_li_bu': '经营及合同管理部',
            'yue_dong_gong_zuo_zu': '粤东工作组',
            'zi_xun_liu_bu': '咨询六部',
            'ren_li_zi_yuan_bu': '人力资源部',
            'zheng_ce_yan_jiu_shi': '政策研究室',
            'shen_zhen_tou_zi_zi_xun_bu': '深圳投资咨询部',
            'gui_hua_zi_xun_yi_bu': '规划咨询一部',
            'shen_zhen_zi_gong_si_ling_dao': '深圳子公司领导',
            
            // 原有映射关系
            'finance_dept': '财务部',
            'procurement_six': '采购咨询六部',
            'procurement_four': '采购咨询四部',
            'big_data_center': '大数据中心',
            'low_carbon_energy': '低碳能源中心',
            'dongguan_leader': '东莞分公司领导',
            'dongguan_investment_review': '东莞投资评审部',
            'dongguan_investment_consult': '东莞投资咨询部',
            'risk_assessment': '风险评估中心',
            'engineering_management_leader': '工程管理分公司领导',
            'engineering_management_office': '工程管理总工室',
            'planning_consult_two': '规划咨询二部（咨询四部）',
            'planning_consult_three': '规划咨询三部（产业咨询部）',
            'planning_consult_one': '规划咨询一部',
            'rail_transit': '轨道交通部',
            'hainan_branch': '海南分公司（海南项目管理分公司）',
            'group_leader': '集团领导',
            'performance_evaluation': '绩效评价中心',
            'operation_contract': '经营及合同管理部',
            'green_low_carbon_leader': '绿色低碳事业部领导',
            'review_two': '评审二室',
            'review_one': '评审一室',
            'hr_dept': '人力资源部',
            'social_public_leader': '社会公用事业部领导',
            'shenzhen_investment_consult': '深圳投资咨询部',
            'shenzhen_cost_consult': '深圳造价咨询部',
            'digital_procurement': '数字化采购部',
            'digital_cost_bim': '数字造价部（BIM中心）',
            'investment_cost_procurement': '投资造价采购咨询部',
            'investment_cost_leader': '投资造价分公司领导',
            'project_management': '项目管理部',
            'info_center': '信息中心',
            'cost_eight': '造价八部',
            'cost_two': '造价二部',
            'cost_management_two': '造价管理二部',
            'cost_management_one': '造价管理一部',
            'cost_six': '造价六部',
            'cost_seven': '造价七部',
            'cost_three': '造价三部',
            'cost_four': '造价四部',
            'cost_five': '造价五部',
            'cost_consult_two': '造价咨询二部',
            'cost_consult_one': '造价咨询一部',
            'policy_research': '政策研究室',
            'government_procurement': '政府采购中心',
            'zhuhai_investment_consult': '珠海投资咨询部',
            'consult_eight': '咨询八部',
            'consult_planning': '咨询策划部',
            'consult_nine': '咨询九部',
            'consult_six': '咨询六部',
            'consult_three_education': '咨询三部（教育咨询部）',
            'consult_ten_government': '咨询十部（政企合作中心）',
            'consult_five': '咨询五部',
            'consult_one': '咨询一部',
            'chief_engineer_office': '总工办（创新管理部）'
          };
          
          // 动态解析所有部门数据，而不是硬编码
          const departments = [];
          
          // 遍历latestDepartmentVisits的所有属性
          for (const key in latestDepartmentVisits) {
            // 跳过month属性
            if (key === 'month') continue;
            
            // 获取部门中文名称
            const departmentName = departmentNameMap[key] || key;
            
            // 获取部门访问次数
            const visits = latestDepartmentVisits[key] || 0;
            
            // 简单计算用户数（假设访问次数的80%为用户数）
            const users = Math.floor(visits * 0.8) || 0;
            
            // 添加到部门数组
            departments.push({
              name: departmentName,
              visits: visits,
              users: users
            });
          }
          
          setDepartmentData(departments);
        }

        // 设置趋势数据
        if (monthlyTrend) {
          // 使用所有月份的数据作为趋势数据
          setTrendData({
            months: monthlyTrend.map(item => item.month),
            visits: monthlyTrend.map(item => item.visits || 0),
            users: monthlyTrend.map(item => item.users || 0)
          });
        }
      } catch (error) {
        console.error('Failed to fetch material price data:', error);
        // 初始化状态，确保页面能正常显示
        setMaterialData({
          visits: 0,
          visitsChange: 0,
          users: 0,
          usersChange: 0,
          materialPrices: 0,
          materialPricesChange: 0,
          standardItems: 0,
          standardItemsChange: 0,
          inquiries: 0,
          inquiriesChange: 0,
          inquiryMaterials: 0,
          inquiryMaterialsChange: 0,
          suppliers: 0,
          suppliersChange: 0
        });
        setDepartmentData([]);
        setTrendData({
          months: [],
          visits: [],
          users: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialPriceData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // 部门数据饼图配置 - 访问次数
  const departmentVisitsChartOptions = {
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
        text: '各部门访问次数分布',
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
  };

  // 部门数据饼图配置 - 访问人数
  const departmentUsersChartOptions = {
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
        text: '各部门访问人数分布',
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
  };

  // 部门访问次数数据
  const departmentVisitsChartData = {
    labels: departmentData ? departmentData.map(d => d.name) : [],
    datasets: [
      {
        label: '访问次数',
        data: departmentData ? departmentData.map(d => d.visits) : [],
        backgroundColor: departmentData ? departmentData.map((_, index) => {
          const hue = (index * 137.508) % 360; // 使用黄金角分布颜色
          return `hsla(${hue}, 70%, 60%, 0.8)`;
        }) : [],
        borderColor: departmentData ? departmentData.map((_, index) => {
          const hue = (index * 137.508) % 360;
          return `hsla(${hue}, 70%, 60%, 1)`;
        }) : [],
        borderWidth: 1,
      },
    ],
  };

  // 部门访问人数数据
  const departmentUsersChartData = {
    labels: departmentData ? departmentData.map(d => d.name) : [],
    datasets: [
      {
        label: '访问人数',
        data: departmentData ? departmentData.map(d => d.users) : [],
        backgroundColor: departmentData ? departmentData.map((_, index) => {
          const hue = (index * 137.508 + 60) % 360; // 使用黄金角分布颜色，偏移60度
          return `hsla(${hue}, 70%, 60%, 0.8)`;
        }) : [],
        borderColor: departmentData ? departmentData.map((_, index) => {
          const hue = (index * 137.508 + 60) % 360;
          return `hsla(${hue}, 70%, 60%, 1)`;
        }) : [],
        borderWidth: 1,
      },
    ],
  };

  // 趋势分析曲线图配置
  const trendChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#93c5fd',
          font: {
            size: 12,
            family: 'Arial, "Microsoft YaHei", "微软雅黑", sans-serif' // 添加支持中文的字体
          }
        }
      },
      title: {
        display: true,
        text: '近一年访问趋势分析',
        color: '#bfdbfe',
        font: {
          size: 16,
          family: 'Arial, "Microsoft YaHei", "微软雅黑", sans-serif' // 添加支持中文的字体
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 138, 0.9)',
        titleColor: '#bfdbfe',
        bodyColor: '#93c5fd',
        borderColor: '#3b82f6',
        borderWidth: 1,
        titleFont: {
          family: 'Arial, "Microsoft YaHei", "微软雅黑", sans-serif' // 添加支持中文的字体
        },
        bodyFont: {
          family: 'Arial, "Microsoft YaHei", "微软雅黑", sans-serif' // 添加支持中文的字体
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#93c5fd',
          font: {
            family: 'Arial, "Microsoft YaHei", "微软雅黑", sans-serif' // 添加支持中文的字体
          }
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      },
      y: {
        ticks: {
          color: '#93c5fd',
          font: {
            family: 'Arial, "Microsoft YaHei", "微软雅黑", sans-serif' // 添加支持中文的字体
          }
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      }
    }
  };

  const trendChartData = {
    labels: trendData ? trendData.months : [],
    datasets: [
      {
        label: '访问次数',
        data: trendData ? trendData.visits : [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: '访问人数',
        data: trendData ? trendData.users : [],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
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
              材价库运营数据详情
            </h1>
            <p className="text-blue-200 mt-2">访问分析 · 部门对比 · 趋势洞察</p>
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
        {materialData && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              核心运营数据
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DataCard 
                title="访问次数" 
                value={materialData.visits} 
                change={materialData.visitsChange} 
                icon="👁️" 
                isDark={true}
              />
              <DataCard 
                title="访问人数" 
                value={materialData.users} 
                change={materialData.usersChange} 
                icon="👥" 
                isDark={true}
              />
              <DataCard 
                title="材价数量" 
                value={materialData.materialPrices} 
                change={materialData.materialPricesChange} 
                icon="🧱" 
                isDark={true}
              />
              <DataCard 
                title="标准工料机数量" 
                value={materialData.standardItems} 
                change={materialData.standardItemsChange} 
                icon="📋" 
                isDark={true}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <DataCard 
                title="询价申请" 
                value={materialData.inquiries} 
                change={materialData.inquiriesChange} 
                icon="📝" 
                isDark={true}
              />
              <DataCard 
                title="询价材料" 
                value={materialData.inquiryMaterials} 
                change={materialData.inquiryMaterialsChange} 
                icon="📦" 
                isDark={true}
              />
              <DataCard 
                title="供应商数量" 
                value={materialData.suppliers} 
                change={materialData.suppliersChange} 
                icon="🏪" 
                isDark={true}
              />
            </div>
          </section>
        )}

        {/* 趋势分析图表 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            近一年访问趋势
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <Line data={trendChartData} options={trendChartOptions} />
          </div>
        </section>

        {/* 部门数据分布 */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            部门访问次数分布
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <Pie data={departmentVisitsChartData} options={departmentVisitsChartOptions} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MaterialPricePage;