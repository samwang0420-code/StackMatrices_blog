#!/usr/bin/env python3
"""
Generate AI images for X content using DALL-E or Stability AI
"""

import os
import requests
import json
from datetime import datetime

# API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
STABILITY_API_KEY = os.getenv("STABILITY_API_KEY", "")

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/generated-images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_dalle_image(prompt: str, filename: str) -> str:
    """Generate image using DALL-E 3"""
    if not OPENAI_API_KEY:
        print("❌ OPENAI_API_KEY not set")
        return None
    
    try:
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "dall-e-3",
                "prompt": prompt,
                "size": "1024x1024",
                "quality": "standard",
                "n": 1
            },
            timeout=120
        )
        
        result = response.json()
        image_url = result['data'][0]['url']
        
        # Download image
        img_response = requests.get(image_url)
        filepath = f"{OUTPUT_DIR}/{filename}.png"
        
        with open(filepath, 'wb') as f:
            f.write(img_response.content)
        
        print(f"✅ Generated: {filepath}")
        return filepath
        
    except Exception as e:
        print(f"❌ DALL-E error: {e}")
        return None

def generate_stability_image(prompt: str, filename: str) -> str:
    """Generate image using Stability AI"""
    if not STABILITY_API_KEY:
        print("❌ STABILITY_API_KEY not set")
        return None
    
    try:
        response = requests.post(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            headers={
                "authorization": f"Bearer {STABILITY_API_KEY}",
                "accept": "image/*"
            },
            files={"none": ''},
            data={
                "prompt": prompt,
                "output_format": "png",
                "width": 1024,
                "height": 1024
            },
            timeout=120
        )
        
        if response.status_code == 200:
            filepath = f"{OUTPUT_DIR}/{filename}.png"
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"✅ Generated: {filepath}")
            return filepath
        else:
            print(f"❌ Stability AI error: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Stability AI error: {e}")
        return None

# Content-specific prompts
CONTENT_PROMPTS = {
    "schema_markup": """
        Professional infographic showing "3.2x" in large teal numbers on dark blue background.
        Medical website schema markup visualization with connected nodes.
        Clean, modern, minimalist design for healthcare technology.
        "Medical Schema" text at top.
    """,
    
    "ai_search": """
        Futuristic AI search visualization.
        ChatGPT-style interface with medical practice results.
        Blue and teal gradient background.
        Abstract representation of AI recommending a doctor.
        Professional, clean, modern tech aesthetic.
    """,
    
    "revenue_loss": """
        Business infographic showing money loss concept.
        Dark blue background with red downward arrow.
        "$300K+" text in large white numbers.
        "Lost to AI" subtitle.
        Medical/clinic icons subtly in background.
        Professional, alarming but clean design.
    """,
    
    "geo_framework": """
        5-step process diagram on dark background.
        Connected circles showing workflow.
        Steps: Technical Schema → Content → Entity → Reviews → Monitor.
        Teal and blue color scheme.
        "GEO Framework" title at top.
        Clean, professional, easy to read.
    """,
    
    "perplexity": """
        Comparison chart showing Perplexity vs Google.
        Perplexity side showing higher engagement with teal highlight.
        "23% More Conversions" in large text.
        Medical context icons.
        Modern infographic style, dark blue background.
    """,
    
    "case_study": """
        Before/After comparison for medical practice.
        Left: "Before" with low visibility (18/100), red tones.
        Right: "After" with high visibility (74/100), green/teal tones.
        "$3.4M Saved" prominently displayed.
        Professional case study visualization.
    """
}

def generate_for_content(content_type: str, custom_text: str = None):
    """Generate image for specific content type"""
    prompt = CONTENT_PROMPTS.get(content_type, content_type)
    
    if custom_text:
        prompt += f"\nInclude text: '{custom_text}'"
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{content_type}_{timestamp}"
    
    # Try DALL-E first, then Stability
    result = generate_dalle_image(prompt, filename)
    if not result:
        result = generate_stability_image(prompt, filename)
    
    return result

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python3 generate_ai_images.py <content_type> [custom_text]")
        print("\nAvailable content types:")
        for key in CONTENT_PROMPTS.keys():
            print(f"  - {key}")
        sys.exit(1)
    
    content_type = sys.argv[1]
    custom_text = sys.argv[2] if len(sys.argv) > 2 else None
    
    result = generate_for_content(content_type, custom_text)
    
    if result:
        print(f"\n✅ Image saved: {result}")
        print(f"URL: https://stackmatrices.com/generated-images/{os.path.basename(result)}")
    else:
        print("\n❌ Failed to generate image")
        sys.exit(1)
