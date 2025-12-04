const platformData = {
  products: [
    {
      id: 1,
      name: '数字智库',
      description: '提供行业报告、数据分析、趋势预测等服务，帮助企业做出数据驱动的决策。',
      image: 'https://via.placeholder.com/300x200?text=数字智库',
    },
    {
      id: 2,
      name: '广告智采',
      description: '智能化广告采购平台，提供广告投放、效果监测、数据分析等功能。',
      image: 'https://via.placeholder.com/300x200?text=广告智采',
    },
    {
      id: 3,
      name: '材价库',
      description: '实时更新各类材料价格信息，提供价格查询、趋势分析、数据导出等服务。',
      image: 'https://via.placeholder.com/300x200?text=材价库',
    },
  ],
  operationData: {
    monthlySales: [
      { name: '1月', value: 1200 },
      { name: '2月', value: 1900 },
      { name: '3月', value: 3000 },
      { name: '4月', value: 2500 },
      { name: '5月', value: 2700 },
      { name: '6月', value: 3800 },
    ],
    userGrowth: [
      { name: '1月', value: 800 },
      { name: '2月', value: 1500 },
      { name: '3月', value: 2000 },
      { name: '4月', value: 1800 },
      { name: '5月', value: 2200 },
      { name: '6月', value: 3000 },
    ],
    businessDistribution: [
      { type: '数字智库', value: 35 },
      { type: '广告智采', value: 45 },
      { type: '材价库', value: 20 },
    ],
  },
};

export default platformData;