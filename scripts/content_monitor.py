#!/usr/bin/env python3
"""
Content Monitoring System - 4 Source Categories
Monitors and collects content for GEO blog generation
"""

import os
import json
import requests
from datetime import datetime
from pathlib import Path

# Configuration
DATA_DIR = "/root/.openclaw/workspace/blog/data/monitoring"
os.makedirs(DATA_DIR, exist_ok=True)

# API Keys (from config)
API_KEYS_PATH = "/root/.openclaw/workspace/sarah-matrix/config/api_keys.json"

def load_api_keys():
    """Load API keys"""
    try:
        with open(API_KEYS_PATH) as f:
            import json
            keys = json.load(f)
            return {
                "serper": keys.get("Serper", {}).get("api_key", ""),
                "openai": keys.get("DeepSeek", ""),
            }
    except:
        return {"serper": "", "openai": ""}

# Search queries for each source category
SOURCE_QUERIES = {
    "source1_foundation": [
        "Google Search Quality Evaluator Guidelines 2024 PDF",
        "YMYL medical content guidelines",
        "E-E-A-T healthcare content",
    ],
    "source2_industry": [
        "ASPS plastic surgery statistics 2024",
        "AmSpa medical spa industry report 2024",
        "FDA medical device advertising regulations",
    ],
    "source3_tactics": [
        "Google SGE AI Overviews optimization 2024",
        "LLM optimization healthcare brands",
        "Entity SEO medical practices",
    ],
    "source4_case_studies": [
        "best plastic surgery clinic Beverly Hills",
        "top rated med spa Los Angeles",
        "aesthetic practice marketing case study",
    ]
}

def search_serper(query, num_results=5):
    """Search using Serper API"""
    keys = load_api_keys()
    if not keys.get("serper"):
        print(f"⚠️ No Serper API key")
        return []
    
    url = "https://google.serper.dev/search"
    headers = {"X-API-KEY": keys["serper"]}
    payload = {"q": query, "num": num_results}
    
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            results = []
            for item in data.get("organic", [])[:num_results]:
                results.append({
                    "title": item.get("title", ""),
                    "link": item.get("link", ""),
                    "snippet": item.get("snippet", ""),
                    "query": query
                })
            return results
    except Exception as e:
        print(f"Search error: {e}")
    return []

def save_results(category, results):
    """Save search results to file"""
    filepath = f"{DATA_DIR}/{category}_{datetime.now().strftime('%Y%m%d')}.json"
    
    existing = []
    if os.path.exists(filepath):
        with open(filepath) as f:
            existing = json.load(f)
    
    # Add new results
    existing.extend(results)
    
    with open(filepath, 'w') as f:
        json.dump(existing, f, indent=2)
    
    return filepath

def monitor_all_sources():
    """Monitor all 4 source categories"""
    print("🔍 Content Monitoring System")
    print("=" * 60)
    
    all_results = {}
    
    for category, queries in SOURCE_QUERIES.items():
        print(f"\n📂 {category}")
        print("-" * 40)
        
        results = []
        for query in queries:
            print(f"  🔍 {query}")
            items = search_serper(query)
            results.extend(items)
            print(f"     → {len(items)} results")
        
        if results:
            filepath = save_results(category, results)
            all_results[category] = results
            print(f"  ✅ Saved {len(results)} items to {filepath}")
    
    return all_results

