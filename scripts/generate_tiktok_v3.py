#!/usr/bin/env python3
"""
TikTok Video Generator V3 - With Pexels-style Backgrounds
Adds overlays, gradients, and professional polish
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
WIDTH, HEIGHT = 1080, 1920

COLORS = {
    'dark': (11, 15, 25),
    'primary': (14, 165, 233),
    'accent': (16, 185, 129),
    'white': (255, 255, 255),
    'gray': (107, 114, 128),
    'navy': (7, 25, 47),
}

def create_cyber_background():
    """Create cyber/data flow style background"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Add subtle gradient
    for y in range(HEIGHT):
        alpha = int(30 * (y / HEIGHT))
        draw.line([(0, y), (WIDTH, y)], fill=(14, 74, 110, alpha))
    
    # Add subtle grid lines
    for x in range(0, WIDTH, 100):
        draw.line([(x, 0), (x, HEIGHT)], fill=(14, 165, 233, 30))
    for y in range(0, HEIGHT, 100):
        draw.line([(0, y), (WIDTH, y)], fill=(14, 165, 233, 30))
    
    # Add subtle glow dots
    import random
    random.seed(42)
    for _ in range(50):
        x = random.randint(0, WIDTH)
        y = random.randint(0, HEIGHT)
        r = random.randint(1, 3)
        draw.ellipse([x-r, y-r, x+r, y+r], fill=(14, 165, 233, random.randint(20, 60)))
    
    return img

def create_minimalist_medical():
    """Create minimalist medical style background"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['navy'])
    draw = ImageDraw.Draw(img)
    
    # Subtle radial gradient from center
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = ((x - WIDTH//2)**2 + (y - HEIGHT//2)**2)**0.5
            max_dist = ((WIDTH//2)**2 + (HEIGHT//2)**2)**0.5
            factor = 1 - (dist / max_dist) * 0.3
            r = int(7 * factor)
            g = int(25 * factor)
            b = int(47 * factor)
            if x % 10 == 0 and y % 10 == 0:
                draw.point((x, y), fill=(r, g, b))
    
    # Add subtle horizontal lines (medical chart aesthetic)
    for y in range(200, HEIGHT, 150):
        draw.line([(100, y), (WIDTH-100, y)], fill=(14, 165, 233, 20))
    
    return img

def create_abstract_texture():
    """Create abstract texture background"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Add wave-like patterns
    import math
    for x in range(WIDTH):
        y_offset = int(math.sin(x / 100) * 20)
        draw.line([(x, HEIGHT//2 + y_offset - 200), (x, HEIGHT//2 + y_offset + 200)], 
                  fill=(14, 165, 233, 15))
    
    # Add vignette effect
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = ((x - WIDTH//2)**2 + (y - HEIGHT//2)**2)**0.5
            max_dist = ((WIDTH//2)**2 + (HEIGHT//2)**2)**0.5
            factor = 1 - (dist / max_dist) * 0.5
            if x % 20 == 0 and y % 20 == 0:
                r = int(11 * factor)
                g = int(15 * factor + 11 * (1-factor))
                b = int(25 * factor + 25 * (1-factor))
                draw.point((x, y), fill=(r, g, b))
    
    return img

def add_vignette(img):
    """Add vignette effect to image"""
    draw = ImageDraw.Draw(img)
    
    # Darken edges
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = ((x - WIDTH//2)**2 + (y - HEIGHT//2)**2)**0.5
            max_dist = ((WIDTH//2)**2 + (HEIGHT//2)**2)**0.5
            
            if dist > max_dist * 0.6:
                factor = (dist - max_dist * 0.6) / (max_dist * 0.4)
                factor = min(1, factor * 0.7)
                
                # Darken
                pixels = img.load()
                r, g, b = pixels[x, y]
                r = int(r * (1 - factor))
                g = int(g * (1 - factor))
                b = int(b * (1 - factor))
                pixels[x, y] = (r, g, b)
    
    return img

def add_overlay(img, opacity=0.6):
    """Add semi-transparent overlay"""
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, WIDTH, HEIGHT], fill=(11, 15, 25, int(255 * opacity)))
    return img

def create_pro_frame(text, subtext, style, background_type="cyber"):
    """Create a professional frame with background"""
    
    # Create background based on type
    if background_type == "cyber":
        bg = create_cyber_background()
    elif background_type == "medical":
        bg = create_minimalist_medical()
    else:
        bg = create_abstract_texture()
    
    # Add vignette and overlay
    bg = add_vignette(bg)
    bg = add_overlay(bg, 0.5)
    
    # Add text
    draw = ImageDraw.Draw(bg)
    
    try:
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 140)
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 65)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except:
        font_big = ImageFont.load_default()
        font_title = font_big
        font_sub = font_big
    
    if style == "title":
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
    else:
        # Stat style
        bbox = draw.textbbox((0, 0), text, font=font_big)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 700), text, font=font_big, fill=COLORS['accent'])
        if subtext:
            bbox = draw.textbbox((0, 0), subtext, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 950), subtext, font=font_sub, fill=COLORS['gray'])
    
    # Watermark
    draw.text((60, HEIGHT-100), "@StackMatrices", font=font_sub, fill=COLORS['gray'])
    
    return bg

def generate_all_v3_frames():
    """Generate all V3 frames with professional backgrounds"""
    
    frames = [
        ("THE SHIFT", None, "title", "cyber"),
        ("84%", "use AI to find doctors", "stat", "cyber"),
        ("50%", "of patients invisible", "stat", "cyber"),
        ("3X MORE", "qualified leads", "stat", "abstract"),
        ("GET FOUND", "your specialty + city", "cta", "medical"),
    ]
    
    for i, (text, sub, style, bg_type) in enumerate(frames, 1):
        img = create_pro_frame(text, sub, style, bg_type)
        img.save(f"{OUTPUT_DIR}/v3_{i:02d}.png", quality=95)
        print(f"✅ v3_{i:02d}.png ({bg_type} background)")

if __name__ == "__main__":
    generate_all_v3_frames()
    print("\n🎬 All V3 frames with professional backgrounds generated!")
