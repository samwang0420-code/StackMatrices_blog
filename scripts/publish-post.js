#!/usr/bin/env node

/**
 * Blog Post Publisher
 * 
 * 直接写入本地文件并推送到 GitHub
 */

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { execSync } from 'child_process'

const BLOG_DIR = join(process.cwd(), 'content', 'blog')

function getFrontmatter(data) {
  const tags = data.tags ? JSON.stringify(data.tags) : '[]'
  return `---
title: "${data.title}"
description: "${data.description || data.title}"
date: "${new Date().toISOString().split('T')[0]}"
tags: ${tags}
author: "${data.author || 'StackMatrices Team'}"
---

# ${data.title}

${data.content}
`
}

const args = process.argv.slice(2)
const params = {}

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].replace('--', '')
    const value = args[i + 1]
    if (value && !value.startsWith('--')) {
      params[key] = value
      i++
    }
  }
}

async function publish() {
  const { title, content, slug, tags, description, author } = params

  if (!title || !content) {
    console.log(`
Blog Post Publisher

Usage: node scripts/publish-post.js [options]

Options:
  --title       Post title (required)
  --content     Post content (required)
  --slug        URL slug (optional)
  --tags        Comma-separated tags (optional)
  --description Short description (optional)

Example:
  node scripts/publish-post.js --title "My Post" --content "Hello world" --tags "news,update"
`)
    process.exit(1)
  }

  const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-')
  
  await mkdir(BLOG_DIR, { recursive: true })
  
  const fullContent = getFrontmatter({
    title,
    description,
    tags: tags ? tags.split(',').map(t => t.trim()) : [],
    author,
    content
  })
  
  const filePath = join(BLOG_DIR, `${finalSlug}.md`)
  await writeFile(filePath, fullContent, 'utf-8')
  
  console.log(`✅ Post created: ${filePath}`)
  
  try {
    console.log('📤 Pushing to GitHub...')
    execSync('git add -A', { cwd: process.cwd(), stdio: 'ignore' })
    execSync(`git commit -m "Add: ${title}"`, { cwd: process.cwd(), stdio: 'ignore' })
    execSync('git push origin main', { cwd: process.cwd(), stdio: 'ignore' })
    console.log('✅ Pushed to GitHub!')
  } catch (e) {
    console.log('⚠️ Git push failed, but file was created locally.')
  }
}

publish()
