const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');

// 配置Supabase客户端 - 从环境变量中读取配置
const supabaseUrl = process.env.SUPABASE_URL || 'https://oogkyuxkxksvzzhuagnw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2t5dXhreGtzdnp6aHVhZ253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY2NTg0NywiZXhwIjoyMDgwMjQxODQ3fQ.2Uoi9rBbq3CVyzz4-h9tTrmCC5YHoVL_aPLXfn6I08I';
const supabase = createClient(supabaseUrl, supabaseKey);

// 配置Express服务器
const app = express();
const PORT = process.env.PORT || 3002;

// 配置CORS
app.use(cors());

// 配置静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 配置Multer，处理文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    // 确保上传目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 测试Supabase连接
async function testDbConnection() {
  try {
    console.log('正在测试Supabase连接...');
    
    // 尝试执行一个简单的auth API调用，验证连接
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase连接失败:', error.message);
      console.error('Error stack:', error.stack);
      return;
    }
    
    console.log('Supabase连接成功!');
    
    // 测试查询 - 只选择需要的列，避免引用已删除的id、created_at和updated_at列
    const { data: testData, error: testError } = await supabase
      .from('digital_library_monthly_trend')
      .select('month, visits, users, registers')
      .limit(1);
    
    if (testError) {
      console.log('测试查询失败（可能是表为空或权限问题）:', testError.message);
    } else {
      console.log('测试查询结果:', testData);
    }
    
  } catch (error) {
    console.error('Supabase连接测试异常:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testDbConnection();

// 解析数字智库月度访问趋势数据
async function parseDigitalLibraryMonthlyTrend(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('月度访问趋势原始数据:', JSON.stringify(rawData, null, 2));
  
  if (rawData.length < 2) {
    console.log('数据行数不足，至少需要2行（表头+数据）');
    return;
  }
  
  // 获取表头和数据行
  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  console.log('表头:', headers);
  console.log('数据行数:', dataRows.length);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const visits = parseInt(row[1] || 0);
    const users = parseInt(row[2] || 0);
    const registers = parseInt(row[3] || 0);
    
    console.log('处理月度访问趋势数据行:', { month, visits, users, registers });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('digital_library_monthly_trend')
          .upsert([
            {
              month,
              visits,
              users,
              registers
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('插入/更新结果:', data);
        }
      } catch (error) {
        console.error('插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 解析数字智库功能板块使用情况数据
async function parseDigitalLibraryFeatureUsage(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('功能板块使用情况原始数据:', JSON.stringify(rawData, null, 2));
  
  if (rawData.length < 2) {
    console.log('功能板块使用情况数据行数不足，至少需要2行（表头+数据）');
    return;
  }
  
  // 获取表头和数据行
  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  console.log('功能板块使用情况表头:', headers);
  console.log('功能板块使用情况数据行数:', dataRows.length);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const homepage_visits = parseInt(row[1] || 0);
    const search_visits = parseInt(row[2] || 0);
    const stats_yearbook = parseInt(row[3] || 0);
    const stats_bulletin = parseInt(row[4] || 0);
    const macro_charts = parseInt(row[5] || 0);
    const indicator_query = parseInt(row[6] || 0);
    const industry_data = parseInt(row[7] || 0);
    const policy_materials = parseInt(row[8] || 0);
    const government_bulletin = parseInt(row[9] || 0);
    const engineering_specs = parseInt(row[10] || 0);
    const regional_news = parseInt(row[11] || 0);
    const current_affairs = parseInt(row[12] || 0);
    const project_results = parseInt(row[13] || 0);
    const potential_reits = parseInt(row[14] || 0);
    const investment_cases = parseInt(row[15] || 0);
    const planning_tool = parseInt(row[16] || 0);
    const planning_tool_projects = parseInt(row[17] || 0);
    const planning_tool_members = parseInt(row[18] || 0);
    const planning_tool_files = parseInt(row[19] || 0);
    const knowledge_graph_medical = parseInt(row[20] || 0);
    const calculator = parseInt(row[21] || 0);
    const rural_revitalization = parseInt(row[22] || 0);
    const policy_visualization = parseInt(row[23] || 0);
    const personal_center = parseInt(row[24] || 0);
    
    console.log('处理功能板块使用情况数据行:', { 
      month, homepage_visits, search_visits, stats_yearbook, stats_bulletin, macro_charts, indicator_query, industry_data, 
      policy_materials, government_bulletin, engineering_specs, regional_news, current_affairs, project_results, 
      potential_reits, investment_cases, planning_tool, planning_tool_projects, planning_tool_members, planning_tool_files, 
      knowledge_graph_medical, calculator, rural_revitalization, policy_visualization, personal_center
    });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('digital_library_feature_usage')
          .upsert([
            {
              month,
              homepage_visits,
              search_visits,
              stats_yearbook,
              stats_bulletin,
              macro_charts,
              indicator_query,
              industry_data,
              policy_materials,
              government_bulletin,
              engineering_specs,
              regional_news,
              current_affairs,
              project_results,
              potential_reits,
              investment_cases,
              planning_tool,
              planning_tool_projects,
              planning_tool_members,
              planning_tool_files,
              knowledge_graph_medical,
              calculator,
              rural_revitalization,
              policy_visualization,
              personal_center
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('功能板块使用情况插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('功能板块使用情况插入/更新结果:', data);
        }
      } catch (error) {
        console.error('功能板块使用情况插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 解析数字智库部门访问分布数据
async function parseDigitalLibraryDepartmentVisits(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('部门访问分布原始数据:', JSON.stringify(rawData, null, 2));
  
  if (rawData.length < 2) {
    console.log('部门访问分布数据行数不足，至少需要2行（表头+数据）');
    return;
  }
  
  // 获取表头和数据行
  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  console.log('部门访问分布表头:', headers);
  console.log('部门访问分布数据行数:', dataRows.length);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const finance_dept = parseInt(row[1] || 0);
    const procurement_six = parseInt(row[2] || 0);
    const procurement_four = parseInt(row[3] || 0);
    const big_data_center = parseInt(row[4] || 0);
    const low_carbon_energy = parseInt(row[5] || 0);
    const dongguan_leader = parseInt(row[6] || 0);
    const dongguan_investment_review = parseInt(row[7] || 0);
    const dongguan_investment_consult = parseInt(row[8] || 0);
    const risk_assessment = parseInt(row[9] || 0);
    const engineering_management_leader = parseInt(row[10] || 0);
    const engineering_management_office = parseInt(row[11] || 0);
    const planning_consult_two = parseInt(row[12] || 0);
    const planning_consult_three = parseInt(row[13] || 0);
    const planning_consult_one = parseInt(row[14] || 0);
    const rail_transit = parseInt(row[15] || 0);
    const hainan_branch = parseInt(row[16] || 0);
    const group_leader = parseInt(row[17] || 0);
    const performance_evaluation = parseInt(row[18] || 0);
    const operation_contract = parseInt(row[19] || 0);
    const green_low_carbon_leader = parseInt(row[20] || 0);
    const review_two = parseInt(row[21] || 0);
    const review_one = parseInt(row[22] || 0);
    const hr_dept = parseInt(row[23] || 0);
    const social_public_leader = parseInt(row[24] || 0);
    const shenzhen_investment_consult = parseInt(row[25] || 0);
    const shenzhen_cost_consult = parseInt(row[26] || 0);
    const digital_procurement = parseInt(row[27] || 0);
    const digital_cost_bim = parseInt(row[28] || 0);
    const investment_cost_procurement = parseInt(row[29] || 0);
    const investment_cost_leader = parseInt(row[30] || 0);
    const project_management = parseInt(row[31] || 0);
    const info_center = parseInt(row[32] || 0);
    const cost_eight = parseInt(row[33] || 0);
    const cost_two = parseInt(row[34] || 0);
    const cost_management_two = parseInt(row[35] || 0);
    const cost_management_one = parseInt(row[36] || 0);
    const cost_six = parseInt(row[37] || 0);
    const cost_seven = parseInt(row[38] || 0);
    const cost_three = parseInt(row[39] || 0);
    const cost_four = parseInt(row[40] || 0);
    const cost_five = parseInt(row[41] || 0);
    const cost_consult_two = parseInt(row[42] || 0);
    const cost_consult_one = parseInt(row[43] || 0);
    const policy_research = parseInt(row[44] || 0);
    const government_procurement = parseInt(row[45] || 0);
    const zhuhai_investment_consult = parseInt(row[46] || 0);
    const consult_eight = parseInt(row[47] || 0);
    const consult_planning = parseInt(row[48] || 0);
    const consult_nine = parseInt(row[49] || 0);
    const consult_six = parseInt(row[50] || 0);
    const consult_three_education = parseInt(row[51] || 0);
    const consult_ten_government = parseInt(row[52] || 0);
    const consult_five = parseInt(row[53] || 0);
    const consult_one = parseInt(row[54] || 0);
    const chief_engineer_office = parseInt(row[55] || 0);
    
    console.log('处理部门访问分布数据行:', { 
      month, finance_dept, procurement_six, procurement_four, big_data_center, low_carbon_energy, dongguan_leader, 
      dongguan_investment_review, dongguan_investment_consult, risk_assessment, engineering_management_leader, 
      engineering_management_office, planning_consult_two, planning_consult_three, planning_consult_one, rail_transit, 
      hainan_branch, group_leader, performance_evaluation, operation_contract, green_low_carbon_leader, review_two, 
      review_one, hr_dept, social_public_leader, shenzhen_investment_consult, shenzhen_cost_consult, digital_procurement, 
      digital_cost_bim, investment_cost_procurement, investment_cost_leader, project_management, info_center, cost_eight, 
      cost_two, cost_management_two, cost_management_one, cost_six, cost_seven, cost_three, cost_four, cost_five, 
      cost_consult_two, cost_consult_one, policy_research, government_procurement, zhuhai_investment_consult, consult_eight, 
      consult_planning, consult_nine, consult_six, consult_three_education, consult_ten_government, consult_five, consult_one, 
      chief_engineer_office
    });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('digital_library_department_visits')
          .upsert([
            {
              month,
              finance_dept,
              procurement_six,
              procurement_four,
              big_data_center,
              low_carbon_energy,
              dongguan_leader,
              dongguan_investment_review,
              dongguan_investment_consult,
              risk_assessment,
              engineering_management_leader,
              engineering_management_office,
              planning_consult_two,
              planning_consult_three,
              planning_consult_one,
              rail_transit,
              hainan_branch,
              group_leader,
              performance_evaluation,
              operation_contract,
              green_low_carbon_leader,
              review_two,
              review_one,
              hr_dept,
              social_public_leader,
              shenzhen_investment_consult,
              shenzhen_cost_consult,
              digital_procurement,
              digital_cost_bim,
              investment_cost_procurement,
              investment_cost_leader,
              project_management,
              info_center,
              cost_eight,
              cost_two,
              cost_management_two,
              cost_management_one,
              cost_six,
              cost_seven,
              cost_three,
              cost_four,
              cost_five,
              cost_consult_two,
              cost_consult_one,
              policy_research,
              government_procurement,
              zhuhai_investment_consult,
              consult_eight,
              consult_planning,
              consult_nine,
              consult_six,
              consult_three_education,
              consult_ten_government,
              consult_five,
              consult_one,
              chief_engineer_office
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('部门访问分布插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('部门访问分布插入/更新结果:', data);
        }
      } catch (error) {
        console.error('部门访问分布插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 解析广咨智采月度访问趋势数据
async function parseSmartProcurementMonthlyTrend(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('广咨智采月度访问趋势原始数据:', JSON.stringify(rawData, null, 2));
  if (rawData.length < 2) return;

  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const visits = parseInt(row[1] || 0);
    const users = parseInt(row[2] || 0);
    const registers = parseInt(row[3] || 0);
    
    console.log('处理广咨智采月度访问趋势数据行:', { month, visits, users, registers });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('smart_procurement_monthly_trend')
          .upsert([
            {
              month,
              visits,
              users,
              registers
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('广咨智采月度访问趋势插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('广咨智采月度访问趋势插入/更新结果:', data);
        }
      } catch (error) {
        console.error('广咨智采月度访问趋势插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 解析广咨智采月度用户数据
async function parseSmartProcurementMonthlyUsers(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('广咨智采月度用户数据原始数据:', JSON.stringify(rawData, null, 2));
  if (rawData.length < 2) return;

  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const total_users = parseInt(row[1] || 0);
    const new_users = parseInt(row[2] || 0);
    const companies = parseInt(row[3] || 0);
    const new_companies = parseInt(row[4] || 0);
    const page_views = parseInt(row[5] || 0);
    const visit_count = parseInt(row[7] || 0); // 访问次数（跳过了前端模板中的"访问人数"字段）
    const order_count = parseInt(row[8] || 0);
    const revenue = parseInt(row[9] || 0);
    const new_projects = parseInt(row[10] || 0);
    const service_fee = parseInt(row[11] || 0);
    
    console.log('处理广咨智采月度用户数据行:', { 
      month, total_users, new_users, companies, new_companies, page_views, visit_count, order_count, revenue, new_projects, service_fee
    });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('smart_procurement_monthly_users')
          .upsert([
            {
              month,
              total_users,
              new_users,
              companies,
              new_companies,
              page_views,
              visit_count,
              order_count,
              revenue,
              new_projects,
              service_fee
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('广咨智采月度用户数据插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('广咨智采月度用户数据插入/更新结果:', data);
        }
      } catch (error) {
        console.error('广咨智采月度用户数据插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 解析材价库月度访问趋势数据
async function parseMaterialPriceMonthlyTrend(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('材价库月度访问趋势原始数据:', JSON.stringify(rawData, null, 2));
  if (rawData.length < 2) return;

  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const visits = parseInt(row[1] || 0);
    const users = parseInt(row[2] || 0);
    
    console.log('处理材价库月度访问趋势数据行:', { month, visits, users });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('material_price_monthly_trend')
          .upsert([
            {
              month,
              visits,
              users
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('材价库月度访问趋势插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('材价库月度访问趋势插入/更新结果:', data);
        }
      } catch (error) {
        console.error('材价库月度访问趋势插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 解析材价库核心数据
async function parseMaterialPriceCoreData(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('材价库核心数据原始数据:', JSON.stringify(rawData, null, 2));
  if (rawData.length < 2) return;

  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    const material_count = parseInt(row[1] || 0);
    const standard_items = parseInt(row[2] || 0);
    const inquiry_count = parseInt(row[3] || 0);
    const inquiry_materials = parseInt(row[4] || 0);
    const supplier_count = parseInt(row[5] || 0);
    
    console.log('处理材价库核心数据行:', { 
      month, material_count, standard_items, inquiry_count, inquiry_materials, supplier_count
    });
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('material_price_monthly_core')
          .upsert([
            {
              month,
              material_count,
              standard_items,
              inquiry_count,
              inquiry_materials,
              supplier_count
            }
          ])
          .eq('month', month);
        
        if (error) {
          console.error('材价库核心数据插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('材价库核心数据插入/更新结果:', data);
        }
      } catch (error) {
        console.error('材价库核心数据插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 将部门名称转换为数据库字段名
function departmentNameToFieldName(departmentName) {
  // 定义部门名称到数据库字段名的映射
  const departmentMap = {
    '大数据中心': 'da_shu_ju_zhong_xin',
    '造价管理三部': 'zao_jia_guan_li_san_bu',
    '信息化管理部': 'xin_xi_hua_guan_li_bu',
    '造价三部': 'zao_jia_san_bu',
    '集团领导': 'ji_tuan_ling_dao',
    '造价咨询一部': 'zao_jia_zi_xun_yi_bu',
    '造价管理一部': 'zao_jia_guan_li_yi_bu',
    '东莞投资评审部': 'dong_guan_tou_zi_ping_shen_bu',
    '评审一室': 'ping_shen_yi_shi',
    '风险评估中心': 'feng_xian_ping_gu_zhong_xin',
    '造价五部': 'zao_jia_wu_bu',
    '东莞投资咨询部': 'dong_guan_tou_zi_zi_xun_bu',
    '数字造价三部（数字造价技术中心）': 'shu_zi_zao_jia_san_bu_shu_zi_zao_jia_ji_shu_zhong_xin',
    '采购咨询二部': 'cai_gou_zi_xun_er_bu',
    '咨询三部（教育咨询部）': 'zi_xun_san_bu_jiao_yu_zi_xun_bu',
    '政府采购一部': 'zheng_fu_cai_gou_yi_bu',
    '总工办（创新管理部）': 'zong_gong_ban_chuang_xin_guan_li_bu',
    '深圳造价咨询部': 'shen_zhen_zao_jia_zi_xun_bu',
    '海南造价咨询部': 'hai_nan_zao_jia_zi_xun_bu',
    '规划咨询二部（咨询四部）': 'gui_hua_zi_xun_er_bu_zi_xun_si_bu',
    '采购咨询六部': 'cai_gou_zi_xun_liu_bu',
    '规划咨询三部': 'gui_hua_zi_xun_san_bu',
    '咨询八部': 'zi_xun_ba_bu',
    '大健康咨询部': 'da_jian_kang_zi_xun_bu',
    '深圳项目管理部': 'shen_zhen_xiang_mu_guan_li_bu',
    '经营及合同管理部': 'jing_ying_ji_he_tong_guan_li_bu',
    '粤东工作组': 'yue_dong_gong_zuo_zu',
    '咨询六部': 'zi_xun_liu_bu',
    '人力资源部': 'ren_li_zi_yuan_bu',
    '政策研究室': 'zheng_ce_yan_jiu_shi',
    '深圳投资咨询部': 'shen_zhen_tou_zi_zi_xun_bu',
    '规划咨询一部': 'gui_hua_zi_xun_yi_bu',
    '深圳子公司领导': 'shen_zhen_zi_gong_si_ling_dao'
  };
  
  // 如果在映射表中找到对应的字段名，直接返回
  if (departmentMap[departmentName]) {
    return departmentMap[departmentName];
  }
  
  // 否则，使用原有的转换逻辑，但修改正则表达式，确保能处理中文
  // 注意：这是备用方案，建议在映射表中添加所有可能的部门名称
  return departmentName
    .replace(/[（）]/g, '') // 移除括号
    .replace(/[\s]+/g, '_') // 将空格替换为下划线
    .replace(/[\|]/g, '_') // 将|替换为下划线
    .toLowerCase() // 转换为小写
    .replace(/[^a-z0-9_一-龥]/g, ''); // 移除特殊字符，但保留中文
}

// 解析材价库部门访问数据
async function parseMaterialPriceDepartmentVisits(worksheet) {
  // 使用header: 1选项，将第一行作为表头，返回数组形式的数据
  const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log('材价库部门访问数据原始数据:', JSON.stringify(rawData, null, 2));
  if (rawData.length < 2) return;

  const headers = rawData[0];
  const dataRows = rawData.slice(1);
  
  console.log('材价库部门访问分布表头:', headers);
  console.log('材价库部门访问分布数据行数:', dataRows.length);
  
  // 处理所有数据行
  for (const row of dataRows) {
    // 跳过空行
    if (!row || row.length === 0 || !row[0]) {
      console.log('跳过空行:', row);
      continue;
    }
    
    // 提取数据
    const month = row[0];
    
    // 构建部门数据对象
    const departmentData = { month };
    
    // 遍历每个部门的数据（从第二列开始，每列代表一个部门的访问次数）
    for (let i = 1; i < headers.length; i++) {
      const departmentName = headers[i];
      // 跳过空部门名称
      if (!departmentName || departmentName.trim() === '') continue;
      
      const visits = parseInt(row[i] || 0);
      const fieldName = departmentNameToFieldName(departmentName);
      
      // 添加到部门数据对象
      departmentData[fieldName] = visits;
    }
    
    console.log('处理材价库部门访问数据行:', departmentData);
    
    if (month) {
      try {
        const { data, error } = await supabase
          .from('material_price_department_visits')
          .upsert([departmentData])
          .eq('month', month);
        
        if (error) {
          console.error('材价库部门访问分布插入/更新失败:', error.message);
          console.error('错误堆栈:', error);
        } else {
          console.log('材价库部门访问分布插入/更新结果:', data);
        }
      } catch (error) {
        console.error('材价库部门访问分布插入/更新异常:', error.message);
        console.error('错误堆栈:', error.stack);
      }
    }
  }
}

// 上传文件API
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('=== 文件上传API调用开始 ===');
    console.log('请求方法:', req.method);
    console.log('请求URL:', req.url);
    console.log('请求头:', JSON.stringify(req.headers, null, 2));
    console.log('请求体:', JSON.stringify(req.body, null, 2));
    console.log('文件信息:', JSON.stringify(req.file, null, 2));
    
    if (!req.file) {
      console.log('没有上传文件');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    console.log('文件路径:', filePath);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.log('文件不存在:', filePath);
      return res.status(500).json({ message: 'File not found after upload' });
    }
    
    // 检查文件大小
    const fileStats = fs.statSync(filePath);
    console.log('文件大小:', fileStats.size, 'bytes');
    
    // 读取并解析Excel文件，添加编码选项以正确处理中文
    console.log('开始读取Excel文件...');
    const workbook = XLSX.readFile(filePath, { codepage: 65001 }); // UTF-8编码
    console.log('Excel文件读取成功');
    
    const product = req.body.product;
    
    console.log('=== 文件上传API调用 ===');
    console.log('产品类型:', product);
    console.log('文件名:', req.file.originalname);
    console.log('文件路径:', filePath);
    console.log('Sheet数量:', workbook.SheetNames.length);
    console.log('Sheet名称:', workbook.SheetNames);

    // 验证product参数
    if (!product) {
      console.error('产品类型未提供');
      return res.status(400).json({ message: 'Product type is required' });
    }
    
    // 根据产品类型处理不同的sheet
    switch (product) {
      case 'digital-library':
        // 数字智库：3个表
        console.log('=== 处理数字智库数据 ===');
        const dlSheets = workbook.SheetNames;
        console.log('数字智库Sheet名称:', dlSheets);
        
        // 处理月度访问趋势表 - 支持多种Sheet名称
        if (dlSheets.includes('月度访问趋势') || dlSheets.includes('Sheet1')) {
          const sheetName = dlSheets.includes('月度访问趋势') ? '月度访问趋势' : 'Sheet1';
          console.log('处理月度访问趋势表，Sheet名称:', sheetName);
          await parseDigitalLibraryMonthlyTrend(workbook.Sheets[sheetName]);
          console.log('月度访问趋势表处理完成');
        }
        
        // 处理功能板块使用情况表
        if (dlSheets.includes('各功能板块使用情况')) {
          console.log('处理功能板块使用情况表...');
          await parseDigitalLibraryFeatureUsage(workbook.Sheets['各功能板块使用情况']);
          console.log('功能板块使用情况表处理完成');
        }
        
        // 处理部门访问分布表
        if (dlSheets.includes('各部门访问分布')) {
          console.log('处理部门访问分布表...');
          await parseDigitalLibraryDepartmentVisits(workbook.Sheets['各部门访问分布']);
          console.log('部门访问分布表处理完成');
        }
        break;

      case 'smart-procurement':
        // 广咨智采：2个表
        console.log('=== 处理广咨智采数据 ===');
        const spSheets = workbook.SheetNames;
        console.log('广咨智采Sheet名称:', spSheets);
        
        // 处理月度访问趋势表 - 支持多种Sheet名称
        if (spSheets.includes('月度访问趋势') || spSheets.includes('Sheet1')) {
          const sheetName = spSheets.includes('月度访问趋势') ? '月度访问趋势' : 'Sheet1';
          console.log('处理月度访问趋势表，Sheet名称:', sheetName);
          await parseSmartProcurementMonthlyTrend(workbook.Sheets[sheetName]);
          console.log('月度访问趋势表处理完成');
        }
        
        // 处理用户和业务数据表
        if (spSheets.includes('用户和业务数据')) {
          console.log('处理用户和业务数据表...');
          await parseSmartProcurementMonthlyUsers(workbook.Sheets['用户和业务数据']);
          console.log('用户和业务数据表处理完成');
        }
        break;

      case 'material-price':
        // 材价库：3个表
        console.log('=== 处理材价库数据 ===');
        const mpSheets = workbook.SheetNames;
        console.log('材价库Sheet名称:', mpSheets);
        
        // 处理月度访问趋势表 - 支持多种Sheet名称
        if (mpSheets.includes('月度访问趋势') || mpSheets.includes('Sheet1')) {
          const sheetName = mpSheets.includes('月度访问趋势') ? '月度访问趋势' : 'Sheet1';
          console.log('处理月度访问趋势表，Sheet名称:', sheetName);
          await parseMaterialPriceMonthlyTrend(workbook.Sheets[sheetName]);
          console.log('月度访问趋势表处理完成');
        }
        
        // 处理各月核心数据表
        if (mpSheets.includes('各月核心数据')) {
          console.log('处理各月核心数据表...');
          await parseMaterialPriceCoreData(workbook.Sheets['各月核心数据']);
          console.log('各月核心数据表处理完成');
        }
        
        // 处理部门访问数据表 - 支持多种Sheet名称
        if (mpSheets.includes('部门访问数据') || mpSheets.includes('Sheet3') || mpSheets.includes('Sheet1')) {
          const sheetName = mpSheets.includes('部门访问数据') ? '部门访问数据' : (mpSheets.includes('Sheet3') ? 'Sheet3' : 'Sheet1');
          console.log('处理部门访问数据表，Sheet名称:', sheetName);
          await parseMaterialPriceDepartmentVisits(workbook.Sheets[sheetName]);
          console.log('部门访问数据表处理完成');
        }
        break;

      default:
        console.error('无效的产品类型:', product);
        return res.status(400).json({ message: 'Invalid product type' });
    }

    console.log('=== 数据导入完成 ===');
    res.status(200).json({ 
      message: 'File uploaded and data imported successfully',
      file: req.file
    });
  } catch (error) {
    console.error('=== 数据导入错误 ===');
    console.error('错误信息:', error.message);
    console.error('错误堆栈:', error.stack);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// 获取数据API（示例）
app.get('/api/data/:product/:table', async (req, res) => {
  try {
    const { product, table } = req.params;
    
    let tableName;

    // 映射表名
    switch (product) {
      case 'digital-library':
        if (table === 'monthly-trend') tableName = 'digital_library_monthly_trend';
        else if (table === 'feature-usage') tableName = 'digital_library_feature_usage';
        else if (table === 'department-visits') tableName = 'digital_library_department_visits';
        else return res.status(400).json({ message: 'Invalid table name' });
        break;
      case 'smart-procurement':
        if (table === 'monthly-trend') tableName = 'smart_procurement_monthly_trend';
        else if (table === 'monthly-users') tableName = 'smart_procurement_monthly_users';
        else return res.status(400).json({ message: 'Invalid table name' });
        break;
      case 'material-price':
        if (table === 'monthly-trend') tableName = 'material_price_monthly_trend';
        else if (table === 'monthly-core') tableName = 'material_price_monthly_core';
        else if (table === 'department-visits') tableName = 'material_price_department_visits';
        else return res.status(400).json({ message: 'Invalid table name' });
        break;
      default:
        return res.status(400).json({ message: 'Invalid product type' });
    }

    const { data: rows, error } = await supabase
      .from(tableName)
      .select('*')
      .order('month', { ascending: false });
    
    if (error) {
      console.error('Error fetching data:', error.message);
      return res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
