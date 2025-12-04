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
  getNewsData
};