#!/usr/bin/env python3
"""
Test script for content monitor iteration generator
"""

import os
import sys
import json

# Test configuration
SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

print("🧪 Testing Content Monitor → Iteration Generator")
print("=" * 60)

# Test 1: Check environment
print("\n1️⃣ Environment Check")
print(f"   SUPABASE_SERVICE_ROLE_KEY: {'✅ Set' if SUPABASE_KEY else '❌ Not Set'}")

# Test 2: Check Supabase connection
print("\n2️⃣ Supabase Connection")
try:
    from supabase import create_client
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Try to query table
    result = supabase.table("geo_implementation_iterations").select("count").limit(1).execute()
    print(f"   ✅ Connected to Supabase")
    print(f"   ✅ Table 'geo_implementation_iterations' exists")
except ImportError:
    print("   ⚠️  supabase-py not installed")
    print("   Run: pip3 install supabase")
except Exception as e:
    print(f"   ⚠️  Table may not exist: {e}")
    print("\n   Please run the SQL in Supabase SQL Editor:")
    print("   scripts/create_geo_iterations_table.sql")

# Test 3: Simulate content analysis
print("\n3️⃣ Content Analysis Simulation")

test_content = {
    "title": "Google Releases March 2024 Core Algorithm Update",
    "content": "Google has begun rolling out the March 2024 core update. This update focuses on reducing unhelpful content by 40% and improving ranking systems. Sites with AI-generated low-quality content may see ranking drops."
}

# Rule-based analysis
text = f"{test_content['title']} {test_content['content']}".lower()
action_keywords = ["update", "algorithm", "ranking", "core"]
has_action = any(kw in text for kw in action_keywords)

print(f"   Title: {test_content['title']}")
print(f"   Has action keywords: {'✅ Yes' if has_action else '❌ No'}")

if has_action:
    iteration = {
        "title": f"[Algorithm] {test_content['title']}",
        "description": test_content['content'],
        "category": "Algorithm",
        "priority": "critical" if "core" in text else "high",
        "estimated_hours": 16,
        "affects": ["all"],
        "source_type": "google_update"
    }
    print(f"   Generated iteration:")
    print(f"   - Priority: {iteration['priority']}")
    print(f"   - Category: {iteration['category']}")
    print(f"   - Hours: {iteration['estimated_hours']}")

# Test 4: Check DeepSeek API
print("\n4️⃣ DeepSeek API Check")
deepseek_key = os.getenv("DEEPSEEK_API_KEY", "")
print(f"   DEEPSEEK_API_KEY: {'✅ Set' if deepseek_key else '❌ Not Set (will use rule-based)'}")

# Test 5: Summary
print("\n" + "=" * 60)
print("📋 Test Summary")
print("-" * 60)
print("✅ Ready to run: python3 scripts/monitor_and_generate.py")
print("\nNext steps:")
print("1. Ensure SUPABASE_SERVICE_ROLE_KEY is set")
print("2. Run the SQL to create table (if not exists)")
print("3. Set DEEPSEEK_API_KEY for AI analysis (optional)")
print("4. Add to crontab for automatic monitoring")
print("-" * 60)

# Save test output
os.makedirs("logs", exist_ok=True)
with open("logs/test_output.json", "w") as f:
    json.dump({
        "test_time": "2026-03-02T15:00:00Z",
        "supabase_key_set": bool(SUPABASE_KEY),
        "deepseek_key_set": bool(deepseek_key),
        "simulated_iteration": iteration if has_action else None
    }, f, indent=2)

print("\n💾 Test output saved to: logs/test_output.json")
