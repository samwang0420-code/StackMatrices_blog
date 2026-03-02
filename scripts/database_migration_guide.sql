-- ============================================================================
-- Database Migration Guide - StackMatrices
-- ============================================================================

-- Step 1: Run the complete schema (creates all tables fresh)
-- ⚠️ WARNING: This will DROP existing tables if they exist
\i scripts/complete_database_schema.sql

-- OR Step-by-step migration for existing databases:

-- ============================================================================
-- OPTION A: Fresh Install (Recommended for new projects)
-- ============================================================================

-- Simply run the complete schema file in Supabase SQL Editor
-- All tables will be created with proper indexes, triggers, and sample data

-- ============================================================================
-- OPTION B: Migration for Existing Database
-- ============================================================================

-- Check current tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check current columns in geo_implementation_iterations
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'geo_implementation_iterations'
ORDER BY ordinal_position;

-- ----------------------------------------------------------------------------
-- Migration: Add missing columns to existing geo_implementation_iterations
-- ----------------------------------------------------------------------------

-- Add columns if they don't exist
DO $$
BEGIN
    -- Add source_publish_date
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='geo_implementation_iterations' 
                   AND column_name='source_publish_date') THEN
        ALTER TABLE geo_implementation_iterations 
        ADD COLUMN source_publish_date TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Add risk_level
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='geo_implementation_iterations' 
                   AND column_name='risk_level') THEN
        ALTER TABLE geo_implementation_iterations 
        ADD COLUMN risk_level TEXT CHECK (risk_level IN ('critical', 'high', 'medium', 'low'));
    END IF;

    -- Add dependencies
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='geo_implementation_iterations' 
                   AND column_name='dependencies') THEN
        ALTER TABLE geo_implementation_iterations 
        ADD COLUMN dependencies TEXT[] DEFAULT '{}';
    END IF;

    -- Add source_title
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='geo_implementation_iterations' 
                   AND column_name='source_title') THEN
        ALTER TABLE geo_implementation_iterations 
        ADD COLUMN source_title TEXT;
    END IF;
END $$;

-- Add composite index if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes 
                   WHERE indexname = 'idx_geo_iterations_priority_status') THEN
        CREATE INDEX idx_geo_iterations_priority_status 
        ON geo_implementation_iterations(priority, status);
    END IF;
END $$;

-- ----------------------------------------------------------------------------
-- Migration: Create articles table if not exists
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    author TEXT DEFAULT 'Sarah Kim',
    author_name TEXT,
    author_role TEXT,
    author_avatar TEXT,
    read_time TEXT,
    excerpt TEXT,
    content TEXT NOT NULL,
    content_html TEXT,
    cover_image TEXT,
    image_url TEXT,
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    meta_title TEXT,
    meta_description TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for articles
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);

-- ----------------------------------------------------------------------------
-- Migration: Create tech_iterations table if not exists
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tech_iterations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN ('backlog', 'planned', 'in_progress', 'completed', 'cancelled')),
    estimated_hours INTEGER,
    actual_hours INTEGER,
    tags TEXT[] DEFAULT '{}',
    acceptance_criteria TEXT[] DEFAULT '{}',
    technical_notes TEXT,
    assigned_to TEXT,
    project TEXT DEFAULT 'StackMatrices',
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- Helper Functions
-- ----------------------------------------------------------------------------

-- Function to get iteration statistics
CREATE OR REPLACE FUNCTION get_iteration_stats()
RETURNS TABLE (
    total BIGINT,
    critical BIGINT,
    high BIGINT,
    medium BIGINT,
    low BIGINT,
    backlog BIGINT,
    in_progress BIGINT,
    completed BIGINT,
    total_hours BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total,
        COUNT(*) FILTER (WHERE priority = 'critical')::BIGINT as critical,
        COUNT(*) FILTER (WHERE priority = 'high')::BIGINT as high,
        COUNT(*) FILTER (WHERE priority = 'medium')::BIGINT as medium,
        COUNT(*) FILTER (WHERE priority = 'low')::BIGINT as low,
        COUNT(*) FILTER (WHERE status = 'backlog')::BIGINT as backlog,
        COUNT(*) FILTER (WHERE status = 'in_progress')::BIGINT as in_progress,
        COUNT(*) FILTER (WHERE status = 'completed')::BIGINT as completed,
        COALESCE(SUM(estimated_hours), 0)::BIGINT as total_hours
    FROM geo_implementation_iterations;
END;
$$ LANGUAGE plpgsql;

-- Function to search iterations
CREATE OR REPLACE FUNCTION search_iterations(search_term TEXT)
RETURNS SETOF geo_implementation_iterations AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM geo_implementation_iterations
    WHERE 
        title ILIKE '%' || search_term || '%'
        OR description ILIKE '%' || search_term || '%'
        OR tags @> ARRAY[search_term]
    ORDER BY priority, created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- Verification Queries
-- ----------------------------------------------------------------------------

-- Check all tables
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check all indexes
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Check row counts
SELECT 
    'geo_implementation_iterations' as table_name, 
    COUNT(*) as row_count 
FROM geo_implementation_iterations
UNION ALL
SELECT 
    'articles' as table_name, 
    COUNT(*) as row_count 
FROM articles
UNION ALL
SELECT 
    'tech_iterations' as table_name, 
    COUNT(*) as row_count 
FROM tech_iterations;

-- Test the stats function
SELECT * FROM get_iteration_stats();
