import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const DataImportForm = ({ onImport, product, productName }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 根据产品类型生成不同的模板
  const getTemplateContent = () => {
    switch (product) {
      case 'digital-library':
        return `# 1.月度访问趋势
月份,访问次数,访问人数,注册人数
2025-01,1000,800,150
2025-02,1200,950,180
2025-03,1350,1050,200

# 2.各月各功能板块使用情况
统计月份,数字智库首页访问,全库搜,数字经济 - 统计年鉴,数字经济 - 统计公报,整表数据 - 宏观图表,整表数据 - 指标查询,数字经济 - 行业数据,政策法规 - 政策资料,政策法规 - 政府公报,政策法规 - 工程规范,地方动态 - 区域要览,地方动态 - 时政要闻,广咨云库 - 项目成果库,潜在 REITs 资产,投融资案例库,规划报告编制工具,规划报告编制工具-项目数,规划报告编制工具-项目成员数,规划报告编制工具-上传文件数量,知识图谱 - 医疗,分析工具 - 计算器,乡村振兴 - 政策查询,政策可视化分析,个人中心
2025-01,500,450,300,280,250,230,200,180,160,140,120,100,90,80,70,60,15,45,120,50,40,30,20,10

# 3.各月各部门访问次数分布表
统计月份,财务部,采购咨询六部,采购咨询四部,大数据中心,低碳能源中心,东莞分公司领导,东莞投资评审部,东莞投资咨询部,风险评估中心,工程管理分公司领导,工程管理总工室,规划咨询二部（咨询四部）,规划咨询三部（产业咨询部）,规划咨询一部,轨道交通部,海南分公司（海南项目管理分公司）,集团领导,绩效评价中心,经营及合同管理部,绿色低碳事业部领导,评审二室,评审一室,人力资源部,社会公用事业部领导,深圳投资咨询部,深圳造价咨询部,数字化采购部,数字造价部（BIM中心）,投资造价采购咨询部,投资造价分公司领导,项目管理部,信息中心,造价八部,造价二部,造价管理二部,造价管理一部,造价六部,造价七部,造价三部,造价四部,造价五部,造价咨询二部,造价咨询一部,政策研究室,政府采购中心,珠海投资咨询部,咨询八部,咨询策划部,咨询九部,咨询六部,咨询三部（教育咨询部）,咨询十部（政企合作中心）,咨询五部,咨询一部,总工办（创新管理部）
2025-01,50,45,40,35,30,25,20,15,10,8,7,6,5,4,3,2,1,5,4,3,2,1,5,4,3,2,1,5,4,3,2,1,5,4,3,2,1,5,4,3,2,1,5,4,3,2,1,5,4,3,2,1,5,4,3`;
      case 'smart-procurement':
        return `# 1.月度访问趋势
月份,访问次数,访问人数,注册人数
2025-01,2000,1200,300
2025-02,2200,1350,350
2025-03,2400,1500,400

# 2.月度用户和业务数据
月份,用户数量,新增用户数量,企业数量,新增企业数量,平台浏览量,访问人数,访问次数,订单数量,成交金额,新增采购项目,服务费收入
2025-01,5000,300,120,15,2000,1200,2000,50,25000,25,2500`;
      case 'material-price':
        return `# 1.月度访问趋势
月份,访问次数,访问人数
2025-01,900,600
2025-02,1000,650
2025-03,1100,700

# 2.各月核心数据
月份,材价数量,标准工料机数量,询价申请数据,询价材料数据,供应商数量
2025-01,3000,2100,150,300,20
2025-02,3200,2240,160,320,22
2025-03,3500,2450,180,360,25

# 3.各月部门访问数据
月份,大数据中心,造价管理三部,信息化管理部,造价三部,集团领导,造价咨询一部,造价管理一部,东莞投资评审部,评审一室,风险评估中心,造价五部,东莞投资咨询部,数字造价三部（数字造价技术中心）,采购咨询二部,咨询三部（教育咨询部）,政府采购一部,总工办（创新管理部）,深圳造价咨询部,海南造价咨询部,规划咨询二部（咨询四部）,采购咨询六部,规划咨询三部,咨询八部,大健康咨询部,深圳项目管理部,经营及合同管理部,粤东工作组,咨询六部,人力资源部,政策研究室,深圳投资咨询部,规划咨询一部,深圳子公司领导
2025-01,155,0,1,6,3,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0`;
      default:
        return `月份,访问次数,访问人数
2025-01,1000,800
2025-02,1200,950
2025-03,1350,1050`;
    }
  };

  // 根据产品类型获取表头
  const getHeaders = () => {
    switch (product) {
      case 'digital-library':
        return ['month', 'visits', 'users', 'registers'];
      case 'smart-procurement':
        return ['month', 'visits', 'users', 'orders', 'revenue'];
      case 'material-price':
        return ['month', 'visits', 'users', 'materials', 'suppliers'];
      default:
        return ['month', 'visits', 'users'];
    }
  };

  const handleImport = async () => {
    if (!file) {
      alert('请先选择文件');
      return;
    }

    try {
      console.log('开始上传文件:', file.name);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('product', product);
      console.log('FormData已创建，产品类型:', product);

      console.log('发送请求到:', 'http://localhost:3002/api/upload');
      const response = await fetch('http://localhost:3002/api/upload', {
        method: 'POST',
        body: formData
      });

      console.log('收到响应，状态码:', response.status);
      if (!response.ok) {
        throw new Error('上传失败，状态码: ' + response.status);
      }

      const result = await response.json();
      console.log('上传成功:', result);
      alert('数据导入成功！');
      
      // 通知父组件数据已更新
      if (onImport) {
        onImport([]);
      }
    } catch (error) {
      console.error('上传错误:', error);
      console.error('错误堆栈:', error.stack);
      alert('数据导入失败，请检查文件格式是否正确或服务器是否正常运行！');
    } finally {
      // 无论成功还是失败，都重置file状态，确保可以再次选择文件
      setFile(null);
      // 重置文件输入框的值，确保可以选择同一个文件
      const fileInput = document.getElementById('file-input');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    // 创建工作簿
    const workbook = XLSX.utils.book_new();
    
    // 根据产品类型生成不同的sheet
    switch (product) {
      case 'digital-library':
        // 月度访问趋势
        const monthlyTrendData = [
          ['月份', '访问次数', '访问人数', '注册人数'],
          ['2025-01', 1000, 800, 150],
          ['2025-02', 1200, 950, 180],
          ['2025-03', 1350, 1050, 200]
        ];
        const monthlyTrendWs = XLSX.utils.aoa_to_sheet(monthlyTrendData);
        XLSX.utils.book_append_sheet(workbook, monthlyTrendWs, '月度访问趋势');
        
        // 各月各功能板块使用情况
        const featureUsageData = [
          ['统计月份', '数字智库首页访问', '全库搜', '数字经济 - 统计年鉴', '数字经济 - 统计公报', '整表数据 - 宏观图表', '整表数据 - 指标查询', '数字经济 - 行业数据', '政策法规 - 政策资料', '政策法规 - 政府公报', '政策法规 - 工程规范', '地方动态 - 区域要览', '地方动态 - 时政要闻', '广咨云库 - 项目成果库', '潜在 REITs 资产', '投融资案例库', '规划报告编制工具', '规划报告编制工具-项目数', '规划报告编制工具-项目成员数', '规划报告编制工具-上传文件数量', '知识图谱 - 医疗', '分析工具 - 计算器', '乡村振兴 - 政策查询', '政策可视化分析', '个人中心'],
          ['2025-01', 500, 450, 300, 280, 250, 230, 200, 180, 160, 140, 120, 100, 90, 80, 70, 60, 15, 45, 120, 50, 40, 30, 20, 10]
        ];
        const featureUsageWs = XLSX.utils.aoa_to_sheet(featureUsageData);
        XLSX.utils.book_append_sheet(workbook, featureUsageWs, '各功能板块使用情况');
        
        // 各月各部门访问次数分布表
        const departmentUsageData = [
          ['统计月份', '财务部', '采购咨询六部', '采购咨询四部', '大数据中心', '低碳能源中心', '东莞分公司领导', '东莞投资评审部', '东莞投资咨询部', '风险评估中心', '工程管理分公司领导', '工程管理总工室', '规划咨询二部（咨询四部）', '规划咨询三部（产业咨询部）', '规划咨询一部', '轨道交通部', '海南分公司（海南项目管理分公司）', '集团领导', '绩效评价中心', '经营及合同管理部', '绿色低碳事业部领导', '评审二室', '评审一室', '人力资源部', '社会公用事业部领导', '深圳投资咨询部', '深圳造价咨询部', '数字化采购部', '数字造价部（BIM中心）', '投资造价采购咨询部', '投资造价分公司领导', '项目管理部', '信息中心', '造价八部', '造价二部', '造价管理二部', '造价管理一部', '造价六部', '造价七部', '造价三部', '造价四部', '造价五部', '造价咨询二部', '造价咨询一部', '政策研究室', '政府采购中心', '珠海投资咨询部', '咨询八部', '咨询策划部', '咨询九部', '咨询六部', '咨询三部（教育咨询部）', '咨询十部（政企合作中心）', '咨询五部', '咨询一部', '总工办（创新管理部）'],
          ['2025-01', 50, 45, 40, 35, 30, 25, 20, 15, 10, 8, 7, 6, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3]
        ];
        const departmentUsageWs = XLSX.utils.aoa_to_sheet(departmentUsageData);
        XLSX.utils.book_append_sheet(workbook, departmentUsageWs, '各部门访问分布');
        break;
        
      case 'smart-procurement':
        // 月度访问趋势
        const spMonthlyTrendData = [
          ['月份', '访问次数', '访问人数', '注册人数'],
          ['2025-01', 2000, 1200, 300],
          ['2025-02', 2200, 1350, 350],
          ['2025-03', 2400, 1500, 400]
        ];
        const spMonthlyTrendWs = XLSX.utils.aoa_to_sheet(spMonthlyTrendData);
        XLSX.utils.book_append_sheet(workbook, spMonthlyTrendWs, '月度访问趋势');
        
        // 月度用户和业务数据
        const spUserBusinessData = [
          ['月份', '用户数量', '新增用户数量', '企业数量', '新增企业数量', '平台浏览量', '访问人数', '访问次数', '订单数量', '成交金额', '新增采购项目', '服务费收入'],
          ['2025-01', 5000, 300, 120, 15, 2000, 1200, 2000, 50, 25000, 25, 2500]
        ];
        const spUserBusinessWs = XLSX.utils.aoa_to_sheet(spUserBusinessData);
        XLSX.utils.book_append_sheet(workbook, spUserBusinessWs, '用户和业务数据');
        break;
        
      case 'material-price':
        // 月度访问趋势
        const mpMonthlyTrendData = [
          ['月份', '访问次数', '访问人数'],
          ['2025-01', 900, 600],
          ['2025-02', 1000, 650],
          ['2025-03', 1100, 700]
        ];
        const mpMonthlyTrendWs = XLSX.utils.aoa_to_sheet(mpMonthlyTrendData);
        XLSX.utils.book_append_sheet(workbook, mpMonthlyTrendWs, '月度访问趋势');
        
        // 各月核心数据
        const mpCoreData = [
          ['月份', '材价数量', '标准工料机数量', '询价申请数据', '询价材料数据', '供应商数量'],
          ['2025-01', 3000, 2100, 150, 300, 20],
          ['2025-02', 3200, 2240, 160, 320, 22],
          ['2025-03', 3500, 2450, 180, 360, 25]
        ];
        const mpCoreWs = XLSX.utils.aoa_to_sheet(mpCoreData);
        XLSX.utils.book_append_sheet(workbook, mpCoreWs, '各月核心数据');
        
        // 各月部门访问数据
        const mpDepartmentData = [
          ['月份', '大数据中心', '造价管理三部', '信息化管理部', '造价三部', '集团领导', '造价咨询一部', '造价管理一部', '东莞投资评审部', '评审一室', '风险评估中心', '造价五部', '东莞投资咨询部', '数字造价三部（数字造价技术中心）', '采购咨询二部', '咨询三部（教育咨询部）', '政府采购一部', '总工办（创新管理部）', '深圳造价咨询部', '海南造价咨询部', '规划咨询二部（咨询四部）', '采购咨询六部', '规划咨询三部', '咨询八部', '大健康咨询部', '深圳项目管理部', '经营及合同管理部', '粤东工作组', '咨询六部', '人力资源部', '政策研究室', '深圳投资咨询部', '规划咨询一部', '深圳子公司领导'],
          ['2025-01', 155, 0, 1, 6, 3, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        const mpDepartmentWs = XLSX.utils.aoa_to_sheet(mpDepartmentData);
        XLSX.utils.book_append_sheet(workbook, mpDepartmentWs, '部门访问数据');
        break;
    }
    
    // 生成Excel文件并下载
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${productName}数据导入模板.xlsx`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('模板下载成功！');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-blue-300 mb-4">导入Excel文件</h3>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-400 bg-blue-500/10' : 'border-blue-500/50 bg-white/5 hover:bg-white/10'}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="text-blue-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-lg font-medium text-blue-200">
            {file ? file.name : '点击选择文件或拖拽文件到这里'}
          </p>
          <p className="text-sm text-blue-300 mt-2">
            支持 Excel 文件 (.xlsx, .xls)
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleImport}
          disabled={!file}
          className={`flex-1 py-2 px-4 rounded-md font-semibold transition duration-300 ${file ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'}`}
        >
          导入数据
        </button>
        <button 
          onClick={handleDownloadTemplate}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
        >
          下载模板
        </button>
      </div>
    </div>
  );
};

export default DataImportForm;