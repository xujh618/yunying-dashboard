import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

// 配置CORS
app.use(cors());
app.use(express.json());

// 配置Supabase
const supabaseUrl = 'https://htkzxqkfqlhrtylnhqyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0a3p4cWtmcWxocnR5bG5ocXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NjQxOTYsImV4cCI6MjA1NTI0MDE5Nn0.F9tM1QV2qL6w0dM83I9D8D8H8z0B0z3z8X8Z8B0z3z8';
const supabase = createClient(supabaseUrl, supabaseKey);

// 配置文件上传
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 测试接口
app.get('/api/test', (req, res) => {
  res.json({ message: '服务器运行正常' });
});

// 上传运营数据
app.post('/api/upload-operation-data', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: '没有文件上传' });
    }

    // 解析Excel文件
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // 验证数据格式
    const validData = data.filter(row => {
      return row.platform_name && row.month && 
             typeof row.visit_count === 'number' && 
             typeof row.register_count === 'number' && 
             typeof row.order_count === 'number' && 
             typeof row.revenue === 'number';
    });

    if (validData.length === 0) {
      return res.status(400).json({ error: '没有有效的数据行' });
    }

    // 批量插入或更新数据
    const results = [];
    for (const row of validData) {
      // 检查是否已存在该月份的数据
      const { data: existingData, error: checkError } = await supabase
        .from('operation_data')
        .select('id')
        .eq('platform_name', row.platform_name)
        .eq('month', row.month)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingData) {
        // 更新现有数据
        const { error: updateError } = await supabase
          .from('operation_data')
          .update({
            visit_count: row.visit_count,
            register_count: row.register_count,
            order_count: row.order_count,
            revenue: row.revenue,
            update_time: new Date().toISOString()
          })
          .eq('id', existingData.id);

        if (updateError) throw updateError;
        results.push({ platform_name: row.platform_name, month: row.month, status: 'updated' });
      } else {
        // 插入新数据
        const { error: insertError } = await supabase
          .from('operation_data')
          .insert({
            platform_name: row.platform_name,
            month: row.month,
            visit_count: row.visit_count,
            register_count: row.register_count,
            order_count: row.order_count,
            revenue: row.revenue
          });

        if (insertError) throw insertError;
        results.push({ platform_name: row.platform_name, month: row.month, status: 'inserted' });
      }
    }

    res.json({ message: '数据上传成功', results: results });
  } catch (error) {
    console.error('上传数据出错:', error);
    res.status(500).json({ error: '数据上传失败', details: error.message });
  }
});

// 获取运营数据
app.get('/api/operation-data', async (req, res) => {
  try {
    const { platform_name, month } = req.query;
    let query = supabase.from('operation_data').select('*');

    if (platform_name) {
      query = query.eq('platform_name', platform_name);
    }

    if (month) {
      query = query.eq('month', month);
    }

    const { data, error } = await query.order('month', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ data: data });
  } catch (error) {
    console.error('获取数据出错:', error);
    res.status(500).json({ error: '获取数据失败', details: error.message });
  }
});

// 获取新闻列表
app.get('/api/news', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('create_time', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ data: data });
  } catch (error) {
    console.error('获取新闻列表出错:', error);
    res.status(500).json({ error: '获取新闻列表失败', details: error.message });
  }
});

// 创建新闻
app.post('/api/news', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' });
    }

    const { data, error } = await supabase
      .from('news')
      .insert({
        title,
        content,
        author: author || 'admin'
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    res.json({ message: '新闻创建成功', data: data });
  } catch (error) {
    console.error('创建新闻出错:', error);
    res.status(500).json({ error: '创建新闻失败', details: error.message });
  }
});

// 删除新闻
app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', parseInt(id));

    if (error) {
      throw error;
    }

    res.json({ message: '新闻删除成功' });
  } catch (error) {
    console.error('删除新闻出错:', error);
    res.status(500).json({ error: '删除新闻失败', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
