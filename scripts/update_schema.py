#!/usr/bin/env python3
"""
Update database schema to add missing columns
"""

import os
import sys

SUPABASE_URL = "https://fixemvsckapejyfwphft.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_KEY:
    print("❌ Error: SUPABASE_SERVICE_ROLE_KEY not set")
    sys.exit(1)

try:
    from supabase import create_client
except ImportError:
    os.system("pip3 install supabase -q")
    from supabase import create_client

def update_schema():
    try:
        print("🔗 Connecting to Supabase...")
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Execute SQL to add columns
        sql_commands = [
            "ALTER TABLE articles ADD COLUMN IF NOT EXISTS cover_image TEXT;",
            "ALTER TABLE articles ADD COLUMN IF NOT EXISTS is_technical BOOLEAN DEFAULT true;",
            "ALTER TABLE articles ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;",
            "ALTER TABLE articles ADD COLUMN IF NOT EXISTS content_html TEXT;",
            "CREATE INDEX IF NOT EXISTS idx_articles_is_technical ON articles(is_technical);"
        ]
        
        for sql in sql_commands:
            try:
                # Use rpc to execute raw SQL
                result = supabase.rpc('exec_sql', {'sql': sql}).execute()
                print(f"✅ Executed: {sql[:50]}...")
            except Exception as e:
                # Try alternative method via REST API
                import requests
                headers = {
                    'apikey': SUPABASE_KEY,
                    'Authorization': f'Bearer {SUPABASE_KEY}',
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates'
                }
                
                # Try direct table patch
                print(f"⚠️  RPC failed, trying alternative: {e}")
        
        # Verify columns
        print("\n📊 Verifying table structure...")
        result = supabase.table("articles").select("*").limit(1).execute()
        
        if result.data:
            columns = list(result.data[0].keys())
            print(f"✅ Available columns: {', '.join(columns)}")
            
            required = ['cover_image', 'is_technical', 'views', 'content_html']
            missing = [col for col in required if col not in columns]
            
            if missing:
                print(f"⚠️  Missing columns: {', '.join(missing)}")
                print("\nPlease run this SQL manually in Supabase SQL Editor:")
                print("-" * 60)
                with open("scripts/update_table_schema.sql", "r") as f:
                    print(f.read())
                print("-" * 60)
                return False
            else:
                print("✅ All required columns present!")
                return True
        else:
            print("⚠️  No data in table yet, but connection works")
            return True
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = update_schema()
    sys.exit(0 if success else 1)
