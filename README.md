# Stackmatrices - Next.js + next-seo

Next.js 版本的 Stackmatrices SaaS Tool Discovery 平台，集成了完整的 SEO 支持。

## 特性

- ✅ **Next.js 14** - React 服务端渲染框架
- ✅ **next-seo** - 完整的 SEO 优化（Open Graph, Twitter Cards, JSON-LD）
- ✅ **TypeScript** - 类型安全
- ✅ **Tailwind CSS** - 现代化样式
- ✅ **静态导出** - 适合 Cloudflare Pages 部署

## 页面

- `/` - 首页（推荐工具 + 精选文章）
- `/directory` - 工具目录（6个分类）
- `/blog` - 博客（评测文章）

## SEO 配置

每个页面都配置了：
- Title & Description
- Canonical URL
- Open Graph 标签
- Twitter Cards
- Schema.org 结构化数据

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 部署到 Cloudflare Pages

### 方式1: 直接上传
```bash
# 构建
npm run build

# dist/ 文件夹就是部署文件
cd dist
```

### 方式2: Git 集成
1. 创建 GitHub 仓库
2. 推送代码到 GitHub
3. 在 Cloudflare Pages 连接 GitHub 仓库
4. 构建命令: `npm run build`
5. 输出目录: `dist`

## 文件结构

```
src/
├── app/
│   ├── layout.tsx      # 根布局 + DefaultSeo
│   ├── page.tsx        # 首页
│   ├── directory/
│   │   └── page.tsx    # 工具目录
│   ├── blog/
│   │   └── page.tsx    # 博客
│   └── globals.css     # 全局样式
├── components/
│   ├── Navbar.tsx      # 导航栏
│   └── Footer.tsx      # 页脚
├── lib/
│   ├── constants.ts    # 数据和站点配置
│   └── types.ts        # TypeScript 类型
```

## 自定义 SEO

修改 `src/lib/constants.ts` 中的 `SITE_CONFIG`：

```typescript
export const SITE_CONFIG = {
  name: 'Stackmatrices',
  description: 'Your custom description',
  url: 'https://yourdomain.com',
  twitter: '@yourhandle',
  image: 'https://yourdomain.com/og-image.jpg',
};
```

## 注意事项

- 使用 `<img>` 标签而非 Next.js `<Image>` 以支持静态导出
- 图片使用 placeholder.co 服务，建议替换为实际图片
- 构建输出为 `dist/` 文件夹
