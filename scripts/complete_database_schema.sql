-- ============================================================================
-- StackMatrices Database Schema - Complete Table Structure
-- Generated: 2026-03-02
-- Project: Industry Monitor → Iteration Generation System
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table 1: geo_implementation_iterations
-- Purpose: Store auto-generated implementation requirements from industry monitoring
-- Used by: Other GEO/SEO projects to read and implement changes
-- ----------------------------------------------------------------------------

DROP TABLE IF EXISTS geo_implementation_iterations CASCADE;

CREATE TABLE geo_implementation_iterations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Core identification
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Algorithm', 'Technical', 'Content', 'Strategy')),
    priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN ('backlog', 'planned', 'in_progress', 'completed', 'cancelled')),
    
    -- Effort tracking
    estimated_hours INTEGER CHECK (estimated_hours >= 0),
    actual_hours INTEGER CHECK (actual_hours >= 0),
    
    -- Categorization and tagging
    tags TEXT[] DEFAULT '{}',
    affects TEXT[] DEFAULT '{}', -- Values: medical, local, ecommerce, technical_seo, content_strategy, ai_optimization, all
    
    -- Source tracking (for traceability)
    source_type TEXT CHECK (source_type IN ('algorithm_update', 'breaking_change', 'feature_release', 'best_practice', 'manual')),
    source_url TEXT,
    source_title TEXT,
    source_publish_date TIMESTAMP WITH TIME ZONE,
    
    -- Implementation details
    acceptance_criteria TEXT[] DEFAULT '{}',
    implementation_steps TEXT[] DEFAULT '{}',
    technical_notes TEXT,
    risk_level TEXT CHECK (risk_level IN ('critical', 'high', 'medium', 'low')),
    dependencies TEXT[] DEFAULT '{}',
    
    -- Project management
    assigned_to TEXT,
    project TEXT DEFAULT 'GEO_SEO_Implementation',
    
    -- Timeline tracking
    due_date DATE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_geo_iterations_status ON geo_implementation_iterations(status);
CREATE INDEX idx_geo_iterations_priority ON geo_implementation_iterations(priority);
CREATE INDEX idx_geo_iterations_category ON geo_implementation_iterations(category);
CREATE INDEX idx_geo_iterations_source_type ON geo_implementation_iterations(source_type);
CREATE INDEX idx_geo_iterations_project ON geo_implementation_iterations(project);
CREATE INDEX idx_geo_iterations_created_at ON geo_implementation_iterations(created_at DESC);
CREATE INDEX idx_geo_iterations_affects ON geo_implementation_iterations USING GIN(affects);
CREATE INDEX idx_geo_iterations_tags ON geo_implementation_iterations USING GIN(tags);

-- Composite index for common filtered queries
CREATE INDEX idx_geo_iterations_priority_status ON geo_implementation_iterations(priority, status);

-- Enable Row Level Security
ALTER TABLE geo_implementation_iterations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON geo_implementation_iterations
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage" ON geo_implementation_iterations
    FOR ALL USING (auth.role() = 'authenticated');

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_geo_iterations_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_geo_iterations_updated_at ON geo_implementation_iterations;
CREATE TRIGGER update_geo_iterations_updated_at
    BEFORE UPDATE ON geo_implementation_iterations
    FOR EACH ROW EXECUTE FUNCTION update_geo_iterations_timestamp();

-- ----------------------------------------------------------------------------
-- Table 2: articles (for technical blog posts)
-- Purpose: Store blog articles - currently used for reference
-- Note: Blog remains static pages, this is for future dynamic use
-- ----------------------------------------------------------------------------

DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
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

-- Indexes
CREATE INDEX idx_articles_published ON articles(published);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_featured ON articles(featured);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);

-- Trigger
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_geo_iterations_timestamp();

-- ----------------------------------------------------------------------------
-- Table 3: tech_iterations (for StackMatrices internal tech debt)
-- Purpose: Track internal technical improvements and refactoring
-- ----------------------------------------------------------------------------

DROP TABLE IF EXISTS tech_iterations CASCADE;

