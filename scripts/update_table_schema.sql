-- Add missing columns to articles table

-- Add cover_image column if not exists
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- Add is_technical column if not exists
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS is_technical BOOLEAN DEFAULT true;

-- Add views column if not exists
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Add content_html column if not exists
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS content_html TEXT;

-- Create index for is_technical
CREATE INDEX IF NOT EXISTS idx_articles_is_technical ON articles(is_technical);

-- Verify columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'articles'
ORDER BY ordinal_position;
