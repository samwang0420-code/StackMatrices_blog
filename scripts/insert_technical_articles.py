#!/usr/bin/env python3
"""
Insert technical blog articles into Supabase database
Uses existing table schema
"""

import os
import sys
from datetime import datetime

SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_KEY:
    print("❌ Error: SUPABASE_SERVICE_ROLE_KEY not set")
    sys.exit(1)

try:
    from supabase import create_client
except ImportError:
    os.system("pip3 install supabase -q")
    from supabase import create_client

# Technical articles - using existing schema columns
TECHNICAL_ARTICLES = [
    {
        "title": "The Complete Guide to Medical Schema Markup for AI Visibility",
        "slug": "schema-markup-guide",
        "category": "Implementation",
        "author": "Sarah Kim",
        "author_name": "Sarah Kim",
        "read_time": "18 min read",
        "excerpt": "Complete implementation guide for medical schema markup including Dentist, MedicalProcedure, Physician, and FAQ schemas. Copy-paste JSON-LD examples with validation tips.",
        "image_url": "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg",
        "content": "## What Is Schema Markup\\n\\nSchema markup is structured data that helps AI systems understand your content...",
        "tags": ["schema", "technical", "implementation", "json-ld"],
        "published": True,
        "featured": False,
    },
    {
        "title": "How to Write AI-Optimized Content That Gets Cited by ChatGPT",
        "slug": "ai-optimized-content",
        "category": "Content Strategy",
        "author": "Sarah Kim",
        "author_name": "Sarah Kim",
        "read_time": "12 min read",
        "excerpt": "Learn the 5-paragraph framework for creating content that AI systems actively cite. Includes real examples and content audit checklist.",
        "image_url": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
        "content": "## The Anatomy of AI-Cited Content\\n\\nWhen ChatGPT recommends a medical practice...",
        "tags": ["content", "ai", "optimization", "writing"],
        "published": True,
        "featured": False,
    },
    {
        "title": "2026 Medical Marketing Predictions: The Year of AI-First Patient Acquisition",
        "slug": "predictions-2026",
        "category": "Industry Trends",
        "author": "Sarah Kim",
        "author_name": "Sarah Kim",
        "read_time": "10 min read",
        "excerpt": "5 key predictions for medical marketing in 2026, backed by data from OpenAI, Google SGE, and Perplexity trends.",
        "image_url": "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
        "content": "## The AI-First Shift\\n\\n2026 will be remembered as the year AI became the primary patient acquisition channel...",
        "tags": ["predictions", "2026", "trends", "ai"],
        "published": True,
        "featured": False,
    },
    {
        "title": "The Hidden Cost Calculator",
        "slug": "hidden-cost-calculator",
        "category": "Tools",
        "author": "Sarah Kim",
        "author_name": "Sarah Kim",
        "read_time": "8 min read",
        "excerpt": "Calculate the true cost of AI invisibility for your medical practice. Interactive tool showing revenue leakage.",
        "image_url": "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg",
        "content": "## The True Cost of AI Invisibility\\n\\nMost medical practices don't realize how much revenue they're losing...",
        "tags": ["calculator", "roi", "revenue", "tools"],
        "published": True,
        "featured": False,
    },
    {
        "title": "The Medical GEO Checklist",
        "slug": "geo-checklist",
        "category": "Implementation",
        "author": "Sarah Kim",
        "author_name": "Sarah Kim",
        "read_time": "15 min read",
        "excerpt": "Complete implementation checklist for medical practices starting GEO. 47 actionable items across technical, content, and authority building.",
        "image_url": "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        "content": "## Technical Setup\\n\\n- Schema markup implementation\\n- Local SEO optimization\\n- Site structure improvements...",
        "tags": ["checklist", "implementation", "geo", "technical"],
        "published": True,
        "featured": False,
    },
]

def insert_articles():
    try:
        print("🔗 Connecting to Supabase...")
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get existing columns
        result = supabase.table("articles").select("*").limit(1).execute()
        if result.data:
            existing_cols = set(result.data[0].keys())
            print(f"✅ Connected. Available columns: {len(existing_cols)}")
        
        # Insert articles
        inserted = 0
        updated = 0
        
        for article in TECHNICAL_ARTICLES:
            try:
                # Filter to only existing columns
                filtered = {k: v for k, v in article.items() if k in existing_cols}
                
                # Add timestamps
                now = datetime.now().isoformat()
                filtered["created_at"] = now
                filtered["updated_at"] = now
                filtered["date"] = now[:10]  # YYYY-MM-DD
                
                # Check if exists
                existing = supabase.table("articles").select("id").eq("slug", article["slug"]).execute()
                
                if existing.data:
                    supabase.table("articles").update(filtered).eq("slug", article["slug"]).execute()
                    print(f"🔄 Updated: {article['title'][:50]}...")
                    updated += 1
                else:
                    supabase.table("articles").insert(filtered).execute()
                    print(f"✅ Inserted: {article['title'][:50]}...")
                    inserted += 1
                    
            except Exception as e:
                print(f"❌ Error with {article['slug']}: {e}")
        
        print(f"\n📊 Summary: Inserted {inserted}, Updated {updated}")
        
        # Show all articles
        all_articles = supabase.table("articles").select("title,slug,category,published").execute()
        print(f"\n📚 Total articles in database: {len(all_articles.data)}")
        for a in all_articles.data:
            status = "✅" if a.get('published') else "📝"
            print(f"   {status} {a['title'][:45]}... ({a['category']})")
        
        return True
        
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = insert_articles()
    sys.exit(0 if success else 1)
