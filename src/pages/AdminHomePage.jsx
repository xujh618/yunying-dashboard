import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">管理后台</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/data" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">数据管理</h2>
          <p className="text-gray-600">上传和管理运营数据</p>
        </Link>
        
        <Link to="/admin/news" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">新闻管理</h2>
          <p className="text-gray-600">发布和管理新闻资讯</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomePage;
