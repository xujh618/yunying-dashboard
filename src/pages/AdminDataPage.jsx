import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataImportForm from '../components/DataImportForm';
import DataTable from '../components/DataTable';

const AdminDataPage = () => {
  // 产品列表
  const products = [
    { id: 'digital-library', name: '数字智库', fields: ['visits', 'users', 'registers'] },
    { id: 'smart-procurement', name: '广咨智采', fields: ['visits', 'users', 'orders', 'revenue'] },
    { id: 'material-price', name: '材价库', fields: ['visits', 'users', 'materials', 'suppliers'] }
  ];

  // 状态管理
  const [selectedProduct, setSelectedProduct] = useState('digital-library');
  const [dataEntries, setDataEntries] = useState({
    'digital-library': [
      { id: 1, platform: '数字智库', month: '2025-01', visits: 1200, users: 800, registers: 150 }
    ],
    'smart-procurement': [
      { id: 1, platform: '广咨智采', month: '2025-01', visits: 2100, users: 1200, orders: 45, revenue: 22500 }
    ],
    'material-price': [
      { id: 1, platform: '材价库', month: '2025-01', visits: 980, users: 650, materials: 3200, suppliers: 25 }
    ]
  });

  // 获取当前选中产品的配置
  const currentProduct = products.find(p => p.id === selectedProduct);

  // 处理数据导入
  const handleImportData = (importedData) => {
    // importedData 现在是包含多个表单的数组
    console.log('导入的数据:', importedData);
    
    // 这里可以根据需要处理不同表单的数据
    // 目前我们只处理第一个表单的数据
    if (importedData.length > 0) {
      const firstFormData = importedData[0].data;
      const newData = firstFormData.map((entry, index) => ({
        ...entry,
        id: dataEntries[selectedProduct].length + index + 1,
        platform: currentProduct.name
      }));
      setDataEntries(prev => ({
        ...prev,
        [selectedProduct]: [...prev[selectedProduct], ...newData]
      }));
    }
    
    alert('数据导入成功！');
  };

  // 处理手动数据录入
  const handleManualEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // 根据产品类型创建不同的数据结构
    let newEntry = {
      id: dataEntries[selectedProduct].length + 1,
      platform: currentProduct.name,
      month: formData.get('month'),
      visits: parseInt(formData.get('visits')),
      users: parseInt(formData.get('users'))
    };

    // 根据产品类型添加特定字段
    if (selectedProduct === 'digital-library') {
      newEntry.registers = parseInt(formData.get('registers'));
    } else if (selectedProduct === 'smart-procurement') {
      newEntry.orders = parseInt(formData.get('orders'));
      newEntry.revenue = parseInt(formData.get('revenue'));
    } else if (selectedProduct === 'material-price') {
      newEntry.materials = parseInt(formData.get('materials'));
      newEntry.suppliers = parseInt(formData.get('suppliers'));
    }

    setDataEntries(prev => ({
      ...prev,
      [selectedProduct]: [...prev[selectedProduct], newEntry]
    }));
    
    e.target.reset();
    alert('数据添加成功！');
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
              数据管理
            </h1>
            <p className="text-blue-200 mt-2">批量导入 · 手动录入 · 数据导出</p>
          </div>
          <div className="w-32"></div> {/* 占位，保持标题居中 */}
        </div>

        {/* 产品选择器 */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">选择产品</h2>
          <div className="flex space-x-4">
            {products.map(product => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  selectedProduct === product.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-blue-300'
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>

        {/* 产品数据管理区域 */}
        <div className="mb-12">
          {/* 数据导入表单 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6">批量数据导入 - {currentProduct.name}</h2>
            <DataImportForm 
              onImport={handleImportData} 
              product={selectedProduct}
              productName={currentProduct.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDataPage;