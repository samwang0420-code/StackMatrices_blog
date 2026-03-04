#!/usr/bin/env python3
"""
Generate TikTok V2 Visuals - Synchronized with audio
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
WIDTH, HEIGHT = 1080, 1920

COLORS = {
    'dark': (11, 15, 25),
    'primary': (14, 165, 233),
    'accent': (16, 185, 129),
    'white': (255, 255, 255),
    'gray': (107, 114, 128)
}

def create_frame(text: str, subtext: str = None, style: str = "stat") -> str:
    """Create a single frame"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    try:
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 180)
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
    except:
        font_big = ImageFont.load_default()
        font_title = font_big
        font_sub = font_big
    
    if style == "stat":
        # Big number/stat
        bbox = draw.textbbox((0, 0), text, font=font_big)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 700), text, font=font_big, fill=COLORS['accent'])
        
        if subtext:
            bbox = draw.textbbox((0, 0), subtext, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 950), subtext, font=font_sub, fill=COLORS['gray'])
    
    elif style == "title":
        bbox = draw.textbbox((0, 0), text, font=font_title)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 800), text, font=font_title, fill=COLORS['primary'])
    
    elif style == "cta":
        bbox = draw.textbbox((0, 0), text, font=font_title)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 750), text, font=font_title, fill=COLORS['white'])
        
        if subtext:
            bbox = draw.textbbox((0, 0), subtext, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 900), subtext, font=font_sub, fill=COLORS['gray'])
    
    # Watermark
    draw.text((60, HEIGHT-100), "@StackMatrices", font=font_sub, fill=COLORS['gray'])
    
    return img

# Generate all 5 frames
frames = [
    ("THE SHIFT", None, "title"),
    ("84%", "use AI to find doctors", "stat"),
    ("50%", "of patients invisible", "stat"),
    ("3X MORE", "qualified leads", "stat"),
    ("GET FOUND", "your specialty + city", "cta"),
]

for i, (text, subtext, style) in enumerate(frames, 1):
    img = create_frame(text, subtext, style)
    img.save(f"{OUTPUT_DIR}/v2_{i:02d}.png", quality=95)
    print(f"✅ v2_{i:02d}.png")

print("\n🎬 All frames generated!")
