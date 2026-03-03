# Contact Form Setup Guide

## 概述

Contact页面现在使用 **Supabase + API Route** 方案：

```
用户填写表单 → Next.js API Route → Supabase (保存) + Resend (邮件通知)
```

## 环境变量配置

在 `.env.local` 文件中添加：

```bash
# Supabase (已存在，确认有Service Role Key)
NEXT_PUBLIC_SUPABASE_URL=https://fixemvsckapejyfwphft.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # 重要：需要这个

# Resend (用于邮件通知，可选但推荐)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx  # 从 https://resend.com 获取
```

## 步骤1：创建数据库表

在 Supabase SQL Editor 中运行：

```bash
\i scripts/add_contact_submissions_table.sql
```

或复制 `scripts/add_contact_submissions_table.sql` 内容执行。

## 步骤2：获取 Resend API Key (可选)

1. 访问 https://resend.com
2. 注册账户
3. 验证域名 (stackmatrices.com)
4. 创建 API Key
5. 复制到 `.env.local`

## 步骤3：重新部署

```bash
cd /root/.openclaw/workspace/blog
npm run build
git add -A
git commit -m "Add: Contact form with Supabase + Email notification"
git push origin main
```

## 功能特性

✅ **表单提交**：保存到 Supabase `contact_submissions` 表  
✅ **邮件通知**：自动发送到你的邮箱 (sam.wang01@icloud.com)  
✅ **防重复**：可以检测同一邮箱多次提交  
✅ **加载状态**：提交时显示 loading 动画  
✅ **成功提示**：提交后显示成功页面  
✅ **错误处理**：网络错误时显示友好提示  

## 数据查看

### 方法1：Supabase Dashboard
- 登录 https://supabase.com
- 选择项目
- 进入 Table Editor → `contact_submissions`

### 方法2：SQL查询
```sql
-- 查看所有新提交
SELECT * FROM contact_submissions 
WHERE status = 'new' 
ORDER BY created_at DESC;

-- 统计今日提交
SELECT COUNT(*) FROM contact_submissions 
WHERE DATE(created_at) = CURRENT_DATE;
```

## 管理提交

可以更新提交状态：

```sql
-- 标记为已读
UPDATE contact_submissions 
SET status = 'read' 
WHERE id = 'uuid-here';

-- 标记为已回复
UPDATE contact_submissions 
SET status = 'replied', 
    notes = 'Sent follow-up email'
WHERE id = 'uuid-here';
```

## 没有Resend怎么办？

如果不配置 `RESEND_API_KEY`，表单仍然可以：
- ✅ 保存到 Supabase
- ❌ 不发送邮件通知

你需要定期查看 Supabase 数据库来发现新提交。

## 安全考虑

- RLS策略：任何人可以提交，只有认证用户可以查看
- IP记录：自动记录提交者IP和用户代理
- 防止滥用：可以添加 Rate Limiting（后续可扩展）

## 故障排除

### 提交失败
检查浏览器控制台 Network tab，查看 `/api/contact` 请求的响应。

### 邮件没收到
1. 检查 Resend Dashboard 的邮件日志
2. 确认域名已验证
3. 检查垃圾邮件文件夹

### 数据没保存
1. 检查 `SUPABASE_SERVICE_ROLE_KEY` 是否正确
2. 确认表已创建
3. 查看 Vercel/Cloudflare Functions 日志
