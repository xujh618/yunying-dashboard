import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <header className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
            运营数据后台管理
          </h1>
          <p className="text-blue-200 mt-2 text-lg">资讯管理 · 数据更新 · 系统配置</p>
        </header>

        {/* 切换到前端数据看板 */}
        <div className="flex justify-end mb-8">
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>查看数据看板</span>
          </Link>
        </div>

        {/* 功能模块卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 资讯管理模块 */}
          <Link 
            to="/admin/news" 
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-300">资讯管理</h2>
                <p className="text-blue-200 mt-2">轮播资讯的增删改查、状态管理和排序</p>
                <div className="mt-4 flex items-center text-blue-400">
                  <span>进入管理</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* 数据管理模块 */}
          <Link 
            to="/admin/data" 
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-500/20 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-cyan-300">数据管理</h2>
                <p className="text-blue-200 mt-2">各模块数据的导入、更新和管理</p>
                <div className="mt-4 flex items-center text-blue-400">
                  <span>进入管理</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 平台核心数据设置 */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">平台核心数据设置</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-200 mb-4">数字化平台数量</h3>
                <div className="flex space-x-4">
                  <input 
                    type="number" 
                    id="platformCount" 
                    defaultValue={localStorage.getItem('platformCount') || 20} 
                    className="flex-1 px-4 py-2 bg-white/10 border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    min="0"
                  />
                  <button 
                    onClick={() => {
                      const value = document.getElementById('platformCount').value;
                      localStorage.setItem('platformCount', value);
                      alert('数字化平台数量已更新！');
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                  >
                    保存
                  </button>
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-200 mb-4">AI工具数量</h3>
                <div className="flex space-x-4">
                  <input 
                    type="number" 
                    id="aiToolCount" 
                    defaultValue={localStorage.getItem('aiToolCount') || 10} 
                    className="flex-1 px-4 py-2 bg-white/10 border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                    min="0"
                  />
                  <button 
                    onClick={() => {
                      const value = document.getElementById('aiToolCount').value;
                      localStorage.setItem('aiToolCount', value);
                      alert('AI工具数量已更新！');
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                  >
                    保存
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm text-blue-300">
              <p>提示：更新后的数据将在首页平台核心数据中显示，刷新页面即可生效。</p>
            </div>
          </div>
        </div>

        {/* 系统信息 */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-blue-300 mb-4">系统信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-200">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-sm text-blue-400">当前版本</div>
              <div className="text-lg font-medium">v1.0.0</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-sm text-blue-400">更新时间</div>
              <div className="text-lg font-medium">2025-11-27</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-sm text-blue-400">支持功能</div>
              <div className="text-lg font-medium">资讯管理 · 数据导入</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;