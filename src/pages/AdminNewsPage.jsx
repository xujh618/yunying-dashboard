import React, { useState, useEffect } from 'react';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';
import supabase from '../utils/supabase';

const AdminNewsPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('create_time', { ascending: false });

      if (error) {
        throw error;
      }

      setNews(data || []);
    } catch (error) {
      console.error('获取新闻列表失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNews = async (newsData) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert(newsData)
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      setNews([data, ...news]);
    } catch (error) {
      console.error('创建新闻失败:', error);
      throw error;
    }
  };

  const handleDeleteNews = async (newsItem) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', newsItem.id);

      if (error) {
        throw error;
      }

      setNews(news.filter(item => item.id !== newsItem.id));
    } catch (error) {
      console.error('删除新闻失败:', error);
      alert('删除失败，请稍后重试');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">新闻管理</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <NewsForm onSubmit={handleCreateNews} />
        </div>
        
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            <NewsList news={news} onDelete={handleDeleteNews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNewsPage;
