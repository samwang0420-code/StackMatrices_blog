#!/usr/bin/env python3
"""
View generated X content ready for posting
"""

import os
import json
import glob

DATA_DIR = "/root/.openclaw/workspace/blog/data/insights"

def view_latest_content():
    """Display latest generated content"""
    
    # Get all content files
    files = glob.glob(f"{DATA_DIR}/content_*.json")
    files_old = glob.glob(f"{DATA_DIR}/insight_*.json")
    files = files + files_old
    
    if not files:
        print("❌ No content generated yet")
        print("\nRun: python3 scripts/generate_daily_content.py")
        return
    
    # Sort by modification time (newest first)
    files.sort(key=os.path.getmtime, reverse=True)
    
    print("=" * 70)
    print("📝 LATEST X CONTENT READY TO POST")
    print("=" * 70)
    
    for i, file_path in enumerate(files[:3], 1):
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        # Determine format
        format_type = data.get('format', data.get('insight_type', 'unknown'))
        tweets = data.get('tweets', [])
        tweet_count = data.get('tweet_count', len(tweets))
        
        print(f"\n{'='*70}")
        print(f"📌 Content #{i}")
        print(f"{'='*70}")
        print(f"Format: {format_type.upper()}")
        print(f"Topic: {data.get('topic', 'N/A')}")
        print(f"Tweets: {tweet_count}")
        print(f"Generated: {data.get('generated_at', 'N/A')}")
        
        print(f"\n{'='*70}")
        print(f"📝 CONTENT:")
        print("="*70)
        
        for j, tweet in enumerate(tweets, 1):
            print(f"\n--- Tweet {j}/{tweet_count} ---")
            print(tweet)
        
        if data.get('hashtags'):
            print(f"\n#️⃣ HASHTAGS: {data['hashtags']}")
        
        print(f"\n{'='*70}")
        print(f"💡 HOW TO POST:")
        print("="*70)
        
        if format_type == 'short':
            print("→ Post as single tweet")
        elif format_type == 'medium':
            print("→ Post 2-3 tweets in sequence")
            print("→ Wait 30-60 sec between each")
        else:
            print("→ Post as Twitter Thread")
            print("→ Wait 1-2 min between each")
            print("→ Reply to first tweet to complete thread")
    
    print(f"\n{'='*70}")
    print(f"📊 Total available: {len(files)} content items")
    print(f"📁 Location: {DATA_DIR}/")
    print("="*70)
    print("\n💡 Next steps:")
    print("1. Review content above")
    print("2. Generate image: python3 scripts/generate_infographics.py")
    print("3. Post to X.com")
    print("4. Engage with replies")

if __name__ == "__main__":
    view_latest_content()