def generate_blog_topics():
    """Generate blog topics based on monitored content"""
    print("\n\n📝 Blog Topics Generation")
    print("=" * 60)
    
    topics = []
    
    # Source 1 topics
    topics.extend([
        {
            "id": "source1_1",
            "source": "foundation",
            "title": "Google's Quality Guidelines for Medical Content: The Complete Guide",
            "pillar": "Technical Implementation",
            "keywords": ["E-E-A-T", "YMYL", "quality guidelines"],
            "outline": [
                "What are Google's Quality Evaluator Guidelines",
                "Why YMYL content requires extra care",
                "E-E-A-T for medical practices",
                "How to demonstrate expertise online",
                "Action checklist for compliance"
            ]
        },
        {
            "id": "source1_2", 
            "source": "foundation",
            "title": "How AI Evaluates Medical Content: A Complete Framework",
            "pillar": "AI Search Trends",
            "keywords": ["AI content evaluation", "medical SEO", "authority"],
            "outline": [
                "How AI systems understand medical content",
                "Entity vs keyword-based indexing",
                "Trust signals that matter",
                "Building topical authority",
                "Technical implementation"
            ]
        }
    ])
    
    # Source 2 topics
    topics.extend([
        {
            "id": "source2_1",
            "source": "industry",
            "title": "2024 Plastic Surgery Statistics: What Practices Need to Know",
            "pillar": "Industry Data",
            "keywords": ["ASPS", "statistics", "trends"],
            "outline": [
                "Key statistics from ASPS 2024",
                "Growth areas in aesthetic medicine",
                "Patient demographics shift",
                "Marketing implications",
                "Content opportunities"
            ]
        },
        {
            "id": "source2_2",
            "source": "industry",
            "title": "FDA Compliance in Medical Marketing: The Complete Guide",
            "pillar": "Compliance",
            "keywords": ["FDA", "compliance", "regulations"],
            "outline": [
                "FDA advertising rules for medical devices",
                "HIPAA considerations in marketing",
                "What AI systems think about compliance",
                "Safe vs risky content approaches",
                "Documentation requirements"
            ]
        }
    ])
    
    # Source 3 topics
    topics.extend([
        {
            "id": "source3_1",
            "source": "tactics",
            "title": "Optimizing for Google AI Overviews in Healthcare",
            "pillar": "GEO Strategy",
            "keywords": ["AI Overviews", "SGE", "optimization"],
            "outline": [
                "How AI Overviews work",
                "Content requirements for healthcare",
                "Schema markup for medical practices",
                "Featured snippet optimization",
                "Measuring visibility"
            ]
        },
        {
            "id": "source3_2",
            "source": "tactics",
            "title": "Entity SEO for Medical Practices: The Foundation of GEO",
            "pillar": "Technical Implementation",
            "keywords": ["Entity SEO", "knowledge graph", "authority"],
            "outline": [
                "What is Entity SEO",
                "Building your Knowledge Graph presence",
                "Entity citations and references",
                "Wikipedia and authority building",
                "Implementation roadmap"
            ]
        }
    ])
    
    # Source 4 topics
    topics.extend([
        {
            "id": "source4_1",
            "source": "case_studies",
            "title": "How Top Beverly Hills Clinics Win at Digital Marketing",
            "pillar": "Case Studies",
            "keywords": ["Beverly hills", "case study", "strategy"],
            "outline": [
                "What makes elite clinics different",
                "Content strategy analysis",
                "Authority building tactics",
                "Patient trust signals",
                "Lessons to apply today"
            ]
        }
    ])
    
    # Save topics
    topics_file = f"{DATA_DIR}/blog_topics.json"
    with open(topics_file, 'w') as f:
        json.dump(topics, f, indent=2)
    
    print(f"\n✅ Generated {len(topics)} blog topics")
    print(f"   Saved to: {topics_file}")
    
    for i, topic in enumerate(topics, 1):
        print(f"\n{i}. [{topic['source']}] {topic['title']}")
        print(f"   Pillar: {topic['pillar']}")
    
    return topics

def main():
    print("=" * 60)
    print("📊 CONTENT MONITORING SYSTEM")
    print("=" * 60)
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print()
    
    # Option 1: Just generate topics (no API needed)
    topics = generate_blog_topics()
    
    # Option 2: Run live monitoring (requires API key)
    # results = monitor_all_sources()
    
    print("\n" + "=" * 60)
    print("✅ Monitoring complete!")
    print("\nTo run live search monitoring:")
    print("  python3 scripts/content_monitor.py --search")
    print("\nTo generate full article:")
    print("  python3 scripts/content_monitor.py --generate <topic_id>")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--search":
            monitor_all_sources()
        elif sys.argv[1] == "--generate" and len(sys.argv) > 2:
            print(f"Generating article for: {sys.argv[2]}")
        else:
            print("Usage:")
            print("  python3 scripts/content_monitor.py        # Generate topics")
            print("  python3 scripts/content_monitor.py --search  # Run live monitoring")
            print("  python3 scripts/content_monitor.py --generate <id>")
    else:
        main()
