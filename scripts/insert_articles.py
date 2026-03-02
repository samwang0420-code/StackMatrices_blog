#!/usr/bin/env python3
"""
Insert blog articles into Supabase database
"""

import os
import sys
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from supabase import create_client
except ImportError:
    print("Installing supabase-py...")
    os.system("pip3 install supabase -q")
    from supabase import create_client

# Supabase configuration
SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

if not SUPABASE_KEY:
    print("⚠️  Warning: SUPABASE_SERVICE_KEY not set")
    print("Please set: export SUPABASE_SERVICE_KEY=your_key")
    sys.exit(1)

# Blog articles to insert
ARTICLES = [
    {
        "title": "How to Write AI-Optimized Content That Gets Cited by ChatGPT",
        "slug": "ai-optimized-content",
        "category": "Content Strategy",
        "author": "Sarah Kim",
        "read_time": "12 min read",
        "excerpt": "Learn the 5-paragraph framework for creating content that AI systems like ChatGPT and Perplexity actively cite in their responses. Includes real before/after examples and content audit checklist.",
        "cover_image": "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
        "published": True,
        "featured": False,
    },
    {
        "title": "2026 Medical Marketing Predictions: The Year of AI-First Patient Acquisition",
        "slug": "predictions-2026",
        "category": "Industry Trends",
        "author": "Sarah Kim",
        "read_time": "10 min read",
        "excerpt": "5 key predictions for medical marketing in 2026, backed by data from OpenAI, Google SGE, and Perplexity trends. Includes quarterly preparation checklist for practice owners.",
        "cover_image": "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
        "published": True,
        "featured": False,
    },
    {
        "title": "The Complete Guide to Medical Schema Markup for AI Visibility",
        "slug": "schema-markup-guide",
        "category": "Implementation",
        "author": "Sarah Kim",
        "read_time": "18 min read",
        "excerpt": "Complete implementation guide for medical schema markup including Dentist, MedicalProcedure, Physician, and FAQ schemas. Copy-paste JSON-LD examples with validation tips.",
        "cover_image": "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg",
        "published": True,
        "featured": False,
    }
]

def insert_articles():
    """Insert articles into Supabase"""
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        print("🔗 Connecting to Supabase...")
        print(f"📊 URL: {SUPABASE_URL}")
        
        # Check if articles table exists
        try:
            result = supabase.table("articles").select("count").limit(1).execute()
            print("✅ Articles table exists")
        except Exception as e:
            print(f"⚠️  Table check error: {e}")
            print("Creating articles table...")
            # Table will be created via SQL
            create_table_sql = """
            CREATE TABLE IF NOT EXISTS articles (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT UNIQUE NOT NULL,
                category TEXT,
                author TEXT,
                read_time TEXT,
                excerpt TEXT,
                cover_image TEXT,
                content TEXT,
                published BOOLEAN DEFAULT false,
                featured BOOLEAN DEFAULT false,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            """
            print("Please run this SQL in Supabase SQL Editor:")
            print(create_table_sql)
            return
        
        # Insert articles
        inserted = 0
        updated = 0
        
        for article in ARTICLES:
            try:
                # Check if article exists
                existing = supabase.table("articles").select("id").eq("slug", article["slug"]).execute()
                
                if existing.data:
                    # Update existing
                    article["updated_at"] = datetime.now().isoformat()
                    supabase.table("articles").update(article).eq("slug", article["slug"]).execute()
                    print(f"🔄 Updated: {article['title']}")
                    updated += 1
                else:
                    # Insert new
                    article["created_at"] = datetime.now().isoformat()
                    article["updated_at"] = datetime.now().isoformat()
                    supabase.table("articles").insert(article).execute()
                    print(f"✅ Inserted: {article['title']}")
                    inserted += 1
                    
            except Exception as e:
                print(f"❌ Error with {article['slug']}: {e}")
        
        print(f"\n📊 Summary:")
        print(f"   Inserted: {inserted}")
        print(f"   Updated: {updated}")
        print(f"   Total: {inserted + updated}")
        
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    insert_articles()
