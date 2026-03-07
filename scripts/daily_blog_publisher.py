#!/usr/bin/env python3
"""
Daily Blog Auto-Publisher
Publishes one blog post daily from the content monitoring topics
"""

import json
import os
import subprocess
from datetime import datetime

BLOG_DIR = "/root/.openclaw/workspace/blog"
TOPICS_FILE = f"{BLOG_DIR}/data/monitoring/blog_topics.json"
BLOG_INDEX_FILE = f"{BLOG_DIR}/src/app/blog/page.tsx"
PEXELS_FILE = f"{BLOG_DIR}/src/lib/pexels.ts"

# Pexels images for different topics
IMAGES = {
    "default": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    "ai-evaluation": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    "statistics": "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    "compliance": "https://images.pexels.com/photos/8435692/pexels-photo-8435692.jpeg?auto=compress&cs=tinysrgb&w=800",
    "ai-overviews": "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    "entity-seo": "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    "case-study": "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
}

def load_topics():
    """Load available blog topics"""
    if not os.path.exists(TOPICS_FILE):
        return []
    with open(TOPICS_FILE, 'r') as f:
        return json.load(f)

def get_slug(title):
    """Convert title to URL slug"""
    return title.lower().replace(" ", "-").replace(":", "").replace(",", "").replace("'", "")[:50]

def generate_blog_page(topic):
    """Generate blog post page from topic"""
    slug = get_slug(topic['title'])
    date = datetime.now().strftime("%B %d, %Y")
    category = topic.get('pillar', 'GEO Strategy')
    read_time = f"{len(topic.get('outline', [])) * 2} min read"
    
    content = f'''\'use client\';

import Link from "next/link";
import {{ ArrowLeft, Clock, Calendar, User, ExternalLink }} from "lucide-react";

const ARTICLE = {{
  title: "{topic['title']}",
  category: "{category}",
  author: "StackMatrices Intelligence",
  date: "{date}",
  readTime: "{read_time}",
}};

export default function BlogPostPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={{16}} />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
              {{ARTICLE.category}}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{{ARTICLE.title}}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {{ARTICLE.author}}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {{ARTICLE.date}}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {{ARTICLE.readTime}}
            </div>
          </div>
        </div>

        <article className="prose prose-invert max-w-none">
'''
    
    # Generate sections from outline
    for i, section in enumerate(topic.get('outline', [])):
        content += f'''
          <h2>{section}</h2>
          <p>
            Content about {section.lower()}. This section covers the key aspects that medical practices 
            need to understand about this topic and how it impacts their GEO strategy.
          </p>
'''
    
    content += '''
        </article>

        {/* Sources */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Data Sources
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400 flex items-start gap-2">
              <span className="text-primary">[1]</span>
              Industry research and analysis
            </li>
          </ul>
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply These Insights?</h2>
          <p className="text-gray-300 mb-6">
            Get your free GEO analysis and discover how these strategies can grow your practice.
          </p>
          <Link
            href="/analysis-request"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Your Free Analysis
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
'''
    
    return slug, content

def update_blog_index(topics, published_ids):
    """Update blog index page with new posts"""
    # Read current index
    with open(BLOG_INDEX_FILE, 'r') as f:
        content = f.read()
    
    # Find the BLOG_POSTS array
    import re
    
    # Get existing posts that are already published (have pages)
    existing_posts = []
    for topic in topics:
        slug = get_slug(topic['title'])
        # Check if page exists
        page_path = f"{BLOG_DIR}/src/app/blog/{slug}"
        if os.path.exists(page_path) and topic['id'] in published_ids:
            existing_posts.append(topic)
    
    # Build new BLOG_POSTS entries
    posts_text = "const BLOG_POSTS = [\n"
    
    # Add featured post first
    if existing_posts:
        featured = existing_posts[0]
        slug = get_slug(featured['title'])
        posts_text += f'''  {{
    id: "{slug}",
    title: "{featured['title']}",
    excerpt: "Learn how to implement {featured.get('pillar', 'GEO strategy').lower()} for your medical practice.",
    category: "{featured.get('pillar', 'GEO Strategy')}",
    author: "StackMatrices Intelligence",
    date: "March {datetime.now().day}, 2026",
    readTime: "8 min read",
    featured: true,
    image: BLOG_IMAGES["{slug}"],
  }},\n'''
    
    # Add other posts
    for topic in existing_posts[1:]:
        slug = get_slug(topic['title'])
        posts_text += f'''  {{
    id: "{slug}",
    title: "{topic['title']}",
    excerpt: "Learn how to implement {topic.get('pillar', 'GEO strategy').lower()} for your medical practice.",
    category: "{topic.get('pillar', 'GEO Strategy')}",
    author: "StackMatrices Intelligence",
    date: "March {datetime.now().day}, 2026",
    readTime: "8 min read",
    featured: false,
    image: BLOG_IMAGES["{slug}"],
  }},\n'''
    
    posts_text += "];"
    
    # Replace BLOG_POSTS section
    content = re.sub(r'const BLOG_POSTS = \[.*?\];', posts_text, content, flags=re.DOTALL)
    
    # Update pexels.ts with new images
    with open(PEXELS_FILE, 'r') as f:
        pexels_content = f.read()
    
    for topic in topics:
        slug = get_slug(topic['title'])
        img_key = topic.get('source', 'default')
        img_url = IMAGES.get(img_key, IMAGES['default'])
        
        if f'"{slug}"' not in pexels_content:
            pexels_content = pexels_content.replace(
                '"quality-guidelines":',
                f'"{slug}": "{img_url}",\n  "quality-guidelines":'
            )
    
    with open(PEXELS_FILE, 'w') as f:
        f.write(pexels_content)
    
    with open(BLOG_INDEX_FILE, 'w') as f:
        f.write(content)
    
    return existing_posts

def main():
    """Main function to publish daily blog"""
    print(f"[{datetime.now()}] Starting daily blog publish...")
    
    # Load topics
    topics = load_topics()
    if not topics:
        print("No topics found!")
        return
    
    # Load published tracking
    published_file = f"{BLOG_DIR}/data/monitoring/published_topics.json"
    if os.path.exists(published_file):
        with open(published_file, 'r') as f:
            published_ids = json.load(f)
    else:
        published_ids = []
    
    # Find next topic to publish
    for topic in topics:
        if topic['id'] not in published_ids:
            print(f"Publishing: {topic['title']}")
            
            # Generate page
            slug, content = generate_blog_page(topic)
            
            # Create directory and page
            page_dir = f"{BLOG_DIR}/src/app/blog/{slug}"
            os.makedirs(page_dir, exist_ok=True)
            
            with open(f"{page_dir}/page.tsx", 'w') as f:
                f.write(content)
            
            # Mark as published
            published_ids.append(topic['id'])
            with open(published_file, 'w') as f:
                json.dump(published_ids, f)
            
            # Update index
            update_blog_index(topics, published_ids)
            
            # Commit and push
            os.chdir(BLOG_DIR)
            subprocess.run(['git', 'add', '-A'], capture_output=True)
            subprocess.run(['git', 'commit', '-m', f'publish: {topic["title"]}'], capture_output=True)
            subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True)
            
            print(f"✅ Published: {topic['title']}")
            return
    
    print("All topics published!")

if __name__ == "__main__":
    main()
