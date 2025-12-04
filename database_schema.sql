-- 创建运营数据统计表
drop table if exists operation_data;
create table operation_data (
    id bigint generated always as identity primary key,
    platform_name varchar(50) not null comment '平台名称：数字智库/广咨智采/材价库',
    month varchar(6) not null comment '月份，格式：YYYYMM',
    visit_count int default 0 comment '访问量',
    register_count int default 0 comment '注册量',
    order_count int default 0 comment '订单量',
    revenue decimal(18,2) default 0.00 comment '营收金额',
    create_time timestamp default current_timestamp,
    update_time timestamp default current_timestamp,
    constraint unique_platform_month unique(platform_name, month)
);

-- 创建新闻资讯表
drop table if exists news;
create table news (
    id bigint generated always as identity primary key,
    title varchar(200) not null comment '新闻标题',
    content text not null comment '新闻内容',
    author varchar(50) default 'admin' comment '作者',
    create_time timestamp default current_timestamp,
    update_time timestamp default current_timestamp,
    status varchar(20) default 'published' comment '状态：draft/published'
);

-- 数字智库 - 数据统计表
drop table if exists digital_library_data;
create table digital_library_data (
    id bigint generated always as identity primary key,
    platform_id varchar(50) not null comment '平台ID',
    month varchar(6) not null comment '月份，格式：YYYYMM',
    visit_count int default 0 comment '访问量',
    register_count int default 0 comment '注册量',
    document_download_count int default 0 comment '文档下载量',
    revenue decimal(18,2) default 0.00 comment '营收金额',
    create_time timestamp default current_timestamp,
    update_time timestamp default current_timestamp,
    constraint unique_digital_month unique(platform_id, month)
);

-- 广咨智采 - 数据统计表
drop table if exists smart_procurement_data;
create table smart_procurement_data (
    id bigint generated always as identity primary key,
    platform_id varchar(50) not null comment '平台ID',
    month varchar(6) not null comment '月份，格式：YYYYMM',
    visit_count int default 0 comment '访问量',
    register_count int default 0 comment '注册量',
    project_count int default 0 comment '项目数',
    order_amount decimal(18,2) default 0.00 comment '成交金额',
    create_time timestamp default current_timestamp,
    update_time timestamp default current_timestamp,
    constraint unique_smart_month unique(platform_id, month)
);

-- 材价库 - 数据统计表
drop table if exists material_price_data;
create table material_price_data (
    id bigint generated always as identity primary key,
    platform_id varchar(50) not null comment '平台ID',
    month varchar(6) not null comment '月份，格式：YYYYMM',
    visit_count int default 0 comment '访问量',
    register_count int default 0 comment '注册量',
    material_count int default 0 comment '材料数量',
    download_count int default 0 comment '下载量',
    create_time timestamp default current_timestamp,
    update_time timestamp default current_timestamp,
    constraint unique_material_month unique(platform_id, month)
);

-- 创建索引
drop index if exists idx_operation_platform;
drop index if exists idx_operation_month;
create index idx_operation_platform on operation_data(platform_name);
create index idx_operation_month on operation_data(month);

drop index if exists idx_news_status;
drop index if exists idx_news_create_time;
create index idx_news_status on news(status);
create index idx_news_create_time on news(create_time);
