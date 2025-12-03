import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';
import { getNewsData } from '../data/mockData';

const AdminNewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    // 从模拟数据获取资讯列表
    const data = getNewsData();
    setNewsList(data);
  }, []);

  const handleAddNews = (news) => {
    const newNews = {
      ...news,
      id: newsList.length + 1
    };
    const updatedNewsList = [...newsList, newNews];
    setNewsList(updatedNewsList);
    // 保存到localStorage
    localStorage.setItem('newsData', JSON.stringify(updatedNewsList));
    alert('资讯添加成功！');
  };

  const handleUpdateNews = (updatedNews) => {
    const updatedNewsList = newsList.map(news => 
      news.id === updatedNews.id ? updatedNews : news
    );
    setNewsList(updatedNewsList);
    setEditingNews(null);
    // 保存到localStorage
    localStorage.setItem('newsData', JSON.stringify(updatedNewsList));
    alert('资讯更新成功！');
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('确定要删除这条资讯吗？')) {
      const updatedNewsList = newsList.filter(news => news.id !== id);
      setNewsList(updatedNewsList);
      // 保存到localStorage
      localStorage.setItem('newsData', JSON.stringify(updatedNewsList));
      alert('资讯删除成功！');
    }
  };

  const handleEditNews = (news) => {
    setEditingNews(news);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* 导航和页面标题 */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/admin" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>返回管理首页</span>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              轮播资讯管理
            </h1>
            <p className="text-blue-200 mt-2">动态更新 · 实时发布 · 智能管理</p>
          </div>
          <div className="w-32"></div> {/* 占位，保持标题居中 */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 资讯表单 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6">
              {editingNews ? '编辑资讯' : '新增资讯'}
            </h2>
            <NewsForm 
              news={editingNews}
              onSubmit={editingNews ? handleUpdateNews : handleAddNews}
              onCancel={() => setEditingNews(null)}
            />
          </div>

          {/* 资讯列表 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6">资讯列表</h2>
            <NewsList 
              newsList={newsList}
              onEdit={handleEditNews}
              onDelete={handleDeleteNews}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsPage;