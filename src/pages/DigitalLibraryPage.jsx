import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DataCard from '../components/DataCard';
import MonthRangeSelector from '../components/MonthRangeSelector';
import supabase from '../utils/supabase';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const DigitalLibraryPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [libraryData, setLibraryData] = useState(null);
  const [featureData, setFeatureData] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [planningToolModal, setPlanningToolModal] = useState(false);
  const [planningToolData, setPlanningToolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlyTrendData, setMonthlyTrendData] = useState(null); // 保存原始月度趋势数据

  useEffect(() => {
    // 从Supabase获取数字智库数据
    const fetchDigitalLibraryData = async () => {
      setLoading(true);
      try {
        // 从Supabase获取所有相关数据
        const [monthlyTrendResult, featureUsageResult, departmentVisitsResult] = await Promise.all([
          supabase.from('digital_library_monthly_trend').select('*'),
          supabase.from('digital_library_feature_usage').select('*'),
          supabase.from('digital_library_department_visits').select('*')
        ]);

        // 提取数据
        const monthlyTrend = monthlyTrendResult.data || [];
        const featureUsage = featureUsageResult.data || [];
        const departmentVisits = departmentVisitsResult.data || [];

        // 保存原始月度趋势数据，用于绘制趋势图
        setMonthlyTrendData(monthlyTrend);

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
        const latestFeatureUsage = filterData(featureUsage);
        const latestDepartmentVisits = filterData(departmentVisits);

        // 设置核心数据
        if (latestTrend) {
          setLibraryData({
            visits: latestTrend.visits || 0,
            visitsChange: 0, // 暂时固定为0，后续可根据实际数据计算
            users: latestTrend.users || 0,
            usersChange: 0, // 暂时固定为0，后续可根据实际数据计算
            registers: latestTrend.registers || 0,
            registersChange: 0 // 暂时固定为0，后续可根据实际数据计算
          });
        }

        // 设置功能板块数据
        if (latestFeatureUsage) {
          // 从数据库数据转换为前端组件所需的格式
          const features = [
            { name: '数字智库首页访问', visits: latestFeatureUsage.homepage_visits || 0, users: Math.floor((latestFeatureUsage.homepage_visits || 0) * 0.8) || 0 },
            { name: '全库搜', visits: latestFeatureUsage.search_visits || 0, users: Math.floor((latestFeatureUsage.search_visits || 0) * 0.8) || 0 },
            { name: '数字经济 - 统计年鉴', visits: latestFeatureUsage.stats_yearbook || 0, users: Math.floor((latestFeatureUsage.stats_yearbook || 0) * 0.8) || 0 },
            { name: '数字经济 - 统计公报', visits: latestFeatureUsage.stats_bulletin || 0, users: Math.floor((latestFeatureUsage.stats_bulletin || 0) * 0.8) || 0 },
            { name: '整表数据 - 宏观图表', visits: latestFeatureUsage.macro_charts || 0, users: Math.floor((latestFeatureUsage.macro_charts || 0) * 0.8) || 0 },
            { name: '整表数据 - 指标查询', visits: latestFeatureUsage.indicator_query || 0, users: Math.floor((latestFeatureUsage.indicator_query || 0) * 0.8) || 0 },
            { name: '数字经济 - 行业数据', visits: latestFeatureUsage.industry_data || 0, users: Math.floor((latestFeatureUsage.industry_data || 0) * 0.8) || 0 },
            { name: '政策法规 - 政策资料', visits: latestFeatureUsage.policy_materials || 0, users: Math.floor((latestFeatureUsage.policy_materials || 0) * 0.8) || 0 },
            { name: '政策法规 - 政府公报', visits: latestFeatureUsage.government_bulletin || 0, users: Math.floor((latestFeatureUsage.government_bulletin || 0) * 0.8) || 0 },
            { name: '政策法规 - 工程规范', visits: latestFeatureUsage.engineering_specs || 0, users: Math.floor((latestFeatureUsage.engineering_specs || 0) * 0.8) || 0 },
            { name: '地方动态 - 区域要览', visits: latestFeatureUsage.regional_news || 0, users: Math.floor((latestFeatureUsage.regional_news || 0) * 0.8) || 0 },
            { name: '地方动态 - 时政要闻', visits: latestFeatureUsage.current_affairs || 0, users: Math.floor((latestFeatureUsage.current_affairs || 0) * 0.8) || 0 },
            { name: '广咨云库 - 项目成果库', visits: latestFeatureUsage.project_results || 0, users: Math.floor((latestFeatureUsage.project_results || 0) * 0.8) || 0 },
            { name: '潜在 REITs 资产', visits: latestFeatureUsage.potential_reits || 0, users: Math.floor((latestFeatureUsage.potential_reits || 0) * 0.8) || 0 },
            { name: '投融资案例库', visits: latestFeatureUsage.investment_cases || 0, users: Math.floor((latestFeatureUsage.investment_cases || 0) * 0.8) || 0 },
            { name: '规划报告编制工具', visits: latestFeatureUsage.planning_tool || 0, users: Math.floor((latestFeatureUsage.planning_tool || 0) * 0.8) || 0 },
            { name: '知识图谱 - 医疗', visits: latestFeatureUsage.knowledge_graph_medical || 0, users: Math.floor((latestFeatureUsage.knowledge_graph_medical || 0) * 0.8) || 0 },
            { name: '分析工具 - 计算器', visits: latestFeatureUsage.calculator || 0, users: Math.floor((latestFeatureUsage.calculator || 0) * 0.8) || 0 },
            { name: '乡村振兴 - 政策查询', visits: latestFeatureUsage.rural_revitalization || 0, users: Math.floor((latestFeatureUsage.rural_revitalization || 0) * 0.8) || 0 },
            { name: '政策可视化分析', visits: latestFeatureUsage.policy_visualization || 0, users: Math.floor((latestFeatureUsage.policy_visualization || 0) * 0.8) || 0 },
            { name: '个人中心', visits: latestFeatureUsage.personal_center || 0, users: Math.floor((latestFeatureUsage.personal_center || 0) * 0.8) || 0 }
          ];
          setFeatureData(features);

          // 设置规划报告工具数据
          setPlanningToolData({
            projects: latestFeatureUsage.planning_tool_projects || 0,
            members: latestFeatureUsage.planning_tool_members || 0,
            files: latestFeatureUsage.planning_tool_files || 0
          });
        }

        // 设置部门数据
        if (latestDepartmentVisits) {
          // 定义部门名称映射，将英文字段名转换为中文部门名称
          const departmentNameMap = {
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
      } catch (error) {
        console.error('Failed to fetch digital library data:', error);
        // 初始化状态，确保页面能正常显示
        setLibraryData({
          visits: 0,
          visitsChange: 0,
          users: 0,
          usersChange: 0,
          registers: 0,
          registersChange: 0
        });
        setFeatureData([]);
        setDepartmentData([]);
        setMonthlyTrendData([]);
        setPlanningToolData({
          projects: 0,
          members: 0,
          files: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDigitalLibraryData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // 处理规划报告工具点击
  const handlePlanningToolClick = () => {
    setPlanningToolModal(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setPlanningToolModal(false);
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

  // 月度趋势曲线图配置
  const monthlyTrendChartOptions = {
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
        text: '月度访问趋势',
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
          color: '#93c5fd',
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      },
      y: {
        ticks: {
          color: '#93c5fd'
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      }
    }
  };

  // 月度趋势曲线图数据
  const monthlyTrendChartData = {
    labels: monthlyTrendData ? monthlyTrendData.map(item => item.month) : [],
    datasets: [
      {
        label: '月度访问次数',
        data: monthlyTrendData ? monthlyTrendData.map(item => item.visits) : [],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: '月度访问人数',
        data: monthlyTrendData ? monthlyTrendData.map(item => item.users) : [],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: '注册人数',
        data: monthlyTrendData ? monthlyTrendData.map(item => item.registers) : [],
        borderColor: 'rgba(234, 179, 8, 1)',
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // 功能板块柱状图配置
  const featureChartOptions = {
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
        text: '功能板块使用数据',
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
          color: '#93c5fd',
          font: { size: 10 },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      },
      y: {
        ticks: {
          color: '#93c5fd'
        },
        grid: {
          color: 'rgba(147, 197, 253, 0.2)'
        }
      }
    }
  };

  // 过滤掉"数字智库首页访问"数据，并按访问次数从高到低排序
  const filteredFeatureData = featureData ? featureData.filter(f => f.name !== '数字智库首页访问') : null;
  const sortedFeatureData = filteredFeatureData ? [...filteredFeatureData].sort((a, b) => b.visits - a.visits) : null;

  const featureChartData = {
    labels: sortedFeatureData ? sortedFeatureData.map(f => f.name) : [],
    datasets: [
      {
        label: '使用次数',
        data: sortedFeatureData ? sortedFeatureData.map(f => f.visits) : [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }
    ],
  };

  // 计算使用最高和最低的三个功能（过滤掉"数字智库首页访问"）
  const getTopBottomFeatures = () => {
    if (!featureData) return { top: [], bottom: [] };
    
    const filteredFeatures = featureData.filter(f => f.name !== '数字智库首页访问');
    const sortedFeatures = [...filteredFeatures].sort((a, b) => b.visits - a.visits);
    return {
      top: sortedFeatures.slice(0, 3),
      bottom: sortedFeatures.slice(-3).reverse()
    };
  };

  const { top, bottom } = getTopBottomFeatures();

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
              数字智库运营数据详情
            </h1>
            <p className="text-blue-200 mt-2">功能分析 · 部门分布 · 数据洞察</p>
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
        {libraryData && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              核心数据指标
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DataCard 
                title="访问次数" 
                value={libraryData.visits} 
                change={libraryData.visitsChange} 
                icon="👁️" 
                isDark={true}
              />
              <DataCard 
                title="访问人数" 
                value={libraryData.users} 
                change={libraryData.usersChange} 
                icon="👥" 
                isDark={true}
              />
              <DataCard 
                title="注册用户数" 
                value={libraryData.registers} 
                change={libraryData.registersChange} 
                icon="📝" 
                isDark={true}
              />
            </div>
          </section>
        )}

        {/* 月度访问趋势图 - 仅在选择全部月份时显示 */}
        {!selectedMonth && monthlyTrendData && monthlyTrendData.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              月度访问趋势
            </h2>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <Line data={monthlyTrendChartData} options={monthlyTrendChartOptions} />
            </div>
          </section>
        )}

        {/* 部门数据分布 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            部门数据分布
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <Pie data={departmentVisitsChartData} options={departmentVisitsChartOptions} />
          </div>
        </section>

        {/* 功能板块分析 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            功能板块分析
          </h2>

          {/* 功能使用TOP3和BOTTOM3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* TOP3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                使用最高的3个功能
              </h3>
              <div className="space-y-4">
                {top.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <div className="flex items-center">
                      <span className="text-yellow-400 font-bold mr-3">{index + 1}</span>
                      <span className="text-blue-200">{feature.name}</span>
                    </div>
                    <span className="text-white font-bold">{feature.visits} 次</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* BOTTOM3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                使用最低的3个功能
              </h3>
              <div className="space-y-4">
                {bottom.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <div className="flex items-center">
                      <span className="text-gray-400 font-bold mr-3">{index + 1}</span>
                      <span className="text-blue-200">{feature.name}</span>
                    </div>
                    <span className="text-white font-bold">{feature.visits} 次</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg mb-8">
            <Bar data={featureChartData} options={featureChartOptions} />
          </div>

          {/* 功能板块列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFeatureData && filteredFeatureData.map((feature, index) => (
              <div 
                key={index} 
                className={`bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg cursor-pointer transition-all duration-300 hover:bg-white/20 ${feature.name === '规划报告编制工具' ? 'border-2 border-blue-400' : ''}`}
                onClick={feature.name === '规划报告编制工具' ? handlePlanningToolClick : undefined}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-blue-300">{feature.name}</h3>
                  {feature.name === '规划报告编制工具' && (
                    <span className="text-blue-400 text-sm">点击查看详情</span>
                  )}
                </div>
                <div className="mt-2">
                  <div>
                    <p className="text-sm text-blue-200">使用次数</p>
                    <p className="text-xl font-bold text-white">{feature.visits}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 规划报告工具详情弹窗 */}
      {planningToolModal && planningToolData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-blue-800 rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-300">规划报告编制工具详情</h2>
              <button 
                onClick={closeModal} 
                className="text-white hover:text-blue-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                <h3 className="text-blue-200 text-sm mb-2">项目数</h3>
                <p className="text-3xl font-bold text-white">{planningToolData.projects}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                <h3 className="text-blue-200 text-sm mb-2">成员数</h3>
                <p className="text-3xl font-bold text-white">{planningToolData.members}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                <h3 className="text-blue-200 text-sm mb-2">上传文件数量</h3>
                <p className="text-3xl font-bold text-white">{planningToolData.files}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button 
                onClick={closeModal} 
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalLibraryPage;