import requests
import os
import json
from datetime import datetime

SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

# First, try to create the table using REST API
print("🔧 Creating tech_iterations table...")

create_table_sql = """
CREATE TABLE IF NOT EXISTS tech_iterations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,
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
"""

# Try to execute SQL (this requires pg_execute privilege which may not be available via REST)
# Instead, we'll just insert data assuming table exists or will be created manually

print("⚠️  Please create the table manually in Supabase SQL Editor using:")
print("-" * 60)
print(create_table_sql)
print("-" * 60)

# Tech iteration requirements
iterations = [
    {
        "title": "Blog System Database Migration",
        "description": "Migrate static blog pages to database-driven dynamic rendering. Currently articles are hardcoded as .tsx files.",
        "category": "Backend",
        "priority": "high",
        "status": "in_progress",
        "estimated_hours": 8,
        "tags": ["supabase", "nextjs", "database", "migration"],
        "acceptance_criteria": ["Blog list fetches from API", "Dynamic article routes", "Markdown rendering"],
        "technical_notes": "Use ReactMarkdown with remark-gfm. Implement ISR for static regeneration.",
        "project": "StackMatrices"
    },
    {
        "title": "Case Studies Dynamic Rendering", 
        "description": "Move case studies from hardcoded constants to database. Need case_studies table with results as JSON.",
        "category": "Backend",
        "priority": "high", 
        "status": "planned",
        "estimated_hours": 6,
        "tags": ["database", "schema", "migration", "cases"],
        "acceptance_criteria": ["Create case_studies table", "Migrate 3 existing studies", "Dynamic detail pages"],
        "technical_notes": "Table: id, title, slug, location, type, content, results(JSON), testimonial",
        "project": "StackMatrices"
    },
    {
        "title": "Performance Optimization Bundle",
        "description": "Address Core Web Vitals and loading performance. Current bundle size is large.",
        "category": "Performance",
        "priority": "high",
        "status": "planned", 
        "estimated_hours": 12,
        "tags": ["performance", "cwv", "bundle", "optimization"],
        "acceptance_criteria": ["LCP under 2.5s", "FID under 100ms", "Bundle size -30%"],
        "technical_notes": "Code splitting, next/image optimization, lazy loading, service worker",
        "project": "StackMatrices"
    },
    {
        "title": "Search Functionality Implementation",
        "description": "Add full-text search across blog articles and case studies.",
        "category": "Feature",
        "priority": "medium",
        "status": "planned",
        "estimated_hours": 10,
        "tags": ["search", "fulltext", "algolia", "postgres"],
        "acceptance_criteria": ["Search input in nav", "Real-time suggestions", "Results with filters"],
        "technical_notes": "Use Postgres full-text search or Algolia. Debounced search input.",
        "project": "StackMatrices"
    },
    {
        "title": "Content Management Dashboard",
        "description": "Create admin interface for managing blog articles without code changes.",
        "category": "Frontend", 
        "priority": "medium",
        "status": "planned",
        "estimated_hours": 16,
        "tags": ["admin", "cms", "dashboard", "crud"],
        "acceptance_criteria": ["Protected admin panel", "WYSIWYG editor", "Image upload", "Preview mode"],
        "technical_notes": "TipTap editor, Supabase Auth, Supabase Storage for images",
        "project": "StackMatrices"
    },
    {
        "title": "Content Monitoring System Enhancement",
        "description": "Improve Python content monitor with error handling and auto-publishing.",
        "category": "Automation",
        "priority": "medium",
        "status": "in_progress",
        "estimated_hours": 10,
        "tags": ["python", "cron", "scraping", "automation"],
        "acceptance_criteria": ["Monitor 10+ sources", "AI content generation", "Slack notifications"],
        "technical_notes": "scripts/content_monitor.py. Add retry logic, source priority queue.",
        "project": "StackMatrices"
    },
    {
        "title": "Analytics Dashboard v2",
        "description": "Build comprehensive analytics dashboard with AI visibility metrics and conversion funnels.",
        "category": "Analytics",
        "priority": "medium", 
        "status": "planned",
        "estimated_hours": 20,
        "tags": ["analytics", "dashboard", "metrics", "visualization"],
        "acceptance_criteria": ["Real-time tracking", "AI referral breakdown", "Funnel visualization"],
        "technical_notes": "Recharts/Tremor, aggregate from multiple sources, role-based access",
        "project": "StackMatrices"
    },
    {
        "title": "Newsletter Subscription System",
        "description": "Build email newsletter for blog subscribers with automated digests.",
        "category": "Feature",
        "priority": "low",
        "status": "backlog",
        "estimated_hours": 14,
        "tags": ["newsletter", "email", "marketing", "automation"],
        "acceptance_criteria": ["Email capture forms", "Double opt-in", "Weekly digest", "Analytics"],
        "technical_notes": "Resend API, Supabase edge functions for scheduled digests",
        "project": "StackMatrices"
    },
    {
        "title": "A/B Testing Framework",
        "description": "Implement A/B testing for landing pages and CTAs to optimize conversions.",
        "category": "Growth",
        "priority": "low",
        "status": "backlog", 
        "estimated_hours": 12,
        "tags": ["ab-testing", "growth", "analytics", "experimentation"],
        "acceptance_criteria": ["Experiment UI", "Traffic splitting", "Conversion tracking"],
        "technical_notes": "PostHog or GrowthBook, database-stored experiments, Segment tracking",
        "project": "StackMatrices"
    },
    {
        "title": "Mobile App PWA Features",
        "description": "Enhance PWA capabilities for offline reading and push notifications.",
        "category": "Mobile",
        "priority": "low",
        "status": "backlog",
        "estimated_hours": 8,
        "tags": ["pwa", "mobile", "offline", "notifications"],
        "acceptance_criteria": ["Add to home screen", "Offline reading", "Push notifications"],
        "technical_notes": "Workbox service worker, next-pwa, web app manifest",
        "project": "StackMatrices"
    }
]

