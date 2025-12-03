// 模拟数据生成函数
const generateMonthlyData = (platform, months) => {
  return months.map((month, index) => {
    // 基础数据随时间增长
    const baseMultiplier = 1 + (index * 0.1);
    
    switch(platform) {
      case '数字智库':
        return {
          month,
          visits: Math.floor(1000 * baseMultiplier + Math.random() * 500),
          users: Math.floor(700 * baseMultiplier + Math.random() * 300),
          registers: Math.floor(100 * baseMultiplier + Math.random() * 50)
        };
      case '广咨智采':
        return {
          month,
          visits: Math.floor(1800 * baseMultiplier + Math.random() * 800),
          users: Math.floor(1000 * baseMultiplier + Math.random() * 500),
          orders: Math.floor(30 * baseMultiplier + Math.random() * 20),
          revenue: Math.floor(15000 * baseMultiplier + Math.random() * 10000)
        };
      case '材价库':
        return {
          month,
          visits: Math.floor(800 * baseMultiplier + Math.random() * 400),
          users: Math.floor(500 * baseMultiplier + Math.random() * 250),
          materials: Math.floor(3000 * baseMultiplier + Math.random() * 1000),
          suppliers: Math.floor(20 * baseMultiplier + Math.random() * 10)
        };
      default:
        return {
          month,
          visits: Math.floor(1000 * baseMultiplier),
          users: Math.floor(500 * baseMultiplier)
        };
    }
  });
};

// 生成月份列表
const generateMonths = () => {
  const months = [];
  const start = new Date(2025, 0); // 2025年1月
  const end = new Date(2025, 11); // 2025年12月
  
  const currentDate = new Date(start);
  while (currentDate <= end) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    months.push(`${year}-${month}`);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return months;
};

const months = generateMonths();

// 生成各平台数据
const digitalLibraryData = generateMonthlyData('数字智库', months);
const smartProcurementData = generateMonthlyData('广咨智采', months);
const materialPriceData = generateMonthlyData('材价库', months);

// 首页聚合数据
const getHomepageData = (selectedMonth) => {
  const filterData = (data) => {
    if (!selectedMonth) return data;
    return data.filter(item => item.month === selectedMonth);
  };
  
  const digitalData = filterData(digitalLibraryData);
  const procurementData = filterData(smartProcurementData);
  const materialData = filterData(materialPriceData);
  
  // 计算总计
  const totalVisits = digitalData.reduce((sum, item) => sum + item.visits, 0) +
                     procurementData.reduce((sum, item) => sum + item.visits, 0) +
                     materialData.reduce((sum, item) => sum + item.visits, 0);
                      
  const totalUsers = digitalData.reduce((sum, item) => sum + item.users, 0) +
                    procurementData.reduce((sum, item) => sum + item.users, 0) +
                    materialData.reduce((sum, item) => sum + item.users, 0);
  
  // 计算环比变化（假设只有两个月数据时计算）
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return parseFloat(((current - previous) / previous * 100).toFixed(1));
  };
  
  const digitalLast = digitalData[digitalData.length - 1];
  const digitalPrev = digitalData[digitalData.length - 2];
  const procurementLast = procurementData[procurementData.length - 1];
  const procurementPrev = procurementData[procurementData.length - 2];
  const materialLast = materialData[materialData.length - 1];
  const materialPrev = materialData[materialData.length - 2];
  
  // 平台数据
  const platforms = {
    platformCount: 20,
    aiToolCount: 10,
    totalVisits,
    totalUsers,
    platformChange: calculateChange(20, 18), // 假设上月18个平台
    aiToolChange: calculateChange(10, 8), // 假设上月8个AI工具
    visitsChange: calculateChange(totalVisits, totalVisits * 0.95), // 假设上月访问量低5%
    usersChange: calculateChange(totalUsers, totalUsers * 0.93) // 假设上月用户数低7%
  };
  
  // 产品数据（用于图表展示）
  const products = [
    {
      name: '广咨智采',
      visits: procurementLast?.visits || 0,
      users: procurementLast?.users || 0
    },
    {
      name: '数字智库',
      visits: digitalLast?.visits || 0,
      users: digitalLast?.users || 0
    },
    {
      name: '材价库',
      visits: materialLast?.visits || 0,
      users: materialLast?.users || 0
    }
  ];
  
  return {
    platforms,
    products
  };
};

