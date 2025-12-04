# 运营数据看板

## 项目简介

运营数据看板是一个用于展示和管理运营数据的Web应用，支持数字智库、广告智采、材价库等功能模块。

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Ant Design
- ECharts
- Supabase

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
├── src/
│   ├── api/          # API请求
│   ├── components/   # 通用组件
│   ├── pages/        # 页面组件
│   ├── utils/        # 工具函数
│   ├── App.jsx       # 应用入口组件
│   └── main.jsx      # 应用入口文件
├── .env              # 环境变量
├── .env.example      # 环境变量示例
├── package.json      # 项目配置
├── tailwind.config.js # Tailwind CSS配置
├── vite.config.js    # Vite配置
└── README.md         # 项目说明
```

## 功能模块

1. **数字智库**：展示各类运营数据和报表
2. **广告智采**：智能采购平台
3. **材价库**：材料价格管理
4. **管理后台**：数据管理和系统配置

## 环境变量

请参考`.env.example`文件配置环境变量。

## 部署

### Vercel

直接部署到Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yunying-dashboard)

### 其他方式

可以部署到任何支持静态网站的平台，如Netlify、GitHub Pages等。

## 许可证

MIT