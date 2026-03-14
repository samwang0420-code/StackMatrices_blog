import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

// Simple API key check (in production, use proper auth)
const API_KEY = process.env.PUBLISH_API_KEY || 'dev-key-2026'

export async function POST(request: NextRequest) {
  try {
    // Check API key
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const token = authHeader.replace('Bearer ', '')
    if (token !== API_KEY) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, slug, tags, description, author } = body

    if (!title || !content || !slug) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, content, slug' 
      }, { status: 400 })
    }

    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // Create frontmatter
    const frontmatter = `---
title: "${title}"
description: "${description || title}"
date: "${new Date().toISOString().split('T')[0]}"
tags: ${JSON.stringify(tags || [])}
author: "${author || 'StackMatrices Team'}
---

# ${title}

${content}
`

    // Ensure directory exists
    const contentDir = join(process.cwd(), 'content', 'blog')
    await mkdir(contentDir, { recursive: true })

    // Write file
    const filePath = join(contentDir, `${finalSlug}.md`)
    await writeFile(filePath, frontmatter, 'utf-8')

    return NextResponse.json({ 
      success: true, 
      slug: finalSlug,
      path: `content/blog/${finalSlug}.md`
    })

  } catch (error: any) {
    console.error('Publish error:', error)
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 })
  }
}

// GET method to list recent posts
export async function GET() {
  const { readFile, readdir } = await import('fs/promises')
  
  try {
    const contentDir = join(process.cwd(), 'content', 'blog')
    const files = await readdir(contentDir)
    
    const posts = await Promise.all(
      files
        .filter(f => f.endsWith('.md'))
        .slice(0, 10)
        .map(async (file) => {
          const content = await readFile(join(contentDir, file), 'utf-8')
          const titleMatch = content.match(/title:\s*"([^"]+)"/)
          const dateMatch = content.match(/date:\s*"([^"]+)"/)
          
          return {
            slug: file.replace('.md', ''),
            title: titleMatch?.[1] || file,
            date: dateMatch?.[1] || 'Unknown'
          }
        })
    )

    return NextResponse.json({ posts })
  } catch (error: any) {
    return NextResponse.json({ posts: [], error: error.message })
  }
}
