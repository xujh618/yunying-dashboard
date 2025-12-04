# 运营数据看板

一个基于React + Vite + Supabase + Express构建的运营数据看板项目，用于展示和管理三个平台的运营数据。

## 项目功能

### 前端功能
- 运营数据可视化展示
- 多平台数据对比分析
- 新闻资讯管理
- 数据导入功能

### 后端功能
- 运营数据上传接口
- 新闻资讯管理接口
- 数据统计和查询接口

## 技术栈

### 前端
- React 18
- Vite
- Tailwind CSS
- Chart.js
- React Router DOM
- @supabase/supabase-js

### 后端
- Express
- @supabase/supabase-js
- Multer (文件上传)
- XLSX (Excel文件解析)

### 数据库
- Supabase (PostgreSQL)

## 项目结构

```
├── src/                 # 前端代码
│   ├── components/      # 组件
│   ├── pages/           # 页面
│   ├── utils/           # 工具函数
│   └── data/            # 数据文件
├── server/              # 后端代码
│   ├── package.json     # 后端依赖
│   └── server.js        # 后端服务
├── database_schema.sql  # 数据库 schema
├── package.json         # 前端依赖
└── vite.config.js       # Vite 配置
```

## 部署说明

### 前端部署
1. 安装依赖：`npm install`
2. 构建项目：`npm run build`
3. 部署到 Vercel 或其他静态托管服务

### 后端部署
1. 进入 server 目录：`cd server`
2. 安装依赖：`npm install`
3. 启动服务：`npm start`
4. 部署到 Vercel 或其他 Node.js 托管服务

## 数据库配置

1. 在 Supabase 创建项目
2. 执行 `database_schema.sql` 创建数据库表
3. 在 `.env` 文件中配置 Supabase 连接信息

## 环境变量

```
# 前端环境变量
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-key

# 后端环境变量
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

## 开发说明

1. 启动前端开发服务器：`npm run dev`
2. 启动后端开发服务器：`cd server && npm run dev`
3. 访问 http://localhost:3000 查看应用

## 主要接口

### 数据上传接口
- `POST /api/upload-operation-data` - 上传运营数据

### 数据查询接口
- `GET /api/operation-data` - 获取运营数据
- `GET /api/news` - 获取新闻列表

### 新闻管理接口
- `POST /api/news` - 创建新闻
- `DELETE /api/news/:id` - 删除新闻

## 许可证

MIT
