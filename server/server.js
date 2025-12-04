const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 确保uploads目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 示例API端点
app.get('/api', (req, res) => {
  res.json({ message: 'API服务正常运行' });
});

// 数字智库数据
app.get('/api/digital-library', (req, res) => {
  res.json({
    data: [
      { id: 1, title: '数字经济发展报告', category: '报告', views: 1234, likes: 56 },
      { id: 2, title: 'AI技术应用案例', category: '案例', views: 987, likes: 45 },
    ]
  });
});

// 广告智采数据
app.get('/api/smart-procurement', (req, res) => {
  res.json({
    data: [
      { id: 1, name: '智能广告投放系统', category: '系统', price: 19800.00 },
      { id: 2, name: '数据分析工具', category: '工具', price: 9800.00 },
    ]
  });
});

// 材价库数据
app.get('/api/material-prices', (req, res) => {
  res.json({
    data: [
      { id: 1, material_name: '水泥', unit: '吨', price: 450.00, region: '北京' },
      { id: 2, material_name: '钢筋', unit: '吨', price: 4200.00, region: '上海' },
    ]
  });
});

// 运营数据
app.get('/api/operation-data', (req, res) => {
  res.json({
    data: [
      { id: 1, indicator_name: '总销售额', value: 1250000.00, category: '销售' },
      { id: 2, indicator_name: '活跃用户数', value: 89000.00, category: '用户' },
    ]
  });
});

// 数据导入（示例）
app.post('/api/upload', (req, res) => {
  res.json({ message: '文件上传成功' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});