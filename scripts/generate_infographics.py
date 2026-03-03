#!/usr/bin/env python3
"""
Generate infographic-style images using Pillow
Text + Graphics combined - no external dependencies
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/generated-images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Colors
DARK_BG = (11, 15, 25)      # #0B0F19
PRIMARY = (14, 165, 233)    # #0EA5E9
ACCENT = (16, 185, 129)     # #10B981
DANGER = (239, 68, 68)      # #EF4444
WHITE = (255, 255, 255)
GRAY = (107, 114, 128)      # #6B7280

def create_gradient_background(width: int, height: int) -> Image.Image:
    """Create dark gradient background"""
    img = Image.new('RGB', (width, height), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    # Add subtle gradient
    for y in range(height):
        alpha = int(20 * (1 - y / height))
        color = (14, 74, 110, alpha)  # Primary with alpha
        draw.line([(0, y), (width, y)], fill=color[:3])
    
    return img

def draw_rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    """Draw rounded rectangle"""
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

def create_single_stat_card(stat_value: str, stat_label: str, 
                            subtext: str = None, accent_color: tuple = ACCENT) -> str:
    """Create single stat highlight card"""
    
    # X optimized size: 1200x675 (16:9) or 1080x1080 (square)
    width, height = 1200, 675
    img = create_gradient_background(width, height)
    draw = ImageDraw.Draw(img)
    
    try:
        # Try to load fonts, fallback to default
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 120)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except:
        font_large = ImageFont.load_default()
        font_medium = font_large
        font_small = font_large
    
    # Draw card background
    margin = 60
    draw_rounded_rect(draw, 
                     [margin, margin, width-margin, height-margin], 
                     radius=30, 
                     fill=(14, 74, 110, 100),  # Semi-transparent primary
                     outline=PRIMARY, 
                     width=3)
    
    # Draw big stat number
    bbox = draw.textbbox((0, 0), stat_value, font=font_large)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y = 180
    
    draw.text((x, y), stat_value, font=font_large, fill=accent_color)
    
    # Draw label
    bbox = draw.textbbox((0, 0), stat_label, font=font_medium)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y = 350
    
    draw.text((x, y), stat_label, font=font_medium, fill=WHITE)
    
    # Draw subtext if provided
    if subtext:
        bbox = draw.textbbox((0, 0), subtext, font=font_small)
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        y = 450
        
        draw.text((x, y), subtext, font=font_small, fill=GRAY)
    
    # Draw brand mark
    draw.text((width-200, height-60), "StackMatrices", font=font_small, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/stat_{stat_value.replace('%', '').replace('/', '_')}.png"
    img.save(filename, quality=95)
    
    return filename

def create_comparison_card(left_value: str, left_label: str, 
                          right_value: str, right_label: str,
                          title: str) -> str:
    """Create before/after comparison card"""
    
    width, height = 1200, 675
    img = create_gradient_background(width, height)
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
        font_value = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        font_title = ImageFont.load_default()
        font_value = font_title
        font_label = font_title
    
    # Title
    bbox = draw.textbbox((0, 0), title, font=font_title)
    text_width = bbox[2] - bbox[0]
    draw.text(((width - text_width) // 2, 60), title, font=font_title, fill=WHITE)
    
    # Left side (BEFORE)
    left_x = 150
    draw.text((left_x, 200), left_value, font=font_value, fill=DANGER)
    draw.text((left_x, 320), left_label, font=font_label, fill=GRAY)
    
    # Arrow
    arrow_y = 260
    draw.text((550, arrow_y), "→", font=font_value, fill=PRIMARY)
    
    # Right side (AFTER)
    right_x = 750
    draw.text((right_x, 200), right_value, font=font_value, fill=ACCENT)
    draw.text((right_x, 320), right_label, font=font_label, fill=GRAY)
    
    # Improvement badge
    draw_rounded_rect(draw, [450, 450, 750, 520], radius=25, fill=ACCENT)
    draw.text((480, 465), "193% Improvement", font=font_label, fill=DARK_BG)
    
    # Brand
    draw.text((width-200, height-50), "StackMatrices", font=font_label, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/comparison_{left_value.replace('/', '_')}_{right_value.replace('/', '_')}.png"
    img.save(filename, quality=95)
    
    return filename

def create_list_card(title: str, items: list, check_color: tuple = ACCENT) -> str:
    """Create checklist style card"""
    
    width, height = 1200, 675
    img = create_gradient_background(width, height)
    draw = ImageDraw.Draw(img)
    
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
        font_item = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        font_title = ImageFont.load_default()
        font_item = font_title
    
    # Title
    draw.text((60, 60), title, font=font_title, fill=WHITE)
    
    # Items
    y = 160
    for item in items:
        # Checkmark
        draw.text((80, y), "✓", font=font_item, fill=check_color)
        # Text
        draw.text((140, y), item, font=font_item, fill=WHITE)
        y += 80
    
    # Brand
    draw.text((width-200, height-50), "StackMatrices", font=font_item, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/list_{len(items)}.png"
    img.save(filename, quality=95)
    
    return filename

def create_alert_card(emoji: str, headline: str, body: str, cta: str = None) -> str:
    """Create alert/announcement style card"""
    
    width, height = 1200, 675
    img = create_gradient_background(width, height)
    draw = ImageDraw.Draw(img)
    
    try:
        font_emoji = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 100)
        font_headline = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
        font_body = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
        font_cta = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 28)
    except:
        font_emoji = ImageFont.load_default()
        font_headline = font_emoji
        font_body = font_emoji
        font_cta = font_emoji
    
    # Emoji
    draw.text((60, 60), emoji, font=font_emoji, fill=WHITE)
    
    # Headline
    y = 200
    for line in headline.split('\n'):
        draw.text((60, y), line, font=font_headline, fill=PRIMARY)
        bbox = draw.textbbox((0, 0), line, font=font_headline)
        y += bbox[3] - bbox[1] + 20
    
    # Body
    y += 20
    for line in body.split('\n'):
        draw.text((60, y), line, font=font_body, fill=WHITE)
        bbox = draw.textbbox((0, 0), line, font=font_body)
        y += bbox[3] - bbox[1] + 15
    
    # CTA button
    if cta:
        y += 40
        button_width = 300
        button_height = 60
        draw_rounded_rect(draw, 
                         [60, y, 60 + button_width, y + button_height],
                         radius=10, fill=ACCENT)
        draw.text((110, y + 15), cta, font=font_cta, fill=DARK_BG)
    
    # Brand
    draw.text((width-200, height-50), "StackMatrices", font=font_body, fill=GRAY)
    
    filename = f"{OUTPUT_DIR}/alert_{emoji}.png"
    img.save(filename, quality=95)
    
    return filename

def generate_all_infographics():
    """Generate all infographic templates"""
    
    print("🎨 Generating infographic images...")
    print("=" * 60)
    
    images = []
    
    # 1. Single stat cards
    img = create_single_stat_card("84%", "AI Health Queries", 
                                  "Now show AI Overviews", ACCENT)
    images.append(("Stat 84%", img))
    print(f"✅ {img}")
    
    img = create_single_stat_card("3.2x", "More AI Citations",
                                  "With complete schema markup", ACCENT)
    images.append(("Stat 3.2x", img))
    print(f"✅ {img}")
    
    img = create_single_stat_card("$3.4M", "Revenue Recovered",
                                  "In 90 days with GEO", PRIMARY)
    images.append(("Stat $3.4M", img))
    print(f"✅ {img}")
    
    # 2. Comparison
    img = create_comparison_card("18/100", "Before GEO",
                                "74/100", "After 90 Days",
                                "AI Visibility Score")
    images.append(("Comparison", img))
    print(f"✅ {img}")
    
    # 3. Checklist
    items = [
        "MedicalOrganization schema",
        "Physician profiles markup",
        "MedicalProcedure schema",
        "FAQ schema on pages"
    ]
    img = create_list_card("GEO Essentials (Most practices have 0/4)", items)
    images.append(("Checklist", img))
    print(f"✅ {img}")
    
    # 4. Alert
    img = create_alert_card(
        "🚨",
        "Google Algorithm Update",
        "Medical practices: Check your AI visibility ASAP.\nThis affects who gets recommended by ChatGPT & Perplexity.",
        "Get Free Audit"
    )
    images.append(("Alert", img))
    print(f"✅ {img}")
    
    print("=" * 60)
    print(f"\n📊 Generated {len(images)} infographic images:")
    for name, path in images:
        print(f"  • {name}: {path}")
    
    return images

if __name__ == "__main__":
    generate_all_infographics()
