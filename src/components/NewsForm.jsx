import React, { useState, useEffect } from 'react';

const NewsForm = ({ news, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    link: '',
    status: 'draft',
    order: 1
  });

  useEffect(() => {
    if (news) {
      setFormData(news);
    } else {
      setFormData({
        title: '',
        content: '',
        image: '',
        link: '',
        status: 'draft',
        order: 1
      });
    }
  }, [news]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-blue-200 mb-2">标题</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-300"
          placeholder="请输入资讯标题"
          required
        />
      </div>
      
      <div>
        <label className="block text-blue-200 mb-2">内容</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-300"
          placeholder="请输入资讯内容"
          required
        ></textarea>
      </div>
      
      <div>
        <label className="block text-blue-200 mb-2">图片URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-300"
          placeholder="请输入图片URL"
        />
      </div>
      
      <div>
        <label className="block text-blue-200 mb-2">链接</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-300"
          placeholder="请输入跳转链接"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-blue-200 mb-2">状态</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          >
            <option value="draft">草稿</option>
            <option value="published">发布</option>
          </select>
        </div>
        
        <div>
          <label className="block text-blue-200 mb-2">排序</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-blue-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          />
        </div>
      </div>
      
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          {news ? '更新资讯' : '添加资讯'}
        </button>
        {news && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            取消
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;