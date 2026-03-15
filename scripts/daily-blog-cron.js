#!/usr/bin/env node

/**
 * Daily Blog Post Generator
 * Runs automatically to generate and publish blog posts
 */

import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'
import { execSync } from 'child_process'

const BLOG_DIR = join(process.cwd(), 'content', 'blog')
const TOPICS_FILE = join(process.cwd(), 'data', 'monitoring', 'blog_topics.json')

// Article templates based on topics
const articleTemplates = {
  '2024 Plastic Surgery Statistics': () => `# 2024 Plastic Surgery Statistics: What Practices Need to Know

The American Society of Plastic Surgeons (ASPS) has released their annual report, revealing key trends that every aesthetic practice should know about.

## Key Statistics

The latest data shows significant growth in minimally invasive procedures, with Botox and dermal fillers continuing to lead the market. Surgical procedures remain strong, particularly in breast augmentation and body contouring.

## What This Means for Your Practice

1. **Patient Demographics Are Shifting**: Younger patients are entering the market
2. **Social Media Influence**: Platforms like Instagram drive procedure awareness
3. **Virtual Consultations**: The hybrid model is here to stay

## Marketing Implications

Practices that effectively communicate their expertise and results will capture market share. Content marketing around procedure education becomes essential.

## Content Opportunities

Create content around:
- Recovery time expectations
- Before/after case studies
- Procedure comparisons
- Patient testimonials

The practices winning in 2026 are those investing in their digital presence while maintaining clinical excellence.`,

  'FDA Compliance': () => `# FDA Compliance in Medical Marketing: The Complete Guide

Navigating FDA regulations in medical marketing is complex but essential for practice growth.

## Understanding FDA Advertising Rules

The FDA regulates how medical practices can market their services, particularly for:

- FDA-approved devices (lasers, fillers)
- Off-label treatments
- Prescription products

## HIPAA Considerations

Patient privacy extends to marketing. Ensure:
- No patient identifiable information in testimonials
- HIPAA-compliant photo release forms
- Proper consent for case studies

## What AI Systems Think About Compliance

Search engines and AI favor practices that demonstrate:
- Transparent communication
- Evidence-based claims
- Proper credentials display

## Safe vs Risky Content Approaches

**Safe:**
- General procedure information
- Before/after photos with consent
- Educational content
- Staff credentials

**Risky:**
- Guarantees of results
- Unsubstantiated claims
- Price advertising (state-dependent)
- Testimonials without proper context

## Documentation Requirements

Maintain records of:
- All marketing materials
- Patient consent forms
- Staff training
- Compliance reviews`,

  'default': (title, pillar) => `# ${title}

This comprehensive guide explores key strategies for medical practices looking to improve their digital presence and patient acquisition.

## Why This Matters

In today's digital age, patients research extensively before choosing a healthcare provider. Your online presence directly impacts whether they book a consultation.

## Key Strategies

### 1. Establish Authority

Create in-depth content that demonstrates expertise. AI systems and patients both value practices that share valuable knowledge.

### 2. Build Trust Through Transparency

Clear pricing, credentials, and patient reviews build confidence. Include real outcomes and honest assessments.

### 3. Optimize for Local Search

Ensure your practice appears in local results. Claim your Google Business Profile and maintain consistent NAP information.

### 4. Leverage Content Marketing

Educational content about procedures helps patients make informed decisions while building topical authority.

## Implementation Steps

1. **Audit Current Presence**: Review website, listings, reviews
2. **Identify Gaps**: Find content opportunities
3. **Create Content**: Develop pillar and cluster content
4. **Build Links**: Earn citations from authoritative sources
5. **Monitor Results**: Track rankings and conversions

## Conclusion

Success requires consistent effort across multiple channels. Focus on providing genuine value to patients, and the rankings will follow.`
}

async function getNextTopic() {
  try {
    const content = await readFile(TOPICS_FILE, 'utf-8')
    const topics = JSON.parse(content)
    
    // Simple rotation - pick based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    const index = dayOfYear % topics.length
    
    return topics[index]
  } catch (e) {
    return { title: 'Medical Practice Marketing Guide', pillar: 'Strategy' }
  }
}

async function generatePost() {
  console.log('📝 Generating daily blog post...')
  
  const topic = await getNextTopic()
  const title = topic.title
  const pillar = topic.pillar
  
  // Generate slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-')
  
  // Check if already posted
  try {
    const existing = await readFile(join(BLOG_DIR, `${slug}.md`), 'utf-8')
    console.log('Post already exists, skipping.')
    return
  } catch (e) {
    // Good, doesn't exist
  }
  
  // Get template
  let content = articleTemplates[title.split(' ')[0].toLowerCase()]?.() 
    || articleTemplates['default'](title, pillar)
  
  // Create frontmatter
  const frontmatter = `---
title: "${title}"
description: "${title} - Expert insights for medical practices."
date: "${new Date().toISOString().split('T')[0]}"
tags: ["${pillar}", "Medical Marketing", "2026"]
author: "StackMatrices Team"
---

`
  
  const fullContent = frontmatter + content
  
  // Write file
  await mkdir(BLOG_DIR, { recursive: true })
  const filePath = join(BLOG_DIR, `${slug}.md`)
  await writeFile(filePath, fullContent, 'utf-8')
  
  console.log(`✅ Created: ${slug}.md`)
  
  // Commit and push
  try {
    console.log('📤 Pushing to GitHub...')
    execSync('git add -A', { cwd: process.cwd(), stdio: 'ignore' })
    execSync(`git commit -m "Daily: ${title}"`, { cwd: process.cwd(), stdio: 'ignore' })
    execSync('git push origin main', { cwd: process.cwd(), stdio: 'ignore' })
    console.log('✅ Pushed to GitHub!')
  } catch (e) {
    console.log('⚠️ Push failed:', e.message)
  }
}

generatePost()
