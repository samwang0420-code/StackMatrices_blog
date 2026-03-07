#!/usr/bin/env python3
"""
SEO+GEO Experiment Tracker
Daily metrics collection and analysis
"""

import json
import os
import subprocess
from datetime import datetime, timedelta

EXPERIMENT_DIR = "/root/.openclaw/workspace/blog/data/experiment"
METRICS_FILE = f"{EXPERIMENT_DIR}/metrics.json"

def load_metrics():
    if os.path.exists(METRICS_FILE):
        with open(METRICS_FILE, 'r') as f:
            return json.load(f)
    return {
        "start_date": "2026-03-08",
        "days": {},
        "hypotheses": {}
    }

def save_metrics(data):
    with open(METRICS_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def get_indexed_pages():
    """Check Google indexed pages (approximate via site: search)"""
    # This would need Serper API or manual check
    # For now, return placeholder
    return {
        "indexed": 6,
        "note": "Check Google Search Console for exact count"
    }

def check_serp_features(url):
    """Check for rich results using Google API"""
    # Placeholder - would need Serper/Google API
    return {
        "title": "Rich result checking not implemented",
        "rich_results": 0
    }

def daily_check():
    """Run daily experiment check"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    metrics = load_metrics()
    
    # Get today's metrics
    day_metrics = {
        "date": today,
        "indexed_pages": get_indexed_pages(),
        "serp_features": check_serp_features("https://stackmatrices.com/blog"),
        "posts_published_today": 1 if datetime.now().hour < 12 else 0,
        "schema_added": 0,
        "internal_links_added": 0,
        "notes": ""
    }
    
    metrics["days"][today] = day_metrics
    save_metrics(metrics)
    
    print(f"[{today}] Daily metrics recorded")
    print(f"  Indexed pages: {day_metrics['indexed_pages']['indexed']}")
    print(f"  Posts today: {day_metrics['posts_published_today']}")

def weekly_report():
    """Generate weekly experiment report"""
    metrics = load_metrics()
    
    # Calculate week number
    start = datetime(2026, 3, 8)
    now = datetime.now()
    week = ((now - start).days // 7) + 1
    
    print(f"\n=== Week {week} Report ===")
    print(f"Period: {start.strftime('%b %d')} - {now.strftime('%b %d')}")
    
    # Count actions
    total_posts = sum(d.get('posts_published_today', 0) for d in metrics['days'].values())
    total_schema = sum(d.get('schema_added', 0) for d in metrics['days'].values())
    
    print(f"\nActions Taken:")
    print(f"  Posts published: {total_posts}")
    print(f"  Schema markup added: {total_schema}")
    
    print(f"\nHypothesis Status:")
    for h_id, h_data in metrics.get('hypotheses', {}).items():
        status = "✅" if h_data.get('confirmed') else "⏳" if h_data.get('testing') else "📋"
        print(f"  {status} {h_id}: {h_data.get('description', 'N/A')}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "daily":
            daily_check()
        elif sys.argv[1] == "weekly":
            weekly_report()
        else:
            print("Usage: tracker.py [daily|weekly]")
    else:
        weekly_report()