print("\n📋 Tech Iteration Summary (Ready to Insert):")
print("=" * 70)

total_hours = 0
by_status = {"in_progress": 0, "planned": 0, "backlog": 0}
by_priority = {"high": 0, "medium": 0, "low": 0}

for item in iterations:
    total_hours += item["estimated_hours"]
    by_status[item["status"]] = by_status.get(item["status"], 0) + 1
    by_priority[item["priority"]] = by_priority.get(item["priority"], 0) + 1
    
    status_emoji = {"completed": "✅", "in_progress": "🔄", "planned": "📅", "backlog": "📝"}.get(item["status"], "⏳")
    priority_emoji = {"critical": "🔴", "high": "🟠", "medium": "🟡", "low": "🟢"}.get(item["priority"], "⚪")
    
    print(f"\n{status_emoji} {priority_emoji} {item['title']}")
    print(f"   Category: {item['category']} | Effort: {item['estimated_hours']}h")
    print(f"   {item['description'][:80]}...")
    print(f"   Tags: {', '.join(item['tags'])}")

print("\n" + "=" * 70)
print(f"📊 Summary: {len(iterations)} iterations, {total_hours} estimated hours")
print(f"   By Status: In Progress ({by_status.get('in_progress', 0)}), Planned ({by_status.get('planned', 0)}), Backlog ({by_status.get('backlog', 0)})")
print(f"   By Priority: High ({by_priority.get('high', 0)}), Medium ({by_priority.get('medium', 0)}), Low ({by_priority.get('low', 0)})")

# Save to JSON for manual import
with open("scripts/tech_iterations_export.json", "w") as f:
    for item in iterations:
        item["created_at"] = datetime.now().isoformat()
        item["updated_at"] = datetime.now().isoformat()
    json.dump(iterations, f, indent=2, default=str)

print(f"\n💾 Exported to: scripts/tech_iterations_export.json")
print("\n⚠️  To complete:")
print("   1. Run the SQL above in Supabase SQL Editor")
print("   2. Import the JSON file or run insert script")
