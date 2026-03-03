#!/usr/bin/env python3
"""
View generated X content ready for posting
"""

import os
import json
import glob
from datetime import datetime

DATA_DIR = "/root/.openclaw/workspace/blog/data/insights"

def view_latest_content():
    """Display latest generated content"""
    
    # Get all insight files
    files = glob.glob(f"{DATA_DIR}/insight_*.json")
    
    if not files:
        print("❌ No content generated yet")
        print("\nRun: python3 scripts/generate_insights.py")
        return
    
    # Sort by modification time (newest first)
    files.sort(key=os.path.getmtime, reverse=True)
    
    print("=" * 70)
    print("📝 LATEST X CONTENT READY TO POST")
    print("=" * 70)
    
    for i, file_path in enumerate(files[:3], 1):
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        print(f"\n{'='*70}")
        print(f"📌 Content #{i}")
        print(f"{'='*70}")
        print(f"Type: {data.get('insight_type', 'N/A')}")
        print(f"Source: {data.get('source', 'N/A')}")
        print(f"Generated: {data.get('generated_at', 'N/A')}")
        print(f"\n🎯 HOOK:")
        print(f"{data.get('hook', 'N/A')}")
        print(f"\n📝 BODY:")
        print(f"{data.get('body', data.get('full_tweet', 'N/A'))}")
        
        if data.get('hashtags'):
            print(f"\n#️⃣ HASHTAGS:")
            print(f"{data['hashtags']}")
        
        if data.get('cta'):
            print(f"\n👉 CTA:")
            print(f"{data['cta']}")
        
        print(f"\n🔗 Source URL:")
        print(f"{data.get('source_url', 'N/A')}")
        
        # Show full combined text
        print(f"\n{'='*70}")
        print("📋 FULL TWEET (Copy this):")
        print("="*70)
        if data.get('full_tweet'):
            print(data['full_tweet'])
        else:
            full = f"{data.get('hook', '')}\n\n{data.get('body', '')}"
            if data.get('hashtags'):
                full += f"\n\n{data['hashtags']}"
            print(full)
    
    print(f"\n{'='*70}")
    print(f"📊 Total available: {len(files)} insights")
    print(f"📁 Location: {DATA_DIR}/")
    print("="*70)
    print("\n💡 Next steps:")
    print("1. Review content above")
    print("2. Create image with Canva (1200x675)")
    print("3. Post to X.com")
    print("4. Engage with replies")

if __name__ == "__main__":
    view_latest_content()