CREATE TABLE tech_iterations (
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

-- Indexes
CREATE INDEX idx_tech_iterations_status ON tech_iterations(status);
CREATE INDEX idx_tech_iterations_priority ON tech_iterations(priority);
CREATE INDEX idx_tech_iterations_project ON tech_iterations(project);

-- Trigger
DROP TRIGGER IF EXISTS update_tech_iterations_updated_at ON tech_iterations;
CREATE TRIGGER update_tech_iterations_updated_at
    BEFORE UPDATE ON tech_iterations
    FOR EACH ROW EXECUTE FUNCTION update_geo_iterations_timestamp();

-- ----------------------------------------------------------------------------
-- Sample Data: geo_implementation_iterations
-- ----------------------------------------------------------------------------

INSERT INTO geo_implementation_iterations (
    title, description, category, priority, status,
    estimated_hours, tags, affects, source_type,
    acceptance_criteria, implementation_steps, risk_level, project
) VALUES 
(
    '[ALGORITHM] Google March 2024 Core Update Response',
    'Google released core algorithm update targeting low-quality content by 40%. Sites with AI-generated low-quality content may see ranking drops. Need to audit client sites for helpful content compliance and adjust GEO strategies.',
    'Algorithm',
    'critical',
    'backlog',
    16,
    ARRAY['google_update', 'core_algorithm', 'content_quality', 'helpful_content'],
    ARRAY['all', 'medical', 'content_strategy'],
    'algorithm_update',
    ARRAY[
        'All client sites audited for helpful content compliance',
        'Problematic content identified and remediation plan created',
        'Changes implemented within 2 weeks',
        'No ranking drops observed post-update',
        'Documentation and playbooks updated'
    ],
    ARRAY[
        'Monitor Google Search Central for detailed guidance',
        'Audit all client sites using helpful content checklist',
        'Identify pages with thin or AI-generated content',
        'Develop content improvement strategy per client',
        'Implement E-E-A-T enhancement protocols',
        'Update content guidelines and train team',
        'Monitor ranking changes for 2 weeks post-implementation'
    ],
    'critical',
    'GEO_SEO_Implementation'
),
(
    '[STRATEGY] AI Overview Optimization for Medical Queries',
    'Google SGE (Search Generative Experience) now shows AI Overviews for 84% of health queries. Need to implement new optimization tactics for AI citation and visibility in AI-generated answers.',
    'Strategy',
    'high',
    'backlog',
    20,
    ARRAY['ai_overview', 'sge', 'citation_optimization', 'medical'],
    ARRAY['medical', 'healthcare', 'ai_optimization'],
    'feature_release',
    ARRAY[
        'AI Overview visibility tracking implemented',
        'Entity optimization playbook created',
        'Semantic schema markup deployed',
        'Team trained on new SGE tactics',
        'Pilot client shows 25%+ AI citation improvement'
    ],
    ARRAY[
        'Research current AI Overview display patterns',
        'Develop visibility tracking methodology',
        'Create entity optimization playbook',
        'Implement advanced semantic schema markup',
        'Train team on SGE optimization tactics',
        'Deploy to pilot medical clients',
        'Measure and iterate based on results'
    ],
    'high',
    'GEO_SEO_Implementation'
),
(
    '[TECHNICAL] Schema.org 2024 MedicalEntity Types Update',
    'Schema.org 2024 update introduces new MedicalEntity types and deprecates some legacy types. Update all client schema implementations to maintain compliance and AI visibility.',
    'Technical',
    'medium',
    'backlog',
    8,
    ARRAY['schema', 'markup', 'medical_entity', 'structured_data'],
    ARRAY['medical', 'technical_seo'],
    'breaking_change',
    ARRAY[
        'New MedicalEntity specifications reviewed',
        'Schema templates updated in codebase',
        'All existing implementations validated',
        'Updates deployed to all medical clients',
        'No validation errors in Google Rich Results Test'
    ],
    ARRAY[
        'Review new MedicalEntity specifications on Schema.org',
        'Identify deprecated types in current implementations',
        'Update schema templates with new types',
        'Validate existing implementations against new spec',
        'Create migration guide for team',
        'Deploy updates to all affected clients',
        'Run validation tests and fix errors'
    ],
    'medium',
    'GEO_SEO_Implementation'
);

-- ----------------------------------------------------------------------------
-- Sample Data: articles (technical blog posts)
-- ----------------------------------------------------------------------------

INSERT INTO articles (
    title, slug, category, author, read_time, excerpt, 
    cover_image, published, featured, tags
) VALUES
(
    'The Complete Guide to Medical Schema Markup for AI Visibility',
    'schema-markup-guide',
    'Implementation',
    'Sarah Kim',
    '18 min read',
    'Complete implementation guide for medical schema markup including Dentist, MedicalProcedure, Physician, and FAQ schemas.',
    'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg',
    true,
    false,
    ARRAY['schema', 'technical', 'implementation', 'medical']
),
(
    'How to Write AI-Optimized Content That Gets Cited by ChatGPT',
    'ai-optimized-content',
    'Content Strategy',
    'Sarah Kim',
    '12 min read',
    'Learn the 5-paragraph framework for creating content that AI systems actively cite.',
    'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    true,
    false,
    ARRAY['content', 'ai', 'optimization', 'writing']
),
(
    '2026 Medical Marketing Predictions: The Year of AI-First Patient Acquisition',
    'predictions-2026',
    'Industry Trends',
    'Sarah Kim',
    '10 min read',
    '5 key predictions for medical marketing in 2026, backed by data from OpenAI, Google SGE, and Perplexity trends.',
    'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
    true,
    false,
    ARRAY['predictions', '2026', 'trends', 'ai']
);

-- ----------------------------------------------------------------------------
-- Useful Views
-- ----------------------------------------------------------------------------

-- View: Critical items needing immediate attention
CREATE OR REPLACE VIEW v_critical_iterations AS
SELECT 
    id,
    title,
    category,
    priority,
    estimated_hours,
    affects,
    source_type,
    created_at,
    EXTRACT(DAY FROM NOW() - created_at) as days_open
FROM geo_implementation_iterations
WHERE priority = 'critical' 
    AND status IN ('backlog', 'planned')
ORDER BY created_at;

-- View: Workload summary by project
CREATE OR REPLACE VIEW v_workload_summary AS
SELECT 
    project,
    status,
    priority,
    COUNT(*) as count,
    SUM(estimated_hours) as total_hours
FROM geo_implementation_iterations
GROUP BY project, status, priority
ORDER BY project, priority, status;

-- View: Recent changes (last 7 days)
CREATE OR REPLACE VIEW v_recent_changes AS
SELECT 
    id,
    title,
    category,
    priority,
    source_type,
    affects,
    created_at
FROM geo_implementation_iterations
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- ----------------------------------------------------------------------------
-- Verification
-- ----------------------------------------------------------------------------

SELECT 'Tables created successfully' as status;

SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
    AND table_name IN ('geo_implementation_iterations', 'articles', 'tech_iterations')
ORDER BY table_name;

SELECT 
    'geo_implementation_iterations' as table_name,
    COUNT(*) as total_rows,
    COUNT(*) FILTER (WHERE priority = 'critical') as critical,
    COUNT(*) FILTER (WHERE priority = 'high') as high,
    COUNT(*) FILTER (WHERE status = 'backlog') as backlog
FROM geo_implementation_iterations;
