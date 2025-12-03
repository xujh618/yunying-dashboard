-- 数字智库月度访问趋势表
CREATE TABLE IF NOT EXISTS `digital_library_monthly_trend` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `visits` INT DEFAULT 0,
  `users` INT DEFAULT 0,
  `registers` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 数字智库功能板块使用情况表
CREATE TABLE IF NOT EXISTS `digital_library_feature_usage` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `homepage_visits` INT DEFAULT 0,
  `search_visits` INT DEFAULT 0,
  `stats_yearbook` INT DEFAULT 0,
  `stats_bulletin` INT DEFAULT 0,
  `macro_charts` INT DEFAULT 0,
  `indicator_query` INT DEFAULT 0,
  `industry_data` INT DEFAULT 0,
  `policy_materials` INT DEFAULT 0,
  `government_bulletin` INT DEFAULT 0,
  `engineering_specs` INT DEFAULT 0,
  `regional_news` INT DEFAULT 0,
  `current_affairs` INT DEFAULT 0,
  `project_results` INT DEFAULT 0,
  `potential_reits` INT DEFAULT 0,
  `investment_cases` INT DEFAULT 0,
  `planning_tool` INT DEFAULT 0,
  `planning_tool_projects` INT DEFAULT 0,
  `planning_tool_members` INT DEFAULT 0,
  `planning_tool_files` INT DEFAULT 0,
  `knowledge_graph_medical` INT DEFAULT 0,
  `calculator` INT DEFAULT 0,
  `rural_revitalization` INT DEFAULT 0,
  `policy_visualization` INT DEFAULT 0,
  `personal_center` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 数字智库部门访问分布表
CREATE TABLE IF NOT EXISTS `digital_library_department_visits` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `finance_dept` INT DEFAULT 0,
  `procurement_six` INT DEFAULT 0,
  `procurement_four` INT DEFAULT 0,
  `big_data_center` INT DEFAULT 0,
  `low_carbon_energy` INT DEFAULT 0,
  `dongguan_leader` INT DEFAULT 0,
  `dongguan_investment_review` INT DEFAULT 0,
  `dongguan_investment_consult` INT DEFAULT 0,
  `risk_assessment` INT DEFAULT 0,
  `engineering_management_leader` INT DEFAULT 0,
  `engineering_management_office` INT DEFAULT 0,
  `planning_consult_two` INT DEFAULT 0,
  `planning_consult_three` INT DEFAULT 0,
  `planning_consult_one` INT DEFAULT 0,
  `rail_transit` INT DEFAULT 0,
  `hainan_branch` INT DEFAULT 0,
  `group_leader` INT DEFAULT 0,
  `performance_evaluation` INT DEFAULT 0,
  `operation_contract` INT DEFAULT 0,
  `green_low_carbon_leader` INT DEFAULT 0,
  `review_two` INT DEFAULT 0,
  `review_one` INT DEFAULT 0,
  `hr_dept` INT DEFAULT 0,
  `social_public_leader` INT DEFAULT 0,
  `shenzhen_investment_consult` INT DEFAULT 0,
  `shenzhen_cost_consult` INT DEFAULT 0,
  `digital_procurement` INT DEFAULT 0,
  `digital_cost_bim` INT DEFAULT 0,
  `investment_cost_procurement` INT DEFAULT 0,
  `investment_cost_leader` INT DEFAULT 0,
  `project_management` INT DEFAULT 0,
  `info_center` INT DEFAULT 0,
  `cost_eight` INT DEFAULT 0,
  `cost_two` INT DEFAULT 0,
  `cost_management_two` INT DEFAULT 0,
  `cost_management_one` INT DEFAULT 0,
  `cost_six` INT DEFAULT 0,
  `cost_seven` INT DEFAULT 0,
  `cost_three` INT DEFAULT 0,
  `cost_four` INT DEFAULT 0,
  `cost_five` INT DEFAULT 0,
  `cost_consult_two` INT DEFAULT 0,
  `cost_consult_one` INT DEFAULT 0,
  `policy_research` INT DEFAULT 0,
  `government_procurement` INT DEFAULT 0,
  `zhuhai_investment_consult` INT DEFAULT 0,
  `consult_eight` INT DEFAULT 0,
  `consult_planning` INT DEFAULT 0,
  `consult_nine` INT DEFAULT 0,
  `consult_six` INT DEFAULT 0,
  `consult_three_education` INT DEFAULT 0,
  `consult_ten_government` INT DEFAULT 0,
  `consult_five` INT DEFAULT 0,
  `consult_one` INT DEFAULT 0,
  `chief_engineer_office` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 广咨智采月度访问趋势表
CREATE TABLE IF NOT EXISTS `smart_procurement_monthly_trend` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `visits` INT DEFAULT 0,
  `users` INT DEFAULT 0,
  `registers` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 广咨智采月度用户数据表
CREATE TABLE IF NOT EXISTS `smart_procurement_monthly_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `total_users` INT DEFAULT 0,
  `new_users` INT DEFAULT 0,
  `companies` INT DEFAULT 0,
  `new_companies` INT DEFAULT 0,
  `page_views` INT DEFAULT 0,
  `visit_count` INT DEFAULT 0,
  `order_count` INT DEFAULT 0,
  `revenue` INT DEFAULT 0,
  `new_projects` INT DEFAULT 0,
  `service_fee` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 材价库月度访问趋势表
CREATE TABLE IF NOT EXISTS `material_price_monthly_trend` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `visits` INT DEFAULT 0,
  `users` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 材价库核心数据表
CREATE TABLE IF NOT EXISTS `material_price_monthly_core` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `material_count` INT DEFAULT 0,
  `standard_items` INT DEFAULT 0,
  `inquiry_count` INT DEFAULT 0,
  `inquiry_materials` INT DEFAULT 0,
  `supplier_count` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 材价库部门访问数据表
CREATE TABLE IF NOT EXISTS `material_price_department_visits` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` VARCHAR(20) NOT NULL UNIQUE,
  `planning_dept_visits` INT DEFAULT 0,
  `planning_dept_users` INT DEFAULT 0,
  `design_dept_visits` INT DEFAULT 0,
  `design_dept_users` INT DEFAULT 0,
  `cost_dept_visits` INT DEFAULT 0,
  `cost_dept_users` INT DEFAULT 0,
  `engineering_dept_visits` INT DEFAULT 0,
  `engineering_dept_users` INT DEFAULT 0,
  `other_dept_visits` INT DEFAULT 0,
  `other_dept_users` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);