// 数字智库数据
const getDigitalLibraryData = (selectedMonth) => {
  const filterData = (data) => {
    if (!selectedMonth) return data[data.length - 1]; // 返回最新月份数据
    return data.find(item => item.month === selectedMonth) || data[data.length - 1];
  };
  
  const latestData = filterData(digitalLibraryData);
  
  // 完整的部门列表
  const departmentList = [
    '财务部', '采购咨询六部', '采购咨询四部', '大数据中心', '低碳能源中心', 
    '东莞分公司领导', '东莞投资评审部', '东莞投资咨询部', '风险评估中心', 
    '工程管理分公司领导', '工程管理总工室', '规划咨询二部（咨询四部）', 
    '规划咨询三部（产业咨询部）', '规划咨询一部', '轨道交通部', 
    '海南分公司（海南项目管理分公司）', '集团领导', '绩效评价中心', 
    '经营及合同管理部', '绿色低碳事业部领导', '评审二室', '评审一室', 
    '人力资源部', '社会公用事业部领导', '深圳投资咨询部', '深圳造价咨询部', 
    '数字化采购部', '数字造价部（BIM中心）', '投资造价采购咨询部', 
    '投资造价分公司领导', '项目管理部', '信息中心', '造价八部', '造价二部', 
    '造价管理二部', '造价管理一部', '造价六部', '造价七部', '造价三部', 
    '造价四部', '造价五部', '造价咨询二部', '造价咨询一部', '政策研究室', 
    '政府采购中心', '珠海投资咨询部', '咨询八部', '咨询策划部', '咨询九部', 
    '咨询六部', '咨询三部（教育咨询部）', '咨询十部（政企合作中心）', 
    '咨询五部', '咨询一部', '总工办（创新管理部）'
  ];
  
  // 生成部门数据
  const departments = departmentList.map((name, index) => {
    // 随机生成访问量和用户数，确保总和接近最新数据
    const visitsRatio = Math.random() * 0.05 + 0.01;
    const usersRatio = Math.random() * 0.05 + 0.01;
    return {
      name,
      visits: Math.floor(latestData.visits * visitsRatio),
      users: Math.floor(latestData.users * usersRatio)
    };
  });
  
  // 确保部门数据总和接近最新数据
  const totalVisits = departments.reduce((sum, dept) => sum + dept.visits, 0);
  const totalUsers = departments.reduce((sum, dept) => sum + dept.users, 0);
  
  // 调整部门数据，使其总和更接近最新数据
  departments.forEach(dept => {
    dept.visits = Math.floor(dept.visits * (latestData.visits / totalVisits));
    dept.users = Math.floor(dept.users * (latestData.users / totalUsers));
  });
  
  // 20个功能板块列表
  const featureList = [
    '数字智库首页', '全库搜', '数字经济 - 统计年鉴', '数字经济 - 统计公报', 
    '整表数据 - 宏观图表', '整表数据 - 指标查询', '数字经济 - 行业数据', 
    '政策法规 - 政策资料', '政策法规 - 政府公报', '政策法规 - 工程规范', 
    '地方动态 - 区域要览', '地方动态 - 时政要闻', '广咨云库 - 项目成果库', 
    '潜在 REITs 资产', '投融资案例库', '规划报告编制工具', '知识图谱 - 医疗', 
    '分析工具 - 计算器', '乡村振兴 - 政策查询', '政策可视化分析', '个人中心'
  ];
  
  // 生成功能板块数据
  const features = featureList.map(name => {
    const visits = Math.floor(Math.random() * 800) + 100;
    const users = Math.floor(Math.random() * 500) + 50;
    return {
      name,
      visits,
      users
    };
  });
  
  // 规划报告工具的详细数据
  const planningToolData = {
    projects: Math.floor(Math.random() * 50) + 10,
    members: Math.floor(Math.random() * 200) + 50,
    files: Math.floor(Math.random() * 500) + 100
  };
  
  return {
    summary: {
      visits: latestData.visits,
      visitsChange: Math.floor(Math.random() * 20) - 10,
      users: latestData.users,
      usersChange: Math.floor(Math.random() * 20) - 10,
      registers: latestData.registers,
      registersChange: Math.floor(Math.random() * 20) - 10
    },
    departments,
    features,
    planningToolData
  };
};

