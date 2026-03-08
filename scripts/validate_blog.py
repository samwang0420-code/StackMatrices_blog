#!/usr/bin/env python3
"""
Blog Post Validator (Bidirectional)
Ensures:
1. Every post folder has an entry in the index
2. Every entry in the index has a post folder
"""
import os
import re
import sys

BLOG_DIR = "/root/.openclaw/workspace/blog/src/app/blog"

def validate_blog():
    # Get all post folders
    folders = [f for f in os.listdir(BLOG_DIR) 
               if os.path.isdir(f"{BLOG_DIR}/{f}") 
               and f not in ['.next', 'dist', '__pycache__', 'page.tsx.backup']]
    
    # Read page.tsx
    with open(f"{BLOG_DIR}/page.tsx", 'r') as f:
        content = f.read()
    
    # Extract post IDs from index
    indexed_ids = set(re.findall(r'id:\s*"([^"]+)"', content))
    actual_posts = set(folders)
    
    # Check mismatches
    missing_in_index = actual_posts - indexed_ids
    extra_in_index = indexed_ids - actual_posts
    
    print(f"Index: {len(indexed_ids)} posts | Folders: {len(actual_posts)} posts\n")
    
    if missing_in_index or extra_in_index:
        print("❌ ISSUES:")
        if missing_in_index:
            print(f"   Folder exists but NOT in index: {missing_in_index}")
        if extra_in_index:
            print(f"   In index but NO folder: {extra_in_index}")
        return False
    
    print("✅ All published posts are in the index!")
    print("✅ All index entries have corresponding folders!")
    return True

if __name__ == "__main__":
    if not validate_blog():
        sys.exit(1)
