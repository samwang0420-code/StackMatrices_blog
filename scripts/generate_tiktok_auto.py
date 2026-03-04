#!/usr/bin/env python3
"""
TikTok Video Generator - Fully Automated
Audio → Duration → Video → Sync
"""

import os
import json
import subprocess
from datetime import datetime

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"

# Video templates with script and visual mapping
TEMPLATES = [
    {
        "id": "geo_shift",
        "title": "The Shift - Patient Behavior",
        "frames": [
            {"text": "Here's what's happening to medical practices right now.", "visual": "THE SHIFT", "style": "title"},
            {"text": "84% of patients now use AI to find doctors. They don't Google anymore. They ask ChatGPT, Perplexity, Claude.", "visual": "84%", "sub": "use AI to find doctors"},
            {"text": "If your practice isn't visible to AI, you're missing half your potential patients.", "visual": "50%", "sub": "of patients invisible"},
            {"text": "But here's the good news: practices optimizing for AI are seeing 3 times more qualified leads.", "visual": "3X MORE", "sub": "qualified leads"},
            {"text": "We can help you get found. Drop your specialty and city in the comments below.", "visual": "GET FOUND", "sub": "specialty + city", "style": "cta"},
        ]
    },
    {
        "id": "schema_value",
        "title": "Why Schema Matters",
        "frames": [
            {"text": "Let me tell you about something that changed everything for medical practices.", "visual": "THE BREAKTHROUGH", "style": "title"},
            {"text": "Practices with complete schema markup get 3.2 times more citations in AI results.", "visual": "3.2X", "sub": "more AI citations"},
            {"text": "Schema is basically a language that tells AI who you are, what you do, and why patients should trust you.", "visual": "SCHEMA", "sub": "AI understands you"},
            {"text": "Most practices have zero schema. That's why AI can't recommend them.", "visual": "0/4", "sub": "average schema score"},
            {"text": "We can audit your schema in 5 minutes. Comment 'SCHEMA' and we'll check it for free.", "visual": "GET AUDITED", "sub": "comment SCHEMA", "style": "cta"},
        ]
    },
    {
        "id": "perplexity_opportunity",
        "title": "Perplexity Opportunity",
        "frames": [
            {"text": "There's a new AI tool that patients are using to find doctors. And it's converting better than Google.", "visual": "NEW OPPORTUNITY", "style": "title"},
            {"text": "It's called Perplexity. And users who find doctors through it have a 23% higher consultation value.", "visual": "23%", "sub": "higher value"},
            {"text": "Why? Because Perplexity gives direct recommendations with source citations. Patients trust it more.", "visual": "TRUST", "sub": "AI recommendations"},
            {"text": "10 million people use Perplexity every month. Are you on their radar?", "visual": "10M", "sub": "monthly users"},
            {"text": "Check if you're visible on Perplexity. Comment 'P' and we'll tell you what to optimize.", "visual": "GET FOUND", "sub": "comment P", "style": "cta"},
        ]
    },
]

