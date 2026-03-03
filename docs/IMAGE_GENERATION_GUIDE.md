# X 内容图片生成指南

## 🎨 三种图片生成方案

### 方案1：数据可视化图表（推荐，免费）

使用 **Matplotlib** 生成专业图表

```bash
python3 scripts/generate_chart_images.py
```

**生成内容**：
- 📊 Before/After 对比图
- 📈 数据仪表板
- 📋 步骤流程图
- 💰 ROI 对比图

**优点**：
- ✅ 完全免费
- ✅ 数据真实准确
- ✅ 专业可信
- ✅ 可定制化

---

### 方案2：信息图卡片（推荐，免费）

使用 **Pillow** 生成文字+图形组合

```bash
python3 scripts/generate_infographics.py
```

**生成内容**：
- 🔢 单数字高亮卡片
- 🔄 Before/After 对比
- ✅ 清单/列表卡片
- 🚨 警告/公告卡片

**优点**：
- ✅ 视觉冲击力
- ✅ 适合手机观看
- ✅ 文字清晰可读
- ✅ 品牌一致

---

### 方案3：AI 生成图片（需API Key）

使用 **DALL-E 3** 或 **Stability AI**

```bash
# 需要设置环境变量
export OPENAI_API_KEY="your_key"
export STABILITY_API_KEY="your_key"

# 生成图片
python3 scripts/generate_ai_images.py schema
```

**生成内容**：
- 🖼️ 概念艺术图
- 🎨 抽象可视化
- 🤖 AI 主题插图

**优点**：
- ✅ 独特创意
- ✅ 视觉冲击
- ❌ 需要付费 API
- ❌ 可能不精确

---

## 📋 工作流程

### 每日流程

```
1. 生成内容（早上7点自动）
   python3 scripts/generate_daily_content.py

2. 选择/生成配图
   python3 scripts/generate_infographics.py
   
3. 查看生成的图片
   ls public/generated-images/

4. 选择最合适的一张

5. 发布到 X
   - 复制文字内容
   - 上传图片
   - 添加 alt 文本（重要）
```

---

## 🖼️ 图片尺寸规范

| 平台 | 推荐尺寸 | 比例 | 我们的设置 |
|------|---------|------|-----------|
| X 推文 | 1200x675 | 16:9 | ✅ 1200x675 |
| X 卡片 | 1200x628 | 1.91:1 | ✅ 适配 |
| Instagram | 1080x1080 | 1:1 | 可扩展 |
| LinkedIn | 1200x627 | 1.91:1 | ✅ 适配 |

---

## 🎨 品牌配色

```python
DARK_BG = (11, 15, 25)      # #0B0F19 背景
PRIMARY = (14, 165, 233)    # #0EA5E9 主色（蓝）
ACCENT = (16, 185, 129)     # #10B981 强调（绿）
DANGER = (239, 68, 68)      # #EF4444 警告（红）
WHITE = (255, 255, 255)     # #FFFFFF 白色
GRAY = (107, 114, 128)      # #6B7280 灰色
```

---

## 📝 内容-图片配对建议

| 内容类型 | 推荐图片类型 | 示例 |
|---------|-------------|------|
| 数据分享 | 数据图表 | `stat_84.png` |
| 案例研究 | Before/After对比 | `comparison_18_74.png` |
| 框架/步骤 | 步骤图 | `steps_5.png` |
| 清单 | 清单卡 | `list_4.png` |
| 警报/新闻 | 警告卡 | `alert_🚨.png` |
| ROI对比 | 双轴图表 | `roi_comparison.png` |

---

## 💡 最佳实践

### 1. 每张图片都要有 Alt 文本

发布时在 X 上添加图片描述：

```
Alt: "Chart showing AI visibility improvement from 18/100 to 74/100 after 90 days of GEO implementation"
```

### 2. 文字要可读

- 字体大小：标题 ≥48px，正文 ≥24px
- 对比度：确保在手机上清晰可见
- 简洁：不要堆太多信息

### 3. 一致性

- 使用相同品牌色
- 保留 StackMatrices logo/水印
- 统一风格（科技感、专业）

### 4. A/B 测试

同一内容，试不同图片：
- 数据图表 vs 信息图
- 对比哪种互动率更高

---

## 🔧 自定义生成

### 自定义数据图表

编辑 `generate_chart_images.py`：

```python
# 修改数据
create_comparison_chart(
    title="Your Custom Title",
    before_val=25,      # 修改数值
    after_val=85,
    before_label="Before",
    after_label="After",
    metric="/100"
)
```

### 自定义信息图

编辑 `generate_infographics.py`：

```python
# 自定义清单
items = [
    "Your custom item 1",
    "Your custom item 2",
    "Your custom item 3"
]
create_list_card("Your Title", items)
```

---

## 📁 文件位置

```
public/generated-images/
├── stat_84.png                 # 单数字卡片
├── stat_3.2x.png              # 倍数卡片
├── stat_$3.4M.png             # 金额卡片
├── comparison_18_74.png       # 对比图（Matplotlib）
├── comparison_18_100_74_100.png  # 对比图（Pillow）
├── dashboard_4.png            # 数据仪表板
├── steps_5.png                # 步骤图
├── roi_comparison.png         # ROI对比
├── list_4.png                 # 清单卡片
└── alert_🚨.png              # 警告卡片
```

---

## 🚀 快速开始

```bash
# 1. 生成今日内容
python3 scripts/generate_daily_content.py

# 2. 生成配图（选一种）
python3 scripts/generate_infographics.py

# 3. 查看生成的图片
ls public/generated-images/

# 4. 选择图片，上传到 X
# https://stackmatrices.com/generated-images/stat_84.png
```

---

*最后更新: 2026-03-03*
