# 自动化内容监控系统

## 功能
✅ 每天自动抓取权威SEO/GEO源的最新内容  
✅ AI自动筛选医疗营销相关内容  
✅ GPT-4生成专业博客文章  
✅ 自动保存到Supabase数据库  
✅ 定时发布到网站

## 监控的权威源

### 一级源（每日检查）
- Google Search Central - 算法更新
- OpenAI Blog - AI功能更新
- Anthropic Blog - Claude更新
- Schema.org - 结构化数据变化

### 二级源（行业新闻）
- Search Engine Land
- Moz Blog
- Ahrefs Blog
- Semrush Blog

### 筛选关键词
```
medical, healthcare, doctor, clinic, patient,
local search, schema, AI search, ChatGPT, 
algorithm update, ranking changes, citation
```

## 启用步骤

### 1. 安装依赖
```bash
cd /root/.openclaw/workspace/blog
pip3 install requests beautifulsoup4 openai
```

### 2. 设置环境变量
```bash
export SUPABASE_SERVICE_KEY="your_key"
export OPENAI_API_KEY="your_key"
```

### 3. 测试运行
```bash
python3 scripts/content_monitor.py
```

### 4. 启用定时任务
```bash
crontab scripts/crontab.txt
```

## 输出示例

系统会生成类似这样的博客文章：

```json
{
  "title": "Google March 2026 Core Update: What Medical Practices Need to Know",
  "excerpt": "Google's latest core update affects local medical search results. Here's how to adapt your GEO strategy.",
  "content": "...",
  "category": "Algorithm Updates",
  "source_url": "https://developers.google.com/...",
  "tags": ["Google Update", "Local SEO", "Medical Marketing"]
}
```

## 手动触发

如果你想立即检查最新内容：
```bash
python3 scripts/content_monitor.py
```

## 查看日志

```bash
tail -f logs/content_monitor.log
```
