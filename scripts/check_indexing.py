#!/usr/bin/env python3
"""
Google Indexing Status Checker
============================
Checks if URLs have been indexed by Google.
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

# Configuration
SERVICE_ACCOUNT_FILE = "/root/.openclaw/workspace/blog/config/google-service-account.json"
BLOG_BASE_URL = "https://stackmatrices.com"

# Try to import Google libraries, fallback to manual check
try:
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    HAS_GOOGLE_LIB = True
except ImportError:
    HAS_GOOGLE_LIB = False


def check_indexing_api(url: str) -> dict:
    """Check URL indexing status using Google Indexing API"""
    if not HAS_GOOGLE_LIB:
        return check_manual(url)
    
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=["https://www.googleapis.com/auth/indexing"]
        )
        service = build('indexing', 'v3', credentials=credentials)
        
        result = service.urlNotifications().getMetadata(url=url).execute()
        return {
            "url": url,
            "indexed": True,
            "result": result
        }
    except Exception as e:
        return check_manual(url)


def check_manual(url: str) -> dict:
    """Manual check using Google search"""
    search_url = f"https://www.google.com/search?q=site:{url}"
    
    req = urllib.request.Request(
        search_url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
            
            # Check for "did not match any documents" or similar
            if "did not match any" in html.lower() or "no results" in html.lower():
                return {"url": url, "indexed": False, "method": "google_search"}
            
            # Check for result count
            if "about" in html.lower():
                return {"url": url, "indexed": True, "method": "google_search"}
            
            return {"url": url, "indexed": True, "method": "google_search"}
    except Exception as e:
        return {"url": url, "indexed": None, "error": str(e)}


def check_urls_batch(urls: list) -> dict:
    """Check multiple URLs"""
    results = []
    indexed_count = 0
    not_indexed_count = 0
    
    print(f"\n🔍 Checking indexing status for {len(urls)} URLs...")
    
    for i, url in enumerate(urls, 1):
        print(f"  [{i}/{len(urls)}] {url}")
        result = check_indexing_api(url)
        results.append(result)
        
        if result.get("indexed"):
            indexed_count += 1
            print(f"       ✅ Indexed")
        elif result.get("indexed") is False:
            not_indexed_count += 1
            print(f"       ❌ Not indexed")
        else:
            print(f"       ⚠️ Unknown")
    
    return {
        "total": len(urls),
        "indexed": indexed_count,
        "not_indexed": not_indexed_count,
        "results": results
    }


def get_blog_urls() -> list:
    """Get all blog URLs from content directory"""
    content_dir = Path("/root/.openclaw/workspace/blog/content/blog")
    
    if not content_dir.exists():
        return []
    
    urls = []
    for f in content_dir.glob("*.md"):
        slug = f.stem
        url = f"{BLOG_BASE_URL}/blog/{slug}"
        urls.append(url)
    
    return urls


def main():
    """Main execution"""
    # Get URLs from arguments or auto-detect
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
    else:
        print("📡 Checking all blog posts...")
        urls = get_blog_urls()
    
    if not urls:
        print("❌ No URLs to check")
        return
    
    result = check_urls_batch(urls)
    
    print(f"\n📊 Indexing Status Summary:")
    print(f"   Total URLs: {result['total']}")
    print(f"   ✅ Indexed: {result['indexed']}")
    print(f"   ❌ Not indexed: {result['not_indexed']}")
    
    # Save report
    report = {
        "timestamp": datetime.now().isoformat(),
        "summary": result
    }
    
    report_file = Path("/root/.openclaw/workspace/blog/data/indexing-status.json")
    report_file.write_text(json.dumps(report, indent=2))
    print(f"\n📝 Report saved: {report_file}")


if __name__ == "__main__":
    main()
