#!/usr/bin/env python3
"""
TikTok Video Generator V4 - Enhanced Backgrounds + User Music
- Professional backgrounds with vignette + overlay + texture
- User-provided background music
- Perfect sync
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
}

def create_cyber_background():
    """Cyber data flow - tech/AI content"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Base gradient
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(11 + 20 * ratio)
        g = int(15 + 50 * ratio)
        b = int(25 + 80 * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
    
    # Grid lines
    for x in range(0, WIDTH, 80):
        draw.line([(x, 0), (x, HEIGHT)], fill=(14, 165, 233, 20))
    for y in range(0, HEIGHT, 80):
        draw.line([(0, y), (WIDTH, y)], fill=(14, 165, 233, 20))
    
    # Glowing dots (data points)
    random.seed(42)
    for _ in range(80):
        x = random.randint(0, WIDTH)
        y = random.randint(0, HEIGHT)
        r = random.randint(1, 4)
        alpha = random.randint(30, 80)
        draw.ellipse([x-r, y-r, x+r, y+r], fill=(14, 165, 233, alpha))
    
    return img

def create_abstract_background():
    """Abstract texture - premium feel"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    # Subtle wave patterns
    import math
    for x in range(WIDTH):
        y_offset = int(math.sin(x / 80) * 30 + math.sin(x / 40) * 15)
        alpha = 15
        draw.line([(x, HEIGHT//2 + y_offset - 150), (x, HEIGHT//2 + y_offset + 150)], 
                  fill=(14, 165, 233, alpha))
    
    # Light rays from corner
    for i in range(20):
        y = int(HEIGHT * 0.7 + i * 15)
        alpha = int(25 - i)
        if alpha > 0:
            draw.line([(0, y), (WIDTH, y)], fill=(14, 74, 110, alpha))
    
    return img

def create_medical_background():
    """Minimalist medical - professional & clean"""
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['navy'])
    draw = ImageDraw.Draw(img)
    
    # Subtle radial gradient (center brighter)
    pixels = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            dist = ((x - WIDTH//2)**2 + (y - HEIGHT//2)**2)**0.5
            max_dist = ((WIDTH//2)**2 + (HEIGHT//2)**2)**0.5
            factor = 1 - (dist / max_dist) * 0.4
            r = int(7 + 10 * factor)
            g = int(25 + 30 * factor)
            b = int(47 + 40 * factor)
            if x % 8 == 0 and y % 8 == 0:
                pixels[x, y] = (r, g, b)
    
    # Medical chart lines
    for y in range(250, HEIGHT, 180):
        draw.line([(150, y), (WIDTH-150, y)], fill=(14, 165, 233, 15))
    
    return img

def add_professional_effects(img):
    """Add vignette + overlay + texture - user's requirements"""
    draw = ImageDraw.Draw(img)
    
    # 1. Semi-transparent overlay (opacity 0.6) - user's requirement
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (11, 15, 25, 150))
    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')
    
    # 2. Vignette effect - darken edges
    pixels = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            # Distance from center
            dx = (x - WIDTH//2) / (WIDTH//2)
            dy = (y - HEIGHT//2) / (HEIGHT//2)
            dist = (dx**2 + dy**2)**0.5
            
            if dist > 0.5:
                factor = min(0.7, (dist - 0.5) * 1.4)
                r, g, b = pixels[x, y]
                r = int(r * (1 - factor))
                g = int(g * (1 - factor))
                b = int(b * (1 - factor))
                pixels[x, y] = (r, g, b)
    
    return img

def create_final_frame(text, subtext, style, bg_type):
    """Create professional frame with enhanced background"""
    
    # Create background
    if bg_type == "cyber":
        bg = create_cyber_background()
    elif bg_type == "medical":
        bg = create_medical_background()
    else:
        bg = create_abstract_background()
    
    # Apply professional effects (vignette + overlay)
    bg = add_professional_effects(bg)
    
    # Add text
    draw = ImageDraw.Draw(bg)
    
    try:
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 130)
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
    except:
        font_big = ImageFont.load_default()
        font_title = font_big
        font_sub = font_big
    
    # Draw text with shadow for better visibility
    if style == "title":
        # Shadow
        draw.text(((WIDTH//2 - 200) + 3, 803), text, font=font_title, fill=(0, 0, 0))
        # Main
        bbox = draw.textbbox((0, 0), text, font=font_title)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2 + 3, 800 + 3), text, font=font_title, fill=(0, 0, 0))
        draw.text(((WIDTH-w)//2, 800), text, font=font_title, fill=COLORS['primary'])
    elif style == "cta":
        draw.text(((WIDTH//2 - 180) + 3, 753), text, font=font_title, fill=(0, 0, 0))
        bbox = draw.textbbox((0, 0), text, font=font_title)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2 + 3, 750 + 3), text, font=font_title, fill=(0, 0, 0))
        draw.text(((WIDTH-w)//2, 750), text, font=font_title, fill=COLORS['white'])
        if subtext:
            draw.text(((WIDTH//2 - 120) + 2, 903), subtext, font=font_sub, fill=(0, 0, 0))
            bbox = draw.textbbox((0, 0), subtext, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 900), subtext, font=font_sub, fill=COLORS['gray'])
    else:
        # Stat style - large number
        draw.text(((WIDTH//2 - 150) + 3, 703), text, font=font_big, fill=(0, 0, 0))
        bbox = draw.textbbox((0, 0), text, font=font_big)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2 + 3, 700 + 3), text, font=font_big, fill=(0, 0, 0))
        draw.text(((WIDTH-w)//2, 700), text, font=font_big, fill=COLORS['accent'])
        if subtext:
            draw.text(((WIDTH//2 - 150) + 2, 953), subtext, font=font_sub, fill=(0, 0, 0))
            bbox = draw.textbbox((0, 0), subtext, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 950), subtext, font=font_sub, fill=COLORS['gray'])
    
    # Watermark
    draw.text((60, HEIGHT-100), "@StackMatrices", font=font_sub, fill=COLORS['gray'])
    
    return bg

def generate_v4_video():
    """Generate complete video with user's music"""
    
    print("🎬 Generating TikTok Video V4")
    print("=" * 50)
    
    # Get user's music files
    music_files = [f for f in os.listdir(MUSIC_DIR) if f.endswith('.mp3')]
    if not music_files:
        print("❌ No music files found!")
        return
    
    # Randomly select one
    selected_music = random.choice(music_files)
    music_path = f"{MUSIC_DIR}/{selected_music}"
    print(f"🎵 Using: {selected_music}")
    
    # Frames definition
    frames = [
        ("THE SHIFT", None, "title", "cyber"),
        ("84%", "use AI to find doctors", "stat", "cyber"),
        ("50%", "of patients invisible", "stat", "cyber"),
        ("3X MORE", "qualified leads", "stat", "abstract"),
        ("GET FOUND", "your specialty + city", "cta", "medical"),
    ]
    
    # Generate frames
    print("\n🖼️ Creating frames with enhanced backgrounds...")
    for i, (text, sub, style, bg) in enumerate(frames, 1):
        img = create_final_frame(text, sub, style, bg)
        img.save(f"{OUTPUT_DIR}/v4_{i:02d}.png", quality=95)
        print(f"   ✅ Frame {i}: {bg} background")
    
    # Get audio durations
    print("\n🎙️ Getting voiceover durations...")
    audio_files = ["v2_01.mp3", "v2_02.mp3", "v2_03.mp3", "v2_04.mp3", "v2_05.mp3"]
    durations = []
    for af in audio_files:
        path = f"{OUTPUT_DIR}/{af}"
        if os.path.exists(path):
            import subprocess
            result = subprocess.run(
                f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{path}"',
                shell=True, capture_output=True, text=True
            )
            dur = float(result.stdout.strip()) if result.stdout.strip() else 0
            durations.append(dur)
            print(f"   {af}: {dur:.2f}s")
    
    # Generate video segments with voiceover
    print("\n🎬 Generating video segments...")
    for i, dur in enumerate(durations, 1):
        frame_path = f"{OUTPUT_DIR}/v4_{i:02d}.png"
        audio_path = f"{OUTPUT_DIR}/v2_0{i}.mp3"
        
        cmd = f'ffmpeg -y -loop 1 -i "{frame_path}" -i "{audio_path}" -c:v libx264 -t {dur+0.1} -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -shortest "{OUTPUT_DIR}/v4_{i:02d}.mp4"'
        os.system(cmd)
        print(f"   ✅ Segment {i}: {dur:.2f}s")
    
    # Concatenate
    print("\n🔗 Concatenating segments...")
    concat_list = "\n".join([f"file '{OUTPUT_DIR}/v4_{i:02d}.mp4'" for i in range(1, 6)])
    with open(f"{OUTPUT_DIR}/v4_concat.txt", "w") as f:
        f.write(concat_list)
    
    os.system(f'ffmpeg -y -f concat -i "{OUTPUT_DIR}/v4_concat.txt" -c copy "{OUTPUT_DIR}/v4_no_music.mp4"')
    
    # Get total duration
    import subprocess
    result = subprocess.run(
        f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{OUTPUT_DIR}/v4_no_music.mp4"',
        shell=True, capture_output=True, text=True
    )
    total_dur = float(result.stdout.strip()) if result.stdout.strip() else 30
    
    # Trim music to match video
    print(f"\n🎵 Trimming music to {total_dur:.2f}s...")
    os.system(f'ffmpeg -y -i "{music_path}" -t {total_dur} "{OUTPUT_DIR}/v4_music_trimmed.mp3"')
    
    # Mix voice and music
    print("\n🎧 Mixing voiceover + background music...")
    # Voice 70%, Music 30%
    os.system(f'''ffmpeg -y -i "{OUTPUT_DIR}/v4_no_music.mp4" -i "{OUTPUT_DIR}/v4_music_trimmed.mp3" -filter_complex "[0:a]volume=0.7[voice];[1:a]volume=0.3[music];[voice][music]amix=inputs=2:duration=first[out]" -map 0:v -map "[out]" -c:v copy -c:a aac -b:a 128k "{OUTPUT_DIR}/tiktok_v4_final.mp4"''')
    
    # Final check
    result = subprocess.run(
        f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{OUTPUT_DIR}/tiktok_v4_final.mp4"',
        shell=True, capture_output=True, text=True
    )
    final_dur = float(result.stdout.strip()) if result.stdout.strip() else 0
    
    print("\n" + "=" * 50)
    print(f"✅ Video generated!")
    print(f"📁 Path: {OUTPUT_DIR}/tiktok_v4_final.mp4")
    print(f"⏱️ Duration: {final_dur:.2f}s")
    print(f"🎵 Music: {selected_music}")
    print(f"🖼️ Backgrounds: cyber + abstract + medical with vignette + overlay")

if __name__ == "__main__":
    generate_v4_video()
