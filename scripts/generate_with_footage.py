#!/usr/bin/env python3
"""
TikTok Video Generator - Using User's Real Footage
"""

import os
import subprocess

OUTPUT_DIR = "/root/.openclaw/workspace/blog/public/tiktok-assets"
SUCAI_DIR = f"{OUTPUT_DIR}/sucai"
MUSIC_DIR = f"{OUTPUT_DIR}/music"

def run_cmd(cmd):
    os.system(cmd)

def generate_video_with_footage():
    """Generate video using user's real footage"""
    
    footage = f"{SUCAI_DIR}/App-2026-03-03-231200.mp4"
    
    print("🎬 Generating TikTok Video with Real Footage")
    print("=" * 50)
    
    # Get footage duration
    result = subprocess.run(
        f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{footage}"',
        shell=True, capture_output=True, text=True
    )
    footage_dur = float(result.stdout.strip()) if result.stdout.strip() else 39
    print(f"📹 Footage duration: {footage_dur:.1f}s")
    
    # Generate voiceover
    print("\n🎙️ Generating voiceover...")
    voice_script = """This is exactly what's happening. Patients aren't Google-ing anymore. They're asking AI. Look, let me show you. When someone searches "best med spa Houston" on ChatGPT, AI gives direct recommendations. If your practice isn't on that list, you're invisible. But we can fix that."""
    
    with open("/tmp/voice.txt", "w") as f:
        f.write(voice_script)
    
    run_cmd(f'edge-tts -f /tmp/voice.txt -v en-US-JennyNeural --write-media "{OUTPUT_DIR}/voiceover.mp3" 2>/dev/null')
    
    # Get voiceover duration
    result = subprocess.run(
        f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{OUTPUT_DIR}/voiceover.mp3"',
        shell=True, capture_output=True, text=True
    )
    voice_dur = float(result.stdout.strip()) if result.stdout.strip() else 15
    print(f"   Voiceover: {voice_dur:.1f}s")
    
    # Create video from footage with voiceover
    print("\n🎬 Creating video with footage...")
    
    # Use footage as base, add voiceover
    run_cmd(f'''ffmpeg -y -i "{footage}" -i "{OUTPUT_DIR}/voiceover.mp3" -c:v copy -c:a aac -b:a 128k -shortest "{OUTPUT_DIR}/footage_with_voice.mp4" 2>/dev/null''')
    
    # Get final duration
    result = subprocess.run(
        f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{OUTPUT_DIR}/footage_with_voice.mp4"',
        shell=True, capture_output=True, text=True
    )
    final_dur = float(result.stdout.strip()) if result.stdout.strip() else footage_dur
    print(f"   Video duration: {final_dur:.1f}s")
    
    # Add background music
    print("\n🎵 Adding background music...")
    music_files = [f for f in os.listdir(MUSIC_DIR) if f.endswith('.mp3')]
    if music_files:
        music = f"{MUSIC_DIR}/{music_files[0]}"
        print(f"   Using: {music_files[0]}")
        
        # Trim music
        run_cmd(f'ffmpeg -y -i "{music}" -t {final_dur} "{OUTPUT_DIR}/bg_music.mp3" 2>/dev/null')
        
        # Mix
        run_cmd(f'''ffmpeg -y -i "{OUTPUT_DIR}/footage_with_voice.mp4" -i "{OUTPUT_DIR}/bg_music.mp3" -filter_complex "[0:a]volume=0.7[voice];[1:a]volume=0.25[music];[voice][music]amix=inputs=2:duration=first[out]" -map 0:v -map "[out]" -c:v copy -c:a aac -b:a 128k "{OUTPUT_DIR}/tiktok_with_footage.mp4" 2>/dev/null''')
    
    print("\n" + "=" * 50)
    print(f"✅ Video with real footage generated!")
    print(f"📁 Path: {OUTPUT_DIR}/tiktok_with_footage.mp4")
    print(f"⏱️ Duration: {final_dur:.1f}s")

if __name__ == "__main__":
    generate_video_with_footage()
