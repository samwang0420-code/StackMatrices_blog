# 数据库表结构 - 快速参考

## 📋 执行顺序

### 1. 全新安装 (推荐)
直接运行完整schema：
```sql
\i scripts/complete_database_schema.sql
```

### 2. 现有数据库迁移
```sql
\i scripts/database_migration_guide.sql
```

---

## 🗄️ 表结构概览

### 表1: `geo_implementation_iterations`
**用途**: 存储行业监控生成的实施需求
**主要使用者**: 其他GEO/SEO实施项目

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 主键 |
| `title` | TEXT | 需求标题 |
| `description` | TEXT | 详细描述 |
| `category` | TEXT | Algorithm/Technical/Content/Strategy |
| `priority` | TEXT | critical/high/medium/low |
| `status` | TEXT | backlog/planned/in_progress/completed |
| `estimated_hours` | INTEGER | 预计工时 |
| `actual_hours` | INTEGER | 实际工时 |
| `tags` | TEXT[] | 标签数组 |
| `affects` | TEXT[] | 影响范围: medical, local, ecommerce, technical_seo, content_strategy, ai_optimization, all |
| `source_type` | TEXT | algorithm_update/breaking_change/feature_release/best_practice |
| `source_url` | TEXT | 来源链接 |
| `source_title` | TEXT | 来源标题 |
| `source_publish_date` | TIMESTAMP | 来源发布时间 |
| `acceptance_criteria` | TEXT[] | 验收标准数组 |
| `implementation_steps` | TEXT[] | 实施步骤数组 |
| `technical_notes` | TEXT | 技术备注 |
| `risk_level` | TEXT | critical/high/medium/low |
| `dependencies` | TEXT[] | 依赖项数组 |
| `assigned_to` | TEXT | 负责人 |
| `project` | TEXT | 项目名: GEO_SEO_Implementation |
| `due_date` | DATE | 截止日期 |
| `started_at` | TIMESTAMP | 开始时间 |
| `completed_at` | TIMESTAMP | 完成时间 |
| `created_at` | TIMESTAMP | 创建时间 |
| `updated_at` | TIMESTAMP | 更新时间 |

**索引**:
- `idx_geo_iterations_status` - 状态查询
- `idx_geo_iterations_priority` - 优先级查询
- `idx_geo_iterations_category` - 类别查询
- `idx_geo_iterations_priority_status` - 复合索引(常用筛选)
- `idx_geo_iterations_affects` - GIN索引(数组搜索)
- `idx_geo_iterations_tags` - GIN索引(标签搜索)

---

### 表2: `articles`
**用途**: 技术博客文章存储
**说明**: 目前博客使用静态页面，此表用于未来动态化

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 主键 |
| `title` | TEXT | 文章标题 |
| `slug` | TEXT | URL标识(唯一) |
| `category` | TEXT | 文章分类 |
| `author` | TEXT | 作者名 |
| `read_time` | TEXT | 阅读时长 |
| `excerpt` | TEXT | 摘要 |
| `content` | TEXT | Markdown内容 |
| `content_html` | TEXT | HTML内容 |
| `cover_image` | TEXT | 封面图URL |
| `published` | BOOLEAN | 是否发布 |
| `featured` | BOOLEAN | 是否精选 |
| `tags` | TEXT[] | 标签数组 |
| `view_count` | INTEGER | 浏览量 |

---

### 表3: `tech_iterations`
**用途**: StackMatrices内部技术债务追踪

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 主键 |
| `title` | TEXT | 迭代标题 |
| `description` | TEXT | 描述 |
| `category` | TEXT | 分类 |
| `priority` | TEXT | 优先级 |
| `status` | TEXT | 状态 |
| `estimated_hours` | INTEGER | 预计工时 |
| `project` | TEXT | 项目名(默认StackMatrices) |

---

## 🔍 常用查询

### 获取所有待办的高优先级需求
```sql
SELECT id, title, category, estimated_hours, affects
FROM geo_implementation_iterations
WHERE status = 'backlog' 
  AND priority IN ('critical', 'high')
ORDER BY 
  CASE priority 
    WHEN 'critical' THEN 1 
    WHEN 'high' THEN 2 
    ELSE 3 
  END,
  created_at DESC;
```

### 按影响范围筛选
```sql
-- 获取所有影响医疗行业的高优先级需求
SELECT * FROM geo_implementation_iterations
WHERE 'medical' = ANY(affects)
  AND priority = 'high'
  AND status = 'backlog';
```

### 统计概览
```sql
-- 使用内置函数
SELECT * FROM get_iteration_stats();

-- 手动统计
SELECT 
    priority,
    status,
    COUNT(*) as count,
    SUM(estimated_hours) as total_hours
FROM geo_implementation_iterations
GROUP BY priority, status
ORDER BY priority, status;
```

### 搜索功能
```sql
-- 使用搜索函数
SELECT * FROM search_iterations('algorithm');

-- 手动搜索
SELECT * FROM geo_implementation_iterations
WHERE title ILIKE '%algorithm%'
   OR description ILIKE '%algorithm%'
   OR tags @> ARRAY['algorithm'];
```

---

## 📊 视图 (Views)

### `v_critical_iterations`
显示所有待处理的Critical级别需求

```sql
SELECT * FROM v_critical_iterations;
```

### `v_workload_summary`
按项目和状态统计工作量

```sql
SELECT * FROM v_workload_summary;
```

### `v_recent_changes`
最近7天的变更

```sql
SELECT * FROM v_recent_changes;
```

---

## 🔐 权限设置

### Row Level Security (RLS)

所有表都启用了RLS，默认策略：

- **SELECT**: 公开读取 (任何人可以查询)
- **INSERT/UPDATE/DELETE**: 需要认证 (仅登录用户可修改)

### 修改权限

```sql
-- 允许特定角色完全访问
CREATE POLICY "Allow service role full access" 
ON geo_implementation_iterations
FOR ALL 
TO service_role
USING (true);

-- 允许匿名用户只读
CREATE POLICY "Allow anonymous read" 
ON geo_implementation_iterations
FOR SELECT 
TO anon
USING (true);
```

---

## 🚀 Python 连接示例

```python
from supabase import create_client
import os

SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# 查询高优先级需求
result = supabase.table("geo_implementation_iterations")\
    .select("*")\
    .eq("status", "backlog")\
    .in_("priority", ["critical", "high"])\
    .order("created_at", desc=True)\
    .execute()

iterations = result.data

for item in iterations:
    print(f"[{item['priority']}] {item['title']}")
    print(f"  Hours: {item['estimated_hours']}")
    print(f"  Steps: {len(item['implementation_steps'])}")
```

---

## 📁 相关文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 完整Schema | `scripts/complete_database_schema.sql` | 包含所有表、索引、样本数据 |
| 迁移指南 | `scripts/database_migration_guide.sql` | 逐步迁移脚本 |
| 本参考文档 | `docs/DATABASE_SCHEMA_QUICK_REF.md` | 快速参考 |

---

**最后更新**: 2026-03-02  
**版本**: v1.0
