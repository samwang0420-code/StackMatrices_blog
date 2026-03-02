#!/usr/bin/env python3
"""
Generate monitoring report from iterations database
"""

import os
import json
from datetime import datetime, timedelta
from collections import Counter

SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

def generate_report():
    """Generate monitoring report"""
    
    print("📊 Industry Monitor Report")
    print("=" * 70)
    print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-" * 70)
    
    # Load data from JSON fallback
    json_path = "data/geo_iterations.json"
    iterations = []
    
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            iterations = json.load(f)
    
    # Try Supabase
    if SUPABASE_KEY:
        try:
            from supabase import create_client
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            result = supabase.table("geo_implementation_iterations").select("*").execute()
            if result.data:
                iterations = result.data
                print(f"📡 Loaded {len(iterations)} iterations from database")
        except Exception as e:
            print(f"⚠️ Could not load from database: {e}")
    
    if not iterations:
        print("\nℹ️ No iterations found. Run industry_monitor.py first.")
        return
    
    # Statistics
    print(f"\n📈 Total Iterations: {len(iterations)}")
    
    # By priority
    priorities = Counter(i['priority'] for i in iterations)
    print("\n🎯 By Priority:")
    for p in ['critical', 'high', 'medium', 'low']:
        if priorities[p] > 0:
            emoji = {'critical': '🔴', 'high': '🟠', 'medium': '🟡', 'low': '🟢'}[p]
            print(f"   {emoji} {p.upper()}: {priorities[p]}")
    
    # By category
    categories = Counter(i['category'] for i in iterations)
    print("\n📂 By Category:")
    for cat, count in categories.most_common():
        print(f"   • {cat}: {count}")
    
    # By source type
    sources = Counter(i['source_type'] for i in iterations)
    print("\n📡 By Source Type:")
    for src, count in sources.most_common():
        print(f"   • {src}: {count}")
    
    # By affected area
    all_areas = []
    for i in iterations:
        all_areas.extend(i.get('affects', []))
    areas = Counter(all_areas)
    print("\n🌍 Affected Areas:")
    for area, count in areas.most_common():
        print(f"   • {area}: {count}")
    
    # Total estimated hours
    total_hours = sum(i.get('estimated_hours', 0) for i in iterations)
    print(f"\n⏱️  Total Estimated Effort: {total_hours} hours")
    
    # Recent iterations (last 7 days)
    recent = []
    week_ago = datetime.now() - timedelta(days=7)
    for i in iterations:
        try:
            created = datetime.fromisoformat(i['created_at'].replace('Z', '+00:00'))
            if created > week_ago:
                recent.append(i)
        except:
            pass
    
    print(f"\n🆕 Recent (Last 7 days): {len(recent)} iterations")
    for r in recent[:5]:
        print(f"   • [{r['priority'].upper()}] {r['title'][:50]}...")
    
    # Critical items needing attention
    critical = [i for i in iterations if i['priority'] == 'critical' and i['status'] == 'backlog']
    if critical:
        print(f"\n🔴 CRITICAL ITEMS NEEDING ATTENTION: {len(critical)}")
        for c in critical[:5]:
            print(f"   ⚠️ {c['title'][:60]}...")
    
    # Save report
    report = {
        "generated_at": datetime.now().isoformat(),
        "total_iterations": len(iterations),
        "by_priority": dict(priorities),
        "by_category": dict(categories),
        "by_source": dict(sources),
        "by_area": dict(areas),
        "total_hours": total_hours,
        "recent_count": len(recent),
        "critical_pending": len(critical)
    }
    
    os.makedirs("data", exist_ok=True)
    with open("data/monitor_report.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"\n💾 Report saved to: data/monitor_report.json")
    print("=" * 70)

if __name__ == "__main__":
    generate_report()
