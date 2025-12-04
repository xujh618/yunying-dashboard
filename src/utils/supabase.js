import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端实例
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using default values for development only.');
  // 仅在开发环境中使用默认值，生产环境仍需配置环境变量
  const supabase = createClient(
    supabaseUrl || 'https://oogkyuxkxksvzzhuagnw.supabase.co',
    supabaseAnonKey || 'sb_publishable_GmbQiQ_V9aUttQMmbFH5og_jWy-2RZh'
  );
  export default supabase;
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;