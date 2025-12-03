// API工具文件，集中管理API调用

// 获取API基础URL，支持环境变量配置
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * 发送API请求的工具函数
 * @param {string} endpoint - API端点路径
 * @param {Object} options - fetch选项
 * @returns {Promise<any>} - 请求结果
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    // 在开发环境中使用本地服务器，生产环境中可以使用空字符串
    // 注意：生产环境中需要部署后端服务，并配置正确的API地址
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3002' : API_BASE_URL;
    // 确保endpoint以/api开头，修复路径不匹配问题
    const apiEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const url = `${baseUrl}${apiEndpoint}`;
    
    console.log(`发送API请求到: ${url}`);
    
    // 如果请求体是FormData，不要设置Content-Type头，让浏览器自动处理
    const headers = options.body instanceof FormData ?
      options.headers || {} :
      {
        'Content-Type': 'application/json',
        ...options.headers
      };
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API请求错误:', error);
    // 返回空数据，避免应用崩溃
    return [];
  }
};

/**
 * 获取数字智库月度访问趋势数据
 * @returns {Promise<any[]>} - 月度访问趋势数据
 */
export const fetchDigitalLibraryMonthlyTrend = async () => {
  return fetchApi('/data/digital-library/monthly-trend');
};

/**
 * 获取数字智库功能板块使用情况数据
 * @returns {Promise<any[]>} - 功能板块使用情况数据
 */
export const fetchDigitalLibraryFeatureUsage = async () => {
  return fetchApi('/data/digital-library/feature-usage');
};

/**
 * 获取数字智库部门访问分布数据
 * @returns {Promise<any[]>} - 部门访问分布数据
 */
export const fetchDigitalLibraryDepartmentVisits = async () => {
  return fetchApi('/data/digital-library/department-visits');
};

/**
 * 获取广咨智采月度访问趋势数据
 * @returns {Promise<any[]>} - 月度访问趋势数据
 */
export const fetchSmartProcurementMonthlyTrend = async () => {
  return fetchApi('/data/smart-procurement/monthly-trend');
};

/**
 * 获取广咨智采月度用户数据
 * @returns {Promise<any[]>} - 月度用户数据
 */
export const fetchSmartProcurementMonthlyUsers = async () => {
  return fetchApi('/data/smart-procurement/monthly-users');
};

/**
 * 获取材价库月度访问趋势数据
 * @returns {Promise<any[]>} - 月度访问趋势数据
 */
export const fetchMaterialPriceMonthlyTrend = async () => {
  return fetchApi('/data/material-price/monthly-trend');
};

/**
 * 获取材价库月度核心数据
 * @returns {Promise<any[]>} - 月度核心数据
 */
export const fetchMaterialPriceMonthlyCore = async () => {
  return fetchApi('/data/material-price/monthly-core');
};

/**
 * 获取材价库部门访问分布数据
 * @returns {Promise<any[]>} - 部门访问分布数据
 */
export const fetchMaterialPriceDepartmentVisits = async () => {
  return fetchApi('/data/material-price/department-visits');
};

/**
 * 上传数据文件
 * @param {FormData} formData - 表单数据
 * @returns {Promise<any>} - 上传结果
 */
export const uploadDataFile = async (formData) => {
  try {
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3002' : API_BASE_URL;
    const url = `${baseUrl}/api/upload`;
    
    console.log(`上传文件到: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      // 尝试解析错误响应
      let errorText = '';
      try {
        errorText = await response.text();
        console.error('上传响应错误文本:', errorText);
      } catch (parseError) {
        console.error('无法解析错误响应:', parseError);
      }
      throw new Error(`文件上传失败: ${response.status} ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('文件上传错误:', error);
    throw error;
  }
};