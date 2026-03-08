#!/usr/bin/env python3
"""
Blog Post Validator
Ensures all listed posts exist before pushing
"""
import os
import sys

BLOG_DIR = "/root/.openclaw/workspace/blog/src/app/blog"

def validate_blog_index():
    # Read page.tsx
    with open(f"{BLOG_DIR}/page.tsx", 'r') as f:
        content = f.read()
    
    # Extract post IDs
    import re
    ids = re.findall(r'id:\s*"([^"]+)"', content)
    
    print(f"Found {len(ids)} posts in index:")
    for pid in ids:
        print(f"  - {pid}")
    
    # Check each exists
    missing = []
    for pid in ids:
        if not os.path.exists(f"{BLOG_DIR}/{pid}"):
            missing.append(pid)
    
    if missing:
        print(f"\n❌ MISSING PAGES: {missing}")
        return False
    
    print(f"\n✅ All {len(ids)} posts verified!")
    return True

if __name__ == "__main__":
    if not validate_blog_index():
        sys.exit(1)
