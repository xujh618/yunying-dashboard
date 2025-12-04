import { createClient } from '@supabase/supabase-js';

// 创建Supabase客户端
const supabaseUrl = 'https://htkzxqkfqlhrtylnhqyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0a3p4cWtmcWxocnR5bG5ocXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NjQxOTYsImV4cCI6MjA1NTI0MDE5Nn0.F9tM1QV2qL6w0dM83I9D8D8H8z0B0z3z8X8Z8B0z3z8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
