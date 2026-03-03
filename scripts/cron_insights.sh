#!/bin/bash
# StackMatrices X Content Automation
# Runs daily at 7:00 AM to generate content

BLOG_DIR="/root/.openclaw/workspace/blog"
LOG_FILE="$BLOG_DIR/logs/insights_cron.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")

echo "[$DATE] Starting content generation..." >> $LOG_FILE

cd $BLOG_DIR

# Run content generator
python3 scripts/generate_daily_content.py >> $LOG_FILE 2>&1

echo "[$DATE] Done" >> $LOG_FILE
echo "---" >> $LOG_FILE
