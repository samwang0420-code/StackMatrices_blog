#!/usr/bin/env node

/**
 * Blog Post Publisher
 * 
 * Usage:
 *   node scripts/publish-post.js --title "My Post" --content "Content here" [--slug "my-post"] [--tags "tag1,tag2"]
 * 
 * Or use environment variable:
 *   PUBLISH_API_KEY=your-key node scripts/publish-post.js --title "Post Title" --content "Content"
 */

const API_URL = process.env.BLOG_API_URL || 'http://localhost:3000/api/publish'
const API_KEY = process.env.PUBLISH_API_KEY || 'dev-key-2026'

// Parse command line arguments
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
  --slug        URL slug (optional, auto-generated)
  --tags        Comma-separated tags (optional)
  --description Short description (optional)
  --author      Author name (optional)

Example:
  node scripts/publish-post.js --title "My Post" --content "Hello world" --tags "news,update"

Environment:
  BLOG_API_URL     API URL (default: http://localhost:3000/api/publish)
  PUBLISH_API_KEY  API key (default: dev-key-2026)
`)
    process.exit(1)
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        title,
        content,
        slug,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        description,
        author
      })
    })

    const result = await response.json()

    if (result.success) {
      console.log(`✅ Post published successfully!`)
      console.log(`   Slug: ${result.slug}`)
      console.log(`   Path: ${result.path}`)
    } else {
      console.log(`❌ Error: ${result.error}`)
      process.exit(1)
    }
  } catch (error) {
    console.log(`❌ Failed to connect: ${error.message}`)
    console.log(`   Make sure the server is running at ${API_URL}`)
    process.exit(1)
  }
}

publish()
