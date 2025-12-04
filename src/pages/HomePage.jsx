import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';
import ProductCard from '../components/ProductCard';
import NewsList from '../components/NewsList';
import supabase from '../utils/supabase';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const products = [
    {
      id: 1,
      title: '数字智库',
      description: '提供专业的数字智库服务，涵盖政策研究、行业分析、战略咨询等内容。',
      image: 'https://via.placeholder.com/300x200?text=数字智库',
      link: '/digital-library',
      visitCount: '12,543'
    },
    {
      id: 2,
      title: '广咨智采',
      description: '智能化采购平台，提供高效、透明、合规的政府采购解决方案。',
      image: 'https://via.placeholder.com/300x200?text=广咨智采',
      link: '/smart-procurement',
      visitCount: '8,921'
    },
    {
      id: 3,
      title: '材价库',
      description: '材料价格查询服务，提供全面、准确、及时的材料价格信息。',
      image: 'https://via.placeholder.com/300x200?text=材价库',
      link: '/material-price',
      visitCount: '15,678'
    }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('create_time', { ascending: false })
        .limit(3);

      if (error) {
        throw error;
      }

      setNews(data || []);
    } catch (error) {
      console.error('获取新闻列表失败:', error);
      // 如果API调用失败，使用模拟数据
      const mockNews = [
        {
          id: 1,
          title: '广咨智采平台正式上线',
          content: '广咨智采平台是一款专注于政府采购的智能化采购平台，旨在提供高效、透明、合规的采购服务。',
          author: 'admin',
          create_time: '2024-01-15T10:30:00',
          status: 'published'
        },
        {
          id: 2,
          title: '数字智库平台更新公告',
          content: '数字智库平台将于近期进行系统更新，更新内容包括UI界面优化、功能增强等。',
          author: 'admin',
          create_time: '2024-01-10T14:20:00',
          status: 'published'
        },
        {
          id: 3,
          title: '材价库数据更新通知',
          content: '材价库已完成2024年1月份的材料价格数据更新，欢迎广大用户查询使用。',
          author: 'admin',
          create_time: '2024-01-05T09:15:00',
          status: 'published'
        }
      ];
      setNews(mockNews);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
            <span className="text-xl font-bold">运营数据看板</span>
          </div>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">首页</Link>
            <Link to="/digital-library" className="text-gray-700 hover:text-blue-600">数字智库</Link>
            <Link to="/smart-procurement" className="text-gray-700 hover:text-blue-600">广咨智采</Link>
            <Link to="/material-price" className="text-gray-700 hover:text-blue-600">材价库</Link>
            <Link to="/admin" className="btn-primary">管理后台</Link>
          </div>
        </div>
      </nav>

      {/* 轮播图 */}
      <BannerCarousel />

      {/* 产品展示 */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">平台产品</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 新闻资讯 */}
      <div className="container mx-auto p-4 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">新闻资讯</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {isLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 mt-1 line-clamp-2">{item.content}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    作者：{item.author} | 发布时间：{new Date(item.create_time).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>运营数据看板 © 2024</p>
            <p className="text-gray-400 text-sm mt-2">基于React + Vite + Supabase构建</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
