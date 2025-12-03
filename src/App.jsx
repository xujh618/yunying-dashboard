import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DigitalLibraryPage from './pages/DigitalLibraryPage';
import SmartProcurementPage from './pages/SmartProcurementPage';
import MaterialPricePage from './pages/MaterialPricePage';
import AdminHomePage from './pages/AdminHomePage';
import AdminNewsPage from './pages/AdminNewsPage';
import AdminDataPage from './pages/AdminDataPage';
import supabase from './utils/supabase';
import './App.css';

function App() {
  useEffect(() => {
    // 测试Supabase连接
    const testSupabaseConnection = async () => {
      try {
        // 使用简单的API调用来测试连接
        const { data, error } = await supabase.rpc('version');
        if (error) {
          console.warn('Supabase连接测试失败:', error.message);
          // 在实际项目中，可能需要使用更具体的错误处理
          // 这里我们只记录警告，不阻止应用运行
        } else {
          console.log('Supabase连接成功!');
        }
      } catch (err) {
        console.warn('Supabase连接测试出错:', err.message);
      }
    };

    testSupabaseConnection();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/digital-library" element={<DigitalLibraryPage />} />
          <Route path="/smart-procurement" element={<SmartProcurementPage />} />
          <Route path="/material-price" element={<MaterialPricePage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/news" element={<AdminNewsPage />} />
          <Route path="/admin/data" element={<AdminDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;