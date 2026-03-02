-- Create articles table for technical blog posts
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    author TEXT DEFAULT 'Sarah Kim',
    read_time TEXT,
    excerpt TEXT,
    cover_image TEXT,
    content TEXT NOT NULL, -- Markdown content
    content_html TEXT, -- Pre-rendered HTML
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    is_technical BOOLEAN DEFAULT true, -- Flag for technical articles
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_is_technical ON articles(is_technical);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON articles
    FOR SELECT USING (published = true);

-- Create policy for authenticated users to manage articles
CREATE POLICY "Allow authenticated users to manage articles" ON articles
    FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert technical articles
INSERT INTO articles (title, slug, category, author, read_time, excerpt, cover_image, content, is_technical, published, created_at) VALUES
(
    'The Complete Guide to Medical Schema Markup for AI Visibility',
    'schema-markup-guide',
    'Implementation',
    'Sarah Kim',
    '18 min read',
    'Complete implementation guide for medical schema markup including Dentist, MedicalProcedure, Physician, and FAQ schemas. Copy-paste JSON-LD examples with validation tips.',
    'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg',
    E'## What Is Schema Markup and Why Does It Matter for AI?

Schema markup is structured data that helps search engines and AI systems understand your content contextually.

### The AI Connection

When ChatGPT or Perplexity answers a question like "What are dental implants?", it doesn't just search for keywords—it looks for structured information that provides:
- Clear entity definitions
- Relationships between concepts
- Authoritative sources
- Comprehensive coverage

**Without schema:** AI sees unstructured text
**With schema:** AI sees a knowledge graph it can cite confidently',
    true,
    true,
    NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    updated_at = NOW();

-- Verify table creation
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'articles'
ORDER BY ordinal_position;
