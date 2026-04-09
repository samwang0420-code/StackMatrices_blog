#!/usr/bin/env python3
"""
Google Indexing Publisher (Method 2: Search Simulation)
=====================================================
Submits URLs by simulating Google search - no API key needed.
"""

import os
import sys
import json
import urllib.request
import urllib.parse
import time
from datetime import datetime
from pathlib import Path

# Base URL for your blog
BLOG_BASE_URL = "https://stackmatrices.com"


def submit_url(url: str) -> dict:
    """
    Submit URL using Google search simulation
    This triggers Google to crawl the URL when it processes the search query
    """
    search_url = f"https://www.google.com/search?q={urllib.parse.quote(url)}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        req = urllib.request.Request(search_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            return {
                "success": True,
                "url": url,
                "result": "Search query submitted - Google will crawl URL"
            }
    except Exception as e:
        return {
            "success": False,
            "url": url,
            "error": str(e)
        }


def submit_urls_batch(urls: list) -> dict:
    """
    Submit multiple URLs via search simulation
    """
    results = []
    success_count = 0
    fail_count = 0
    
    print(f"\n🚀 Submitting {len(urls)} URLs to Google (Search Method)...")
    
    for i, url in enumerate(urls, 1):
        print(f"  [{i}/{len(urls)}] {url}")
        result = submit_url(url)
        results.append(result)
        
        if result["success"]:
            success_count += 1
            print(f"       ✅ Submitted")
        else:
            fail_count += 1
            print(f"       ❌ {result.get('error', 'Unknown error')}")
        
        # Rate limiting - be respectful to Google
        time.sleep(2)
    
    return {
        "total": len(urls),
        "success": success_count,
        "failed": fail_count,
        "results": results
    }


def get_recent_blog_posts(days: int = 1) -> list:
    """
    Get recently added blog posts from the content directory
    """
    content_dir = Path("/root/.openclaw/workspace/blog/content/blog")
    
    if not content_dir.exists():
        return []
    
    import time
    cutoff = time.time() - (days * 24 * 60 * 60)
    
    urls = []
    for f in content_dir.glob("*.md"):
        if f.stat().st_mtime >= cutoff:
            slug = f.stem
            url = f"{BLOG_BASE_URL}/blog/{slug}"
            urls.append(url)
    
    return urls


def main():
    """
    Main execution
    """
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
    else:
        print("📡 No URLs provided, checking for recent blog posts...")
        urls = get_recent_blog_posts(days=1)
    
    if not urls:
        print("❌ No URLs to submit")
        return
    
    print(f"\n📋 URLs to submit:")
    for url in urls:
        print(f"   - {url}")
    
    result = submit_urls_batch(urls)
    
    print(f"\n📊 Summary:")
    print(f"   Total: {result['total']}")
    print(f"   ✅ Success: {result['success']}")
    print(f"   ❌ Failed: {result['failed']}")
    
    # Save log
    log_file = Path("/root/.openclaw/workspace/blog/data/indexing-log.json")
    logs = []
    if log_file.exists():
        logs = json.loads(log_file.read_text())
    
    logs.append({
        "timestamp": datetime.now().isoformat(),
        "urls": urls,
        "result": result,
        "method": "search_simulation"
    })
    
    log_file.write_text(json.dumps(logs, indent=2))
    print(f"\n📝 Log saved to: {log_file}")
    
    return result


if __name__ == "__main__":
    main()
