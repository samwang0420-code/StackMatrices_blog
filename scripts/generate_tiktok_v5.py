#!/usr/bin/env python3
"""
TikTok Video Generator V5 - Rich Content
More frames, more details, more engaging
"""

from PIL import Image, ImageDraw, ImageFont
import os
import random

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
MUSIC_DIR = f"{OUTPUT_DIR}/music"
WIDTH, HEIGHT = 1080, 1920

COLORS = {
    'dark': (11, 15, 25),
    'navy': (7, 25, 47),
    'primary': (14, 165, 233),
    'accent': (16, 185, 129),
    'white': (255, 255, 255),
    'gray': (107, 114, 128),
    'gold': (245, 158, 11),
    'red': (239, 68, 68),
}

def create_cyber_bg():
    """Cyber data flow"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Gradient
    for y in range(HEIGHT):
        r = int(11 + 25 * (y/HEIGHT))
        g = int(15 + 60 * (y/HEIGHT))
        b = int(25 + 100 * (y/HEIGHT))
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    
    # Grid
    for x in range(0, WIDTH, 60):
        draw.line([(x, 0), (x, HEIGHT)], fill=(14, 165, 233, 15))
    for y in range(0, HEIGHT, 60):
        draw.line([(0, y), (WIDTH, y)], fill=(14, 165, 233, 15))
    
    # Data points
    random.seed(123)
    for _ in range(120):
        x = random.randint(0, WIDTH)
        y = random.randint(0, HEIGHT)
        r = random.randint(1, 5)
        alpha = random.randint(40, 100)
        color = random.choice([COLORS['primary'], COLORS['accent'], COLORS['white']])
        draw.ellipse([x-r, y-r, x+r, y+r], fill=(*color, alpha))
    
    # Connecting lines
    random.seed(123)
    points = [(random.randint(0, WIDTH), random.randint(0, HEIGHT)) for _ in range(20)]
    for i in range(len(points)-1):
        draw.line([points[i], points[i+1]], fill=(14, 165, 233, 30), width=1)
    
    return img

def create_network_bg():
    """Network nodes background"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Radial gradient from center
    pixels = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = ((x - WIDTH//2)**2 + (y - HEIGHT//2)**2)**0.5
            max_dist = ((WIDTH//2)**2 + (HEIGHT//2)**2)**0.5
            factor = 1 - (dist / max_dist) * 0.5
            if x % 10 == 0 and y % 10 == 0:
                r = int(7 + 15 * factor)
                g = int(25 + 35 * factor)
                b = int(47 + 50 * factor)
                pixels[x, y] = (r, g, b)
    
    # Network nodes
    random.seed(456)
    nodes = []
    for _ in range(15):
        x = random.randint(100, WIDTH-100)
        y = random.randint(200, HEIGHT-200)
        nodes.append((x, y))
        draw.ellipse([x-15, y-15, x+15, y+15], fill=COLORS['primary'], outline=COLORS['white'], width=2)
    
    # Connections
    for i in range(len(nodes)):
        for j in range(i+1, len(nodes)):
            if random.random() < 0.3:
                draw.line([nodes[i], nodes[j]], fill=(14, 165, 233, 40), width=2)
    
    return img

def create_medical_bg():
    """Medical professional"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['navy'])
    draw = ImageDraw.Draw(img)
    
    # Subtle gradient
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(7 + 15 * ratio)
        g = int(25 + 35 * ratio)
        b = int(47 + 50 * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    
    # Medical chart lines
    for y in range(200, HEIGHT, 150):
        draw.line([(100, y), (WIDTH-100, y)], fill=(14, 165, 233, 12))
    
    # Cross symbol (medical)
    cx, cy = WIDTH//2, HEIGHT//2
    size = 80
    draw.line([(cx-size, cy), (cx+size, cy)], fill=(14, 165, 233, 30), width=3)
    draw.line([(cx, cy-size), (cx, cy+size)], fill=(14, 165, 233, 30), width=3)
    
    return img

def create_growth_bg():
    """Growth/chart background"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Bars
    bar_width = 120
    gaps = 80
    start_x = 180
    heights = [200, 350, 450, 550, 650]
    colors = [COLORS['red'], COLORS['red'], COLORS['gray'], COLORS['accent'], COLORS['accent']]
    
    for i, (h, c) in enumerate(zip(heights, colors)):
        x = start_x + i * (bar_width + gaps)
        draw.rectangle([x, HEIGHT-h-100, x+bar_width, HEIGHT-100], fill=c, outline=COLORS['white'], width=2)
    
    # Upward arrow
    draw.polygon([(WIDTH-200, HEIGHT-200), (WIDTH-150, HEIGHT-300), (WIDTH-100, HEIGHT-200)], fill=COLORS['accent'])
    
    return img

def add_effects(img):
    """Add vignette + overlay"""
    draw = ImageDraw.Draw(img)
    
    # Overlay
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (11, 15, 25, 140))
    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')
    
    # Vignette
    pixels = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dx = (x - WIDTH//2) / (WIDTH//2)
            dy = (y - HEIGHT//2) / (HEIGHT//2)
            dist = (dx**2 + dy**2)**0.5
            if dist > 0.5:
                factor = min(0.6, (dist - 0.5) * 1.2)
                r, g, b = pixels[x, y]
                pixels[x, y] = (int(r*(1-factor)), int(g*(1-factor)), int(b*(1-factor)))
    
    return img

def create_rich_frame(text, subtext, items, style, bg_type):
    """Create rich frame with multiple elements"""
    
    if bg_type == "cyber":
        bg = create_cyber_bg()
    elif bg_type == "network":
        bg = create_network_bg()
    elif bg_type == "medical":
        bg = create_medical_bg()
    else:
        bg = create_growth_bg()
    
    bg = add_effects(bg)
    draw = ImageDraw.Draw(bg)
    
    try:
        font_huge = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 100)
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 70)
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 50)
        font_main = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 26)
    except:
        font_huge = font_big = font_title = font_main = font_small = ImageFont.load_default()
    
    # Draw main text with shadow
    def draw_text_shadowed(text, font, color, x, y):
        draw.text((x+3, y+3), text, font=font, fill=(0,0,0))
        draw.text((x, y), text, font=font, fill=color)
    
    if style == "stat":
        # Big stat
        draw_text_shadowed(text, font_huge, COLORS['accent'], (WIDTH//2 - 150), 500)
        # Subtext
        if subtext:
            draw_text_shadowed(subtext, font_main, COLORS['gray'], (WIDTH//2 - 180), 700)
    elif style == "title":
        draw_text_shadowed(text, font_big, COLORS['primary'], (WIDTH//2 - 250), 650)
        if subtext:
            draw_text_shadowed(subtext, font_main, COLORS['gray'], (WIDTH//2 - 200), 800)
    elif style == "list":
        draw_text_shadowed(text, font_title, COLORS['white'], 80, 250)
        # List items
        y_pos = 380
        for i, item in enumerate(items, 1):
            # Number
            draw.ellipse([70, y_pos-5, 100, y_pos+25], fill=COLORS['primary'])
            draw.text((80, y_pos), str(i), font=font_small, fill=COLORS['white'])
            # Text
            draw_text_shadowed(item, font_main, COLORS['white'], 130, y_pos)
            y_pos += 90
    elif style == "cta":
        draw_text_shadowed(text, font_title, COLORS['white'], (WIDTH//2 - 180), 600)
        if items:
            y_pos = 750
            for item in items:
                draw_text_shadowed(item, font_main, COLORS['accent'], (WIDTH//2 - 150), y_pos)
                y_pos += 60
    
    # Watermark
    draw.text((60, HEIGHT-100), "@StackMatrices", font=font_small, fill=COLORS['gray'])
    
    return bg

def generate_v5_video():
    """Generate rich content video"""
    
    print("🎬 Generating TikTok Video V5 - Rich Content")
    print("=" * 50)
    
    # Rich script with more frames
    frames = [
        # Frame 1: Hook
        {
            "text": "🚨 THE SHIFT",
            "sub": "What's happening to medical practices",
            "items": None,
            "style": "title",
            "bg": "cyber",
            "voice": "Here's what's happening to medical practices right now. And it's changing everything."
        },
        # Frame 2: The problem
        {
            "text": "84%",
            "sub": "of patients use AI to find doctors",
            "items": None,
            "style": "stat",
            "bg": "network",
            "voice": "84% of patients now use AI to find doctors. They don't Google anymore. They ask ChatGPT, Perplexity, Claude."
        },
        # Frame 3: Impact
        {
            "text": "47%",
            "sub": "of market is now invisible",
            "items": None,
            "style": "stat",
            "bg": "cyber",
            "voice": "If your practice isn't visible to AI, you're missing almost half of your potential patients. That's huge."
        },
        # Frame 4: The opportunity
        {
            "text": "3X MORE",
            "sub": "qualified leads with GEO",
            "items": None,
            "style": "stat",
            "bg": "growth",
            "voice": "But here's the good news. Practices optimizing for AI are seeing 3 times more qualified leads."
        },
        # Frame 5: What to do
        {
            "text": "WHAT WORKS",
            "sub": None,
            "items": [
                "Complete Schema Markup",
                "AI-Readable Content",
                "Entity Presence",
                "Review Optimization"
            ],
            "style": "list",
            "bg": "network",
            "voice": "What actually works? Number one: Complete schema markup. Two: Content that AI can read. Three: Building your entity presence. Four: Optimizing your reviews."
        },
        # Frame 6: CTA
        {
            "text": "GET FOUND",
            "sub": None,
            "items": [
                "Drop your specialty + city",
                "We'll check your AI visibility"
            ],
            "style": "cta",
            "bg": "medical",
            "voice": "We can help you get found. Drop your specialty and city in the comments. We'll check your AI visibility for free."
        },
    ]
    
    # Generate voiceovers
    print("🎙️ Generating voiceovers...")
    for i, frame in enumerate(frames, 1):
        with open("/tmp/v5_script.txt", "w") as f:
            f.write(frame["voice"])
        
        os.system(f'edge-tts -f /tmp/v5_script.txt -v en-US-JennyNeural --write-media "{OUTPUT_DIR}/v5_{i:02d}.mp3" 2>/dev/null')
        print(f"   ✅ Voice {i}")
    
    # Generate frames
    print("\n🖼️ Creating rich frames...")
    for i, frame in enumerate(frames, 1):
        img = create_rich_frame(frame["text"], frame["sub"], frame["items"], frame["style"], frame["bg"])
        img.save(f"{OUTPUT_DIR}/v5_{i:02d}.png", quality=95)
        print(f"   ✅ Frame {i}: {frame['bg']} - {frame['style']}")
    
    # Get durations
    print("\n⏱️ Getting durations...")
    durations = []
    for i in range(1, len(frames)+1):
        result = os.popen(f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{OUTPUT_DIR}/v5_{i:02d}.mp3"').read()
        dur = float(result.strip()) if result.strip() else 3
        durations.append(dur)
        print(f"   Frame {i}: {dur:.2f}s")
    
    # Generate video segments
    print("\n🎬 Creating video segments...")
    for i, dur in enumerate(durations, 1):
        os.system(f'ffmpeg -y -loop 1 -i "{OUTPUT_DIR}/v5_{i:02d}.png" -i "{OUTPUT_DIR}/v5_{i:02d}.mp3" -c:v libx264 -t {dur+0.1} -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -shortest "{OUTPUT_DIR}/v5_{i:02d}.mp4" 2>/dev/null')
        print(f"   ✅ Segment {i}")
    
    # Concatenate
    print("\n🔗 Concatenating...")
    with open(f"{OUTPUT_DIR}/v5_concat.txt", "w") as f:
        for i in range(1, len(frames)+1):
            f.write(f"file '{OUTPUT_DIR}/v5_{i:02d}.mp4'\n")
    
    os.system(f'ffmpeg -y -f concat -i "{OUTPUT_DIR}/v5_concat.txt" -c copy "{OUTPUT_DIR}/v5_no_music.mp4" 2>/dev/null')
    
    # Get total duration
    total_dur = float(os.popen(f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{OUTPUT_DIR}/v5_no_music.mp4"').read().strip())
    print(f"Total duration: {total_dur:.2f}s")
    
    # Add music
    print("\n🎵 Adding background music...")
    music_files = [f for f in os.listdir(MUSIC_DIR) if f.endswith('.mp3')]
    if music_files:
        selected = random.choice(music_files)
        music_path = f"{MUSIC_DIR}/{selected}"
        print(f"   Using: {selected}")
        
        # Trim music
        os.system(f'ffmpeg -y -i "{music_path}" -t {total_dur} "{OUTPUT_DIR}/v5_music.mp3" 2>/dev/null')
        
        # Mix
        os.system(f'''ffmpeg -y -i "{OUTPUT_DIR}/v5_no_music.mp4" -i "{OUTPUT_DIR}/v5_music.mp3" -filter_complex "[0:a]volume=0.7[voice];[1:a]volume=0.3[music];[voice][music]amix=inputs=2:duration=first[out]" -map 0:v -map "[out]" -c:v copy -c:a aac -b:a 128k "{OUTPUT_DIR}/tiktok_v5_final.mp4" 2>/dev/null''')
    
    print("\n" + "=" * 50)
    print(f"✅ Video generated!")
    print(f"📁 Path: {OUTPUT_DIR}/tiktok_v5_final.mp4")
    print(f"⏱️ Duration: {total_dur:.2f}s")
    print(f"📊 Frames: {len(frames)}")

if __name__ == "__main__":
    generate_v5_video()
