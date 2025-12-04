import React, { useState } from 'react';

const NewsForm = ({ onSubmit, initialData = {}, buttonText = '创建新闻' }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [author, setAuthor] = useState(initialData.author || 'admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('标题和内容不能为空');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit({ title, content, author });
      // 重置表单
      setTitle('');
      setContent('');
      setAuthor('admin');
    } catch (err) {
      setError(err.message || '操作失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData.id ? '编辑新闻' : '创建新闻'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="form-label">标题</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="请输入新闻标题"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="content" className="form-label">内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-input h-40"
            placeholder="请输入新闻内容"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div>
          <label htmlFor="author" className="form-label">作者</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-input"
            placeholder="请输入作者名称"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : buttonText}
        </button>
      </form>
    </div>
  );
};

export default NewsForm;
