#!/usr/bin/env python3
"""
Create tech_iterations table for tracking system improvements
Other projects can read from this to drive their roadmap
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

# Tech iteration requirements for StackMatrices
ITERATIONS = [
    {
        "title": "Blog System Database Migration",
        "description": "Migrate static blog pages to database-driven dynamic rendering. Currently 9 articles are hardcoded as .tsx files. Need to create dynamic routes that fetch from Supabase articles table.",
        "category": "Backend",
        "priority": "high",
        "status": "in_progress",
        "estimated_hours": 8,
        "tags": ["supabase", "nextjs", "database", "migration"],
        "acceptance_criteria": [
            "Blog list page fetches from /api/articles",
            "Article detail pages use dynamic routes with slug",
            "Markdown rendering with syntax highlighting",
            "View count tracking works correctly",
            "SEO meta tags populated from database"
        ],
        "technical_notes": "Use ReactMarkdown with remark-gfm for content rendering. Implement ISR for static regeneration. Cache API responses for performance."
    },
    {
        "title": "Content Management Dashboard",
        "description": "Create admin interface for managing blog articles without code changes. Need CRUD operations for articles with rich text editor.",
        "category": "Frontend",
        "priority": "medium",
        "estimated_hours": 16,
        "status": "planned",
        "tags": ["admin", "cms", "dashboard", "crud"],
        "acceptance_criteria": [
            "Login-protected admin panel",
            "WYSIWYG editor for article content",
            "Image upload to storage bucket",
            "Preview before publish",
            "Draft/Published state management"
        ],
        "technical_notes": "Use TipTap or Slate.js for editor. Implement JWT auth with Supabase Auth. Store images in Supabase Storage."
    },
    {
        "title": "Case Studies Dynamic Rendering",
        "description": "Move case studies from hardcoded constants to database. Currently 3 case studies are in page.tsx files. Need schema for case_studies table.",
        "category": "Backend", 
        "priority": "high",
        "estimated_hours": 6,
        "status": "planned",
        "tags": ["database", "schema", "migration", "cases"],
        "acceptance_criteria": [
            "Create case_studies table",
            "Migrate 3 existing case studies",
            "Dynamic case study detail pages",
            "Results metrics as JSON column",
            "Related cases recommendation"
        ],
        "technical_notes": "Table schema: id, title, slug, location, type, client_profile, challenge, solution, results(JSON), testimonial, image_url."
    },
    {
        "title": "Search Functionality Implementation",
        "description": "Add full-text search across blog articles and case studies. Currently no search capability exists.",
        "category": "Feature",
        "priority": "medium", 
        "estimated_hours": 10,
        "status": "planned",
        "tags": ["search", "fulltext", "algolia", "postgres"],
        "acceptance_criteria": [
            "Search input in navigation",
            "Real-time search suggestions",
            "Search results page with filters",
            "Highlight matching terms",
            "Search analytics tracking"
        ],
        "technical_notes": "Option 1: Use Postgres full-text search with tsvector. Option 2: Algolia for better relevance. Implement debounced search input."
    },
    {
        "title": "Performance Optimization Bundle",
        "description": "Address Core Web Vitals and loading performance. Current bundle size is large and LCP needs improvement.",
        "category": "Performance",
        "priority": "high",
        "estimated_hours": 12,
        "status": "planned",
        "tags": ["performance", "cwv", "bundle", "optimization"],
        "acceptance_criteria": [
            "LCP under 2.5s",
            "FID under 100ms", 
            "CLS under 0.1",
            "Bundle size reduced by 30%",
            "Image optimization with WebP"
        ],
        "technical_notes": "Implement code splitting for heavy components. Use next/image with priority loading. Lazy load below-fold content. Add service worker for caching."
    },
    {
        "title": "Newsletter Subscription System",
        "description": "Build email newsletter system for blog subscribers. Capture leads and send automated digest emails.",
        "category": "Feature",
        "priority": "low",
        "estimated_hours": 14,
        "status": "backlog",
        "tags": ["newsletter", "email", "marketing", "automation"],
        "acceptance_criteria": [
            "Email capture forms in blog posts",
            "Double opt-in verification",
            "Weekly digest email template",
            "Unsubscribe management",
            "Subscriber analytics dashboard"
        ],
        "technical_notes": "Use Resend API for email delivery. Store subscribers in Supabase. Create edge function for scheduled digests."
    },
    {
        "title": "Content Monitoring System Enhancement",
        "description": "Improve the Python content monitor with better error handling, multi-source aggregation, and auto-publishing workflow.",
        "category": "Automation",
        "priority": "medium",
        "estimated_hours": 10,
        "status": "in_progress",
        "tags": ["python", "cron", "scraping", "automation"],
        "acceptance_criteria": [
            "Monitor 10+ authority sources",
            "AI-powered content summarization",
            "Auto-generate draft articles",
            "Slack notifications for new content",
            "Retry logic for failed fetches"
        ],
        "technical_notes": "Current script at scripts/content_monitor.py. Add exponential backoff. Implement source priority queue. Use GPT-4 for content generation."
    },
    {
        "title": "A/B Testing Framework",
        "description": "Implement A/B testing for landing pages and CTAs. Need to optimize conversion rates on analysis-request form.",
        "category": "Growth",
        "priority": "low",
        "estimated_hours": 12,
        "status": "backlog",
        "tags": ["ab-testing", "growth", "analytics", "experimentation"],
        "acceptance_criteria": [
            "Experiment configuration UI",
            "50/50 traffic splitting",
            "Conversion tracking per variant",
            "Statistical significance calculator",
            "Winner auto-deployment"
        ],
        "technical_notes": "Use PostHog or GrowthBook for experimentation. Store experiments in database. Track events with Segment."
    },
    {
        "title": "Mobile App PWA Features",
        "description": "Enhance PWA capabilities for offline reading and push notifications.",
        "category": "Mobile",
        "priority": "low",
        "estimated_hours": 8,
        "status": "backlog",
        "tags": ["pwa", "mobile", "offline", "notifications"],
        "acceptance_criteria": [
            "Add to home screen prompt",
            "Offline article reading",
            "Push notifications for new posts",
            "Background sync for comments",
            "App-like navigation"
        ],
        "technical_notes": "Implement service worker with Workbox. Use next-pwa package. Add web app manifest."
    },
    {
        "title": "Analytics Dashboard v2",
        "description": "Build comprehensive analytics dashboard showing AI visibility metrics, conversion funnels, and content performance.",
        "category": "Analytics",
        "priority": "medium",
        "estimated_hours": 20,
        "status": "planned",
        "tags": ["analytics", "dashboard", "metrics", "visualization"],
        "acceptance_criteria": [
            "Real-time visitor tracking",
            "AI referral source breakdown",
            "Content performance ranking",
            "Conversion funnel visualization",
            "Export to CSV/PDF reports"
        ],
        "technical_notes": "Use Recharts or Tremor for visualizations. Aggregate data from multiple sources. Implement role-based access."
    }
]

def create_table_and_insert():
    try:
        print("🔗 Connecting to Supabase...")
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Check if table exists by trying to query
        try:
            result = supabase.table("tech_iterations").select("count").limit(1).execute()
            print("✅ tech_iterations table exists")
        except Exception as e:
            print(f"⚠️  Table may not exist: {e}")
            print("\nPlease run this SQL in Supabase SQL Editor first:")
            print("-" * 60)
            print('''
CREATE TABLE IF NOT EXISTS tech_iterations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status TEXT NOT NULL CHECK (status IN ('backlog', 'planned', 'in_progress', 'completed', 'cancelled')),
    estimated_hours INTEGER,
    actual_hours INTEGER,
    tags TEXT[] DEFAULT '{}',
    acceptance_criteria TEXT[] DEFAULT '{}',
    technical_notes TEXT,
    assigned_to TEXT,
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    project TEXT DEFAULT 'StackMatrices'
);

CREATE INDEX IF NOT EXISTS idx_tech_iterations_status ON tech_iterations(status);
CREATE INDEX IF NOT EXISTS idx_tech_iterations_priority ON tech_iterations(priority);
CREATE INDEX IF NOT EXISTS idx_tech_iterations_category ON tech_iterations(category);
CREATE INDEX IF NOT EXISTS idx_tech_iterations_project ON tech_iterations(project);

ALTER TABLE tech_iterations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON tech_iterations
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage" ON tech_iterations
    FOR ALL USING (auth.role() = 'authenticated');
            ''')
            print("-" * 60)
            return
        
        # Insert iterations
        inserted = 0
        updated = 0
        
        for item in ITERATIONS:
            try:
                # Add metadata
                item["project"] = "StackMatrices"
                item["created_at"] = datetime.now().isoformat()
                item["updated_at"] = datetime.now().isoformat()
                
                # Check if exists
                existing = supabase.table("tech_iterations").select("id").eq("title", item["title"]).execute()
                
                if existing.data:
                    supabase.table("tech_iterations").update(item).eq("title", item["title"]).execute()
                    print(f"🔄 Updated: {item['title']}")
                    updated += 1
                else:
                    supabase.table("tech_iterations").insert(item).execute()
                    print(f"✅ Inserted: {item['title']}")
                    inserted += 1
                    
            except Exception as e:
                print(f"❌ Error with {item['title']}: {e}")
        
        print(f"\n📊 Summary: Inserted {inserted}, Updated {updated}")
        
        # Show summary by status
        status_result = supabase.table("tech_iterations").select("status,count").execute()
        
        print("\n📋 Iteration Backlog Summary:")
        print("-" * 50)
        
        for item in ITERATIONS:
            status_emoji = {
                "completed": "✅",
                "in_progress": "🔄", 
                "planned": "📅",
                "backlog": "📝"
            }.get(item["status"], "⏳")
            priority_emoji = {
                "critical": "🔴",
                "high": "🟠",
                "medium": "🟡",
                "low": "🟢"
            }.get(item["priority"], "⚪")
            print(f"{status_emoji} {priority_emoji} [{item['category']}] {item['title'][:40]}... ({item['estimated_hours']}h)")
        
        print("-" * 50)
        total_hours = sum(i["estimated_hours"] for i in ITERATIONS)
        print(f"Total estimated effort: {total_hours} hours")
        
        return True
        
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = create_table_and_insert()
    sys.exit(0 if success else 1)
