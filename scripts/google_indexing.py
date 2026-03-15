#!/usr/bin/env python3
"""
Google Indexing API Publisher
==============================
Submits URLs to Google for fast indexing using Service Account authentication.
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Configuration
SERVICE_ACCOUNT_FILE = "/root/.openclaw/workspace/blog/config/google-service-account.json"
BLOG_BASE_URL = "https://stackmatrices.com"
SCOPES = ["https://www.googleapis.com/auth/indexing"]


def get_indexing_service():
    """Get authenticated Indexing API service"""
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=SCOPES
        )
        service = build('indexing', 'v3', credentials=credentials)
        return service
    except Exception as e:
        print(f"❌ Failed to authenticate: {e}")
        return None


def submit_url(service, url: str) -> dict:
    """Submit a single URL to Google Indexing API"""
    try:
        body = {
            "url": url,
            "type": "URL_UPDATED"
        }
        response = service.urlNotifications().publish(body=body).execute()
        return {"success": True, "url": url, "result": response}
    except Exception as e:
        return {"success": False, "url": url, "error": str(e)}


def submit_urls_batch(urls: list) -> dict:
    """Submit multiple URLs"""
    service = get_indexing_service()
    if not service:
        return {"success": False, "error": "Failed to authenticate"}
    
    results = []
    success_count = 0
    fail_count = 0
    
    print(f"\n🚀 Submitting {len(urls)} URLs to Google Indexing API...")
    
    for i, url in enumerate(urls, 1):
        print(f"  [{i}/{len(urls)}] {url}")
        result = submit_url(service, url)
        results.append(result)
        
        if result["success"]:
            success_count += 1
            print(f"       ✅ Success")
        else:
            fail_count += 1
            print(f"       ❌ {result.get('error', 'Unknown error')}")
    
    return {
        "total": len(urls),
        "success": success_count,
        "failed": fail_count,
        "results": results
    }


def get_recent_blog_posts(days: int = 1) -> list:
    """Get recently modified blog posts"""
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
    """Main execution"""
    if len(sys.argv) > 1:
        urls = sys.argv[1:]
    else:
        print("📡 Checking for recent blog posts...")
        urls = get_recent_blog_posts(days=1)
    
    if not urls:
        print("❌ No URLs to submit")
        return
    
    print(f"\n📋 URLs to submit:")
    for url in urls:
        print(f"   - {url}")
    
    result = submit_urls_batch(urls)
    
    print(f"\n📊 Summary:")
    print(f"   Total: {result.get('total', len(urls))}")
    print(f"   ✅ Success: {result.get('success', 0)}")
    print(f"   ❌ Failed: {result.get('failed', 0)}")
    
    # Save log
    log_file = Path("/root/.openclaw/workspace/blog/data/indexing-log.json")
    logs = []
    if log_file.exists():
        logs = json.loads(log_file.read_text())
    
    logs.append({
        "timestamp": datetime.now().isoformat(),
        "urls": urls,
        "result": result
    })
    
    log_file.write_text(json.dumps(logs, indent=2))
    print(f"\n📝 Log: {log_file}")


if __name__ == "__main__":
    main()
