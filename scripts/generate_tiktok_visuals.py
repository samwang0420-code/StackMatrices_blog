#!/usr/bin/env python3
"""
Generate TikTok Vertical Visuals (1080x1920)
Data visualization optimized for short-form video
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# TikTok vertical format
WIDTH, HEIGHT = 1080, 1920

# Colors
DARK_BG = (11, 15, 25)
PRIMARY = (14, 165, 233)
ACCENT = (16, 185, 129)
DANGER = (239, 68, 68)
WHITE = (255, 255, 255)
GRAY = (107, 114, 128)
GOLD = (245, 158, 11)

def create_frame(title: str, content: dict) -> str:
    """Create a single video frame"""
    img = Image.new('RGB', (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 120)
        font_main = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_body = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
    except:
        font_title = ImageFont.load_default()
        font_big = font_title
        font_main = font_title
        font_body = font_title
    
    # Title
    draw.text((60, 80), title, font=font_title, fill=PRIMARY)
    
    # Content
    y = 200
    for key, value in content.items():
        # Key
        draw.text((60, y), key, font=font_body, fill=GRAY)
        y += 50
        # Value
        draw.text((60, y), str(value), font=font_main, fill=WHITE)
        y += 120
    
    # Watermark
    draw.text((WIDTH-300, HEIGHT-100), "@StackMatrices", font=font_body, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/tiktok_frame_{title.replace(' ', '_')}.png"
    img.save(filename, quality=95)
    return filename

def create_number_frame(number: str, label: str, sublabel: str = None, color=ACCENT) -> str:
    """Create a big number frame for TikTok"""
    img = Image.new('RGB', (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    try:
        font_number = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 280)
        font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        font_number = ImageFont.load_default()
        font_label = font_number
        font_sub = font_number
    
    # Center the number
    bbox = draw.textbbox((0, 0), number, font=font_number)
    w = bbox[2] - bbox[0]
    draw.text(((WIDTH-w)//2, 600), number, font=font_number, fill=color)
    
    # Label
    bbox = draw.textbbox((0, 0), label, font=font_label)
    w = bbox[2] - bbox[0]
    draw.text(((WIDTH-w)//2, 950), label, font=font_label, fill=WHITE)
    
    # Sublabel
    if sublabel:
        bbox = draw.textbbox((0, 0), sublabel, font=font_sub)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 1050), sublabel, font=font_sub, fill=GRAY)
    
    # Branded element
    draw.text((60, HEIGHT-150), "GEO", font=font_label, fill=PRIMARY)
    draw.text((WIDTH-200, HEIGHT-150), "@StackMatrices", font=font_sub, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/tiktok_num_{number.replace('%', '').replace('$', '').replace('x', '')}.png"
    img.save(filename, quality=95)
    return filename

def create_comparison_frame(left_label: str, left_value: str, right_label: str, right_value: str, 
                          left_color=DANGER, right_color=ACCENT) -> str:
    """Create comparison frame"""
    img = Image.new('RGB', (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    try:
        font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
        font_value = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 100)
        font_vs = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 50)
    except:
        font_label = ImageFont.load_default()
        font_value = font_label
        font_vs = font_label
    
    # Left side
    draw.text((100, 400), left_label, font=font_label, fill=GRAY)
    draw.text((100, 480), left_value, font=font_value, fill=left_color)
    
    # VS
    draw.text((WIDTH//2 - 30, 550), "VS", font=font_vs, fill=WHITE)
    
    # Right side
    draw.text((WIDTH//2 + 100, 400), right_label, font=font_label, fill=GRAY)
    draw.text((WIDTH//2 + 100, 480), right_value, font=font_value, fill=right_color)
    
    # Watermark
    draw.text((WIDTH-250, HEIGHT-100), "@StackMatrices", font=font_label, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/tiktok_compare_{left_value.replace('/', '_')}_{right_value.replace('/', '_')}.png"
    img.save(filename, quality=95)
    return filename

def create_step_frame(steps: list) -> str:
    """Create steps frame"""
    img = Image.new('RGB', (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    try:
        font_num = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 50)
        font_step = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        font_num = ImageFont.load_default()
        font_step = font_num
    
    y = 200
    for i, step in enumerate(steps, 1):
        # Number circle
        draw.ellipse([60, y, 110, y+50], fill=PRIMARY, outline=WHITE, width=3)
        draw.text((78, y+10), str(i), font=font_num, fill=WHITE)
        
        # Step text
        draw.text((140, y+10), step, font=font_step, fill=WHITE)
        
        y += 100
    
    # Watermark
    draw.text((WIDTH-250, HEIGHT-100), "@StackMatrices", font=font_step, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/tiktok_steps_{len(steps)}.png"
    img.save(filename, quality=95)
    return filename

def create_roi_frame() -> str:
    """Create ROI comparison frame"""
    img = Image.new('RGB', (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    try:
        font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
        font_value = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        font_label = ImageFont.load_default()
        font_value = font_label
        font_title = font_label
    
    # Title
    draw.text((60, 80), "Marketing ROI Comparison", font=font_title, fill=WHITE)
    
    # Data
    data = [
        ("Traditional SEO", "200%", GRAY),
        ("Google Ads", "150%", GRAY),
        ("GEO", "6,700%", ACCENT),
    ]
    
    y = 250
    for label, value, color in data:
        draw.text((60, y), label, font=font_label, fill=GRAY)
        draw.text((60, y+50), value, font=font_value, fill=color)
        y += 150
    
    # Watermark
    draw.text((WIDTH-250, HEIGHT-100), "@StackMatrices", font=font_label, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/tiktok_roi.png"
    img.save(filename, quality=95)
    return filename

def create_hook_frame(text: str) -> str:
    """Create hook frame with attention-grabbing text"""
    img = Image.new('RGB', (WIDTH, HEIGHT), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    try:
        font_hook = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        font_hook = ImageFont.load_default()
        font_sub = font_hook
    
    # Split text into lines
    words = text.split()
    lines = []
    current = ""
    for word in words:
        if len(current + " " + word) < 20:
            current = (current + " " + word).strip()
        else:
            lines.append(current)
            current = word
    lines.append(current)
    
    y = HEIGHT // 2 - (len(lines) * 40)
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_hook)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, y), line, font=font_hook, fill=ACCENT)
        y += 80
    
    # Watermark
    draw.text((WIDTH-250, HEIGHT-100), "@StackMatrices", font=font_sub, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/tiktok_hook.png"
    img.save(filename, quality=95)
    return filename

def generate_all_visuals():
    """Generate all TikTok visual assets"""
    
    print("🎬 Generating TikTok visuals...")
    print("=" * 60)
    
    images = []
    
    # Number frames
    img = create_number_frame("84%", "Health Queries", "Show AI Overviews")
    images.append(("84%", img))
    print(f"✅ {img}")
    
    img = create_number_frame("3.2x", "AI Citations", "With Complete Schema", ACCENT)
    images.append(("3.2x", img))
    print(f"✅ {img}")
    
    img = create_number_frame("47%", "of Patients", "Use AI Search Now", DANGER)
    images.append(("47%", img))
    print(f"✅ {img}")
    
    img = create_number_frame("23%", "Higher", "Conversion Rate", ACCENT)
    images.append(("23%", img))
    print(f"✅ {img}")
    
    img = create_number_frame("6,700%", "ROI", "With GEO", ACCENT)
    images.append(("6700%", img))
    print(f"✅ {img}")
    
    # Comparison frames
    img = create_comparison_frame("Before", "18/100", "After", "74/100")
    images.append(("18→74", img))
    print(f"✅ {img}")
    
    img = create_comparison_frame("SEO", "200%", "GEO", "6,700%", GRAY, ACCENT)
    images.append(("SEO vs GEO", img))
    print(f"✅ {img}")
    
    # Steps frame
    steps = [
        "Technical Schema",
        "Content Authority", 
        "Entity Building",
        "Review Optimization",
        "Continuous Monitoring"
    ]
    img = create_step_frame(steps)
    images.append(("5 Steps", img))
    print(f"✅ {img}")
    
    # ROI frame
    img = create_roi_frame()
    images.append(("ROI", img))
    print(f"✅ {img}")
    
    # Hook frame
    img = create_hook_frame("救命！Google根本不想让你知道这件事")
    images.append(("Hook", img))
    print(f"✅ {img}")
    
    print("=" * 60)
    print(f"\n📊 Generated {len(images)} visual assets")
    
    return images

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # Generate specific visual
        if sys.argv[1] == "all":
            generate_all_visuals()
        elif sys.argv[1] == "84":
            create_number_frame("84%", "Health Queries", "Show AI Overviews")
        else:
            print(f"Usage: python3 {sys.argv[0]} [all|84|...]")
    else:
        generate_all_visuals()
