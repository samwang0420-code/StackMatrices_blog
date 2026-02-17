#!/bin/bash

# 推送到 GitHub 脚本
# 使用方法: ./push-github.sh YOUR_GITHUB_TOKEN

TOKEN=$1
REPO="samwang0420-code/StackMatrices_blog"

if [ -z "$TOKEN" ]; then
    echo "❌ 请提供 GitHub Personal Access Token"
    echo "使用方法: ./push-github.sh ghp_xxxxxxxxxxxx"
    exit 1
fi

# 设置远程仓库
git remote remove origin 2>/dev/null
git remote add origin "https://${TOKEN}@github.com/${REPO}.git"

# 切换到 main 分支
git branch -M main

# 推送代码
echo "🚀 推送到 GitHub..."
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo "✅ 代码已推送到 GitHub: https://github.com/${REPO}"
    echo ""
    echo "下一步: Cloudflare Pages 部署"
    echo "1. 登录 Cloudflare Pages"
    echo "2. 连接 GitHub 仓库: ${REPO}"
    echo "3. 构建设置:"
    echo "   - Build command: npm run build"
    echo "   - Build output directory: dist"
else
    echo "❌ 推送失败，请检查 Token 是否正确"
fi
