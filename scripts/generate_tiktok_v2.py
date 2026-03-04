#!/usr/bin/env python3
"""
StackMatrices TikTok Video Generator - V2
English, client-focused, synchronized
"""

import os
from datetime import datetime

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# TikTok V2 Scripts - English, client-focused, value-driven
TIKTOK_TEMPLATES = [
    {
        "id": "geo_value_v2",
        "title": "What is GEO - Value Focus",
        "duration": 25,
        "frames": [
            {
                "duration": 4,
                "text": "Here's what's happening to medical practices",
                "visual_text": "THE SHIFT",
                "visual_type": "title"
            },
            {
                "duration": 6,
                "text": "84% of patients now use AI to find doctors. They don't Google anymore. They ask ChatGPT, Perplexity, Claude.",
                "visual_text": "84%",
                "visual_type": "stat",
                "subtext": "use AI to find doctors"
            },
            {
                "duration": 6,
                "text": "If your practice isn't visible to AI, you're missing half your potential patients.",
                "visual_text": "50%",
                "visual_type": "stat",
                "subtext": "of patients invisible"
            },
            {
                "duration": 5,
                "text": "But here's the good news: practices optimizing for AI are seeing 3x more qualified leads.",
                "visual_text": "3X MORE",
                "visual_type": "stat",
                "subtext": "qualified leads"
            },
            {
                "duration": 4,
                "text": "We can help you get found. Drop your specialty and city in comments.",
                "visual_text": "GET FOUND",
                "visual_type": "cta"
            }
        ],
        "hashtags": "#GEO #MedicalPractice #Doctor #HealthcareMarketing #AI"
    },
]

def generate_v2_content():
    """Generate V2 content with synchronized frames"""
    template = TIKTOK_TEMPLATES[0]
    
    content = {
        "id": f"tiktok_v2_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "generated_at": datetime.now().isoformat(),
        "template_id": template["id"],
        "title": template["title"],
        "duration": template["duration"],
        "frames": template["frames"],
        "hashtags": template["hashtags"],
        "full_script": " ".join([f["text"] for f in template["frames"]])
    }
    
    filename = f"{OUTPUT_DIR}/{content['id']}.json"
    with open(filename, 'w') as f:
        json.dump(content, f, indent=2)
    
    return content, template

if __name__ == "__main__":
    import json
    content, template = generate_v2_content()
    
    print("🎬 TikTok Video V2 - English, Client-Focused")
    print("=" * 60)
    print(f"Duration: {content['duration']} seconds")
    print(f"Frames: {len(content['frames'])}")
    
    print("\n" + "=" * 60)
    print("SCRIPT & VISUAL SYNCHRONIZATION:")
    print("=" * 60)
    
    for i, frame in enumerate(content["frames"], 1):
        print(f"\n📹 Frame {i} ({frame['duration']}s)")
        print(f"   Voice: {frame['text']}")
        print(f"   Visual: {frame['visual_text']}")
        if "subtext" in frame:
            print(f"   Sub: {frame['subtext']}")
