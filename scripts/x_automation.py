#!/usr/bin/env python3
"""
StackMatrices X Content Automation Controller
Manage automated content generation for X/Twitter
"""

import os
import sys
import subprocess
from datetime import datetime

CRON_JOB = """# StackMatrices X Content Automation
0 7 * * * /root/.openclaw/workspace/blog/scripts/cron_insights.sh
# End of StackMatrices cron"""

def setup_automation():
    """Setup daily automation"""
    print("🔧 Setting up X Content Automation...")
    print("=" * 60)
    
    # Check if already set up
    result = subprocess.run(
        ['crontab', '-l'],
        capture_output=True,
        text=True
    )
    
    if 'StackMatrices X Content Automation' in result.stdout:
        print("✅ Automation already configured!")
        print("\n📅 Schedule: Daily at 7:00 AM")
        print("📁 Content saved to: data/insights/")
        print("📊 View logs: logs/insights_cron.log")
        return True
    
    # Add cron job
    new_crontab = result.stdout + "\n" + CRON_JOB + "\n"
    
    # Write to temp file and load
    with open('/tmp/cron_tmp', 'w') as f:
        f.write(new_crontab)
    
    result = subprocess.run(['crontab', '/tmp/cron_tmp'], capture_output=True)
    
    if result.returncode == 0:
        print("✅ Automation configured successfully!")
        print("\n📅 Schedule: Daily at 7:00 AM")
        print("🔄 Content generation: Automatic")
        print("📁 Saved to: data/insights/")
        print("📊 Logs: logs/insights_cron.log")
        print("\n💡 To view generated content:")
        print("   python3 scripts/view_content.py")
        return True
    else:
        print(f"❌ Error: {result.stderr}")
        return False

def remove_automation():
    """Remove automation"""
    print("🛑 Removing automation...")
    
    result = subprocess.run(['crontab', '-l'], capture_output=True, text=True)
    lines = result.stdout.split('\n')
    
    # Filter out our cron job
    new_lines = []
    skip = False
    for line in lines:
        if 'StackMatrices X Content Automation' in line:
            skip = True
            continue
        if skip and line.startswith('# End of StackMatrices'):
            skip = False
            continue
        if not skip:
            new_lines.append(line)
    
    new_crontab = '\n'.join(new_lines)
    
    with open('/tmp/cron_tmp', 'w') as f:
        f.write(new_crontab)
    
    subprocess.run(['crontab', '/tmp/cron_tmp'])
    print("✅ Automation removed")

def view_status():
    """View automation status"""
    print("📊 Automation Status")
    print("=" * 60)
    
    # Check cron
    result = subprocess.run(['crontab', '-l'], capture_output=True, text=True)
    if 'StackMatrices X Content Automation' in result.stdout:
        print("✅ Status: ACTIVE")
        print("📅 Schedule: Daily at 7:00 AM")
    else:
        print("❌ Status: NOT CONFIGURED")
    
    # Check logs
    log_file = "/root/.openclaw/workspace/blog/logs/insights_cron.log"
    if os.path.exists(log_file):
        print(f"📊 Log file: {log_file}")
        # Show last run
        with open(log_file, 'r') as f:
            lines = f.readlines()
            if lines:
                last_lines = lines[-10:]
                print("\n📝 Last 10 log lines:")
                for line in last_lines:
                    print(line.rstrip())
    
    # Check generated content
    insights_dir = "/root/.openclaw/workspace/blog/data/insights"
    if os.path.exists(insights_dir):
        files = [f for f in os.listdir(insights_dir) if f.endswith('.json')]
        print(f"\n📁 Generated content: {len(files)} insights")
        if files:
            print("💡 Run 'python3 scripts/view_content.py' to see them")

def run_now():
    """Run content generation now"""
    print("🚀 Running content generation now...")
    result = subprocess.run(
        ['python3', '/root/.openclaw/workspace/blog/scripts/generate_insights.py'],
        capture_output=True,
        text=True
    )
    print(result.stdout)
    if result.stderr:
        print("Errors:", result.stderr)

def main():
    if len(sys.argv) < 2:
        print("StackMatrices X Content Automation")
        print("=" * 60)
        print("\nUsage:")
        print("  python3 scripts/x_automation.py setup     # Enable automation")
        print("  python3 scripts/x_automation.py remove    # Disable automation")
        print("  python3 scripts/x_automation.py status    # Check status")
        print("  python3 scripts/x_automation.py run       # Run now (manual)")
        print("  python3 scripts/view_content.py           # View generated content")
        print("\nCurrent status:")
        view_status()
        return
    
    command = sys.argv[1]
    
    if command == 'setup':
        setup_automation()
    elif command == 'remove':
        remove_automation()
    elif command == 'status':
        view_status()
    elif command == 'run':
        run_now()
    else:
        print(f"❌ Unknown command: {command}")
        print("Use: setup, remove, status, or run")

if __name__ == "__main__":
    main()