def run_cmd(cmd):
    """Run shell command"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout.strip(), result.returncode

def generate_audio(text, output_path, voice="en-US-JennyNeural"):
    """Generate audio from text using edge-tts"""
    # Save text to temp file
    with open("/tmp/tts_text.txt", "w") as f:
        f.write(text)
    
    cmd = f'edge-tts -f /tmp/tts_text.txt -v {voice} --write-media "{output_path}"'
    run_cmd(cmd)
    
    # Get actual duration
    dur, _ = run_cmd(f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{output_path}"')
    return float(dur)

def create_frame(visual, sub, style, output_path):
    """Create a visual frame using PIL"""
    from PIL import Image, ImageDraw, ImageFont
    
    WIDTH, HEIGHT = 1080, 1920
    COLORS = {'dark': (11, 15, 25), 'primary': (14, 165, 233), 'accent': (16, 185, 129), 'white': (255, 255, 255), 'gray': (107, 114, 128)}
    
    img = Image.new('RGB', (WIDTH, HEIGHT), COLORS['dark'])
    draw = ImageDraw.Draw(img)
    
    try:
        font_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 140)
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 70)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
    except:
        font_big = ImageFont.load_default()
        font_title = font_big
        font_sub = font_big
    
    if style == "title":
        bbox = draw.textbbox((0, 0), visual, font=font_title)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 800), visual, font=font_title, fill=COLORS['primary'])
    elif style == "cta":
        bbox = draw.textbbox((0, 0), visual, font=font_title)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 750), visual, font=font_title, fill=COLORS['white'])
        if sub:
            bbox = draw.textbbox((0, 0), sub, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 900), sub, font=font_sub, fill=COLORS['gray'])
    else:
        # Stat style
        bbox = draw.textbbox((0, 0), visual, font=font_big)
        w = bbox[2] - bbox[0]
        draw.text(((WIDTH-w)//2, 700), visual, font=font_big, fill=COLORS['accent'])
        if sub:
            bbox = draw.textbbox((0, 0), sub, font=font_sub)
            w = bbox[2] - bbox[0]
            draw.text(((WIDTH-w)//2, 950), sub, font=font_sub, fill=COLORS['gray'])
    
    draw.text((60, HEIGHT-100), "@StackMatrices", font=font_sub, fill=COLORS['gray'])
    img.save(output_path, quality=95)

def generate_video_segment(frame_path, audio_path, duration, output_path):
    """Generate video segment with exact audio duration"""
    # Use actual audio duration + small buffer
    actual_duration = duration + 0.1
    
    cmd = f'ffmpeg -y -loop 1 -i "{frame_path}" -i "{audio_path}" -c:v libx264 -t {actual_duration} -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -shortest "{output_path}"'
    run_cmd(cmd)

def concat_videos(video_files, output_path):
    """Concatenate all video segments"""
    with open("/tmp/concat.txt", "w") as f:
        for v in video_files:
            f.write(f"file '{v}'\n")
    
    cmd = f'ffmpeg -y -f concat -i /tmp/concat.txt -c copy "{output_path}"'
    run_cmd(cmd)

def generate_tiktok_video(template_id=None):
    """Main function to generate complete TikTok video"""
    
    # Select template
    if template_id:
        template = next((t for t in TEMPLATES if t["id"] == template_id), None)
        if not template:
            print(f"Template '{template_id}' not found")
            return
    else:
        template = TEMPLATES[0]
    
    print(f"🎬 Generating: {template['title']}")
    print("=" * 50)
    
    video_segments = []
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    for i, frame in enumerate(template["frames"], 1):
        print(f"\n📹 Frame {i}: {frame['visual']}")
        
        # Generate audio
        audio_path = f"{OUTPUT_DIR}/temp_{i:02d}.mp3"
        print(f"   🎙️ Generating audio...")
        audio_dur = generate_audio(frame["text"], audio_path)
        print(f"   ⏱️ Audio duration: {audio_dur:.2f}s")
        
        # Create visual
        frame_path = f"{OUTPUT_DIR}/temp_{i:02d}.png"
        print(f"   🖼️ Creating visual...")
        style = frame.get("style", "stat")
        create_frame(frame["visual"], frame.get("sub"), style, frame_path)
        
        # Generate video with exact duration
        video_path = f"{OUTPUT_DIR}/temp_{i:02d}.mp4"
        print(f"   🎬 Creating video segment ({audio_dur:.2f}s)...")
        generate_video_segment(frame_path, audio_path, audio_dur, video_path)
        video_segments.append(video_path)
        
        print(f"   ✅ Frame {i} done ({audio_dur:.2f}s)")
    
    # Concatenate all segments
    print("\n🔗 Concatenating segments...")
    final_path = f"{OUTPUT_DIR}/tiktok_{template['id']}_{timestamp}.mp4"
    concat_videos(video_segments, final_path)
    
    # Get final duration
    dur, code = run_cmd(f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{final_path}"')
    final_dur = float(dur) if dur else 0
    for i in range(len(template["frames"])):
        for ext in ["mp3", "png", "mp4"]:
            path = f"{OUTPUT_DIR}/temp_{i+1:02d}.{ext}"
            if os.path.exists(path):
                os.remove(path)
    
    print("\n" + "=" * 50)
    print(f"✅ Video generated!")
    print(f"📁 Path: {final_path}")
    print(f"⏱️ Duration: {final_dur:.2f}s")
    print(f"📐 Size: 1080x1920")
    
    return final_path

if __name__ == "__main__":
    import sys
    template_id = sys.argv[1] if len(sys.argv) > 1 else None
    
    if template_id == "list":
        print("Available templates:")
        for t in TEMPLATES:
            print(f"  - {t['id']}: {t['title']}")
    else:
        generate_tiktok_video(template_id)