// 广咨智采数据
const getSmartProcurementData = (selectedMonth) => {
  const filterData = (data) => {
    if (!selectedMonth) return data[data.length - 1]; // 返回最新月份数据
    return data.find(item => item.month === selectedMonth) || data[data.length - 1];
  };
  
  const latestData = filterData(smartProcurementData);
  
  // 生成趋势数据
  const trends = {
    months: months.slice(0, 12),
    visits: smartProcurementData.slice(0, 12).map(item => item.visits),
    users: smartProcurementData.slice(0, 12).map(item => item.users),
    orders: smartProcurementData.slice(0, 12).map(item => item.orders || 0),
    revenue: smartProcurementData.slice(0, 12).map(item => item.revenue || 0)
  };
  
  return {
    summary: {
      users: latestData.users,
      usersChange: Math.floor(Math.random() * 20) - 10,
      newUsers: Math.floor(latestData.users * 0.15),
      newUsersChange: Math.floor(Math.random() * 20) - 10,
      companies: 120,
      companiesChange: Math.floor(Math.random() * 10) - 5,
      newCompanies: 15,
      newCompaniesChange: Math.floor(Math.random() * 10) - 5,
      visits: latestData.visits,
      visitsChange: Math.floor(Math.random() * 20) - 10,
      visitCount: latestData.visits,
      visitCountChange: Math.floor(Math.random() * 20) - 10,
      orders: latestData.orders || 0,
      ordersChange: Math.floor(Math.random() * 20) - 10,
      revenue: latestData.revenue || 0,
      revenueChange: Math.floor(Math.random() * 20) - 10,
      newProjects: 25,
      newProjectsChange: Math.floor(Math.random() * 20) - 10,
      serviceFee: Math.floor(latestData.revenue * 0.1) || 0,
      serviceFeeChange: Math.floor(Math.random() * 20) - 10
    },
    trends
  };
};

// 材价库数据
const getMaterialPriceData = (selectedMonth) => {
  const filterData = (data) => {
    if (!selectedMonth) return data[data.length - 1]; // 返回最新月份数据
    return data.find(item => item.month === selectedMonth) || data[data.length - 1];
  };
  
  const latestData = filterData(materialPriceData);
  
  // 生成部门数据
  const departments = [
    { name: '规划部', visits: Math.floor(latestData.visits * 0.25), users: Math.floor(latestData.users * 0.2) },
    { name: '设计部', visits: Math.floor(latestData.visits * 0.2), users: Math.floor(latestData.users * 0.18) },
    { name: '造价部', visits: Math.floor(latestData.visits * 0.3), users: Math.floor(latestData.users * 0.25) },
    { name: '工程部', visits: Math.floor(latestData.visits * 0.15), users: Math.floor(latestData.users * 0.2) },
    { name: '其他', visits: Math.floor(latestData.visits * 0.1), users: Math.floor(latestData.users * 0.17) }
  ];
  
  // 生成趋势数据（近一年）
  const trendMonths = months.slice(0, 12);
  const trendVisits = materialPriceData.slice(0, 12).map(item => item.visits);
  const trendUsers = materialPriceData.slice(0, 12).map(item => item.users);
  
  return {
    summary: {
      visits: latestData.visits,
      visitsChange: Math.floor(Math.random() * 20) - 10,
      users: latestData.users,
      usersChange: Math.floor(Math.random() * 20) - 10,
      materialPrices: latestData.materials || 0,
      materialPricesChange: Math.floor(Math.random() * 20) - 10,
      standardItems: Math.floor(latestData.materials * 0.7) || 0,
      standardItemsChange: Math.floor(Math.random() * 20) - 10,
      inquiries: Math.floor(latestData.visits * 0.15),
      inquiriesChange: Math.floor(Math.random() * 20) - 10,
      inquiryMaterials: Math.floor(latestData.materials * 0.1) || 0,
      inquiryMaterialsChange: Math.floor(Math.random() * 20) - 10,
      suppliers: latestData.suppliers || 0,
      suppliersChange: Math.floor(Math.random() * 20) - 10
    },
    departments,
    trends: {
      months: trendMonths,
      visits: trendVisits,
      users: trendUsers
    }
  };
};

// 轮播资讯数据
const getNewsData = () => {
  // 从localStorage获取数据，如果没有则使用默认数据
  const savedNews = localStorage.getItem('newsData');
  if (savedNews) {
    return JSON.parse(savedNews);
  }
  
  // 默认数据
  const defaultNews = [
    {
      id: 1,
      title: '数字智库新增AI智能搜索功能',
      content: '平台现已支持AI驱动的智能搜索，提升用户查找资料效率',
      image: 'https://picsum.photos/seed/news1/800/400',
      link: '/digital-library',
      status: 'published',
      order: 1
    },
    {
      id: 2,
      title: '广咨智采平台升级通知',
      content: '为了提供更好的用户体验，平台将于本周末进行系统升级',
      image: 'https://picsum.photos/seed/news2/800/400',
      link: '/smart-procurement',
      status: 'published',
      order: 2
    },
    {
      id: 3,
      title: '材价库新增价格预警功能',
      content: '材价库现已支持价格波动预警，帮助用户及时掌握市场动态',
      image: 'https://picsum.photos/seed/news3/800/400',
      link: '/material-price',
      status: 'published',
      order: 3
    }
  ];
  
  // 保存默认数据到localStorage
  localStorage.setItem('newsData', JSON.stringify(defaultNews));
  return defaultNews;
};

export {
  getHomepageData,
  getDigitalLibraryData,
  getSmartProcurementData,
  getMaterialPriceData,
  getNewsData
};