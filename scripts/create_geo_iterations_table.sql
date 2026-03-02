-- Create geo_implementation_iterations table
-- For tracking SEO/GEO implementation tasks across projects

CREATE TABLE IF NOT EXISTS geo_implementation_iterations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Core fields
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- Algorithm|Technical|Content|Strategy
    priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status TEXT NOT NULL DEFAULT 'backlog' CHECK (status IN ('backlog', 'planned', 'in_progress', 'completed', 'cancelled')),
    
    -- Effort tracking
    estimated_hours INTEGER,
    actual_hours INTEGER,
    
    -- Categorization
    tags TEXT[] DEFAULT '{}',
    affects TEXT[] DEFAULT '{}', -- [medical, local, ecommerce, all]
    
    -- Source tracking
    source_type TEXT, -- google_update|openai_announcement|industry_trend|manual
    source_url TEXT,
    source_title TEXT,
    
    -- Implementation details
    acceptance_criteria TEXT[] DEFAULT '{}',
    implementation_steps TEXT[] DEFAULT '{}',
    technical_notes TEXT,
    
    -- Assignment
    assigned_to TEXT,
    project TEXT DEFAULT 'GEO_SEO_Implementation',
    
    -- Timeline
    due_date DATE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_geo_iterations_status ON geo_implementation_iterations(status);
CREATE INDEX IF NOT EXISTS idx_geo_iterations_priority ON geo_implementation_iterations(priority);
CREATE INDEX IF NOT EXISTS idx_geo_iterations_category ON geo_implementation_iterations(category);
CREATE INDEX IF NOT EXISTS idx_geo_iterations_source ON geo_implementation_iterations(source_type);
CREATE INDEX IF NOT EXISTS idx_geo_iterations_project ON geo_implementation_iterations(project);

-- Enable RLS
ALTER TABLE geo_implementation_iterations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON geo_implementation_iterations
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write" ON geo_implementation_iterations
    FOR ALL USING (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_geo_iterations_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_geo_iterations_updated_at ON geo_implementation_iterations;
CREATE TRIGGER update_geo_iterations_updated_at
    BEFORE UPDATE ON geo_implementation_iterations
    FOR EACH ROW EXECUTE FUNCTION update_geo_iterations_timestamp();

-- Sample data: Manual insert example
INSERT INTO geo_implementation_iterations (
    title, description, category, priority, status, 
    estimated_hours, tags, affects, source_type,
    acceptance_criteria, project
) VALUES 
(
    'Google March 2024 Core Update Response',
    'Google released core algorithm update targeting low-quality content. Need to audit client sites for helpful content compliance and adjust GEO strategies.',
    'Algorithm',
    'critical',
    'planned',
    16,
    ARRAY['google_update', 'core_algorithm', 'content_quality'],
    ARRAY['all'],
    'google_update',
    ARRAY[
        'Audit all client sites for helpful content compliance',
        'Update content guidelines documentation',
        'Implement E-E-A-T enhancement protocols',
        'Monitor ranking changes for 2 weeks'
    ],
    'GEO_SEO_Implementation'
),
(
    'AI Overview Optimization Strategy',
    'Google SGE (Search Generative Experience) now shows AI Overviews for 84% of health queries. Implement new optimization tactics for AI citation.',
    'Strategy',
    'high',
    'backlog',
    20,
    ARRAY['ai_overview', 'sge', 'citation_optimization'],
    ARRAY['medical', 'healthcare'],
    'google_update',
    ARRAY[
        'Develop AI Overview visibility tracking',
        'Create entity optimization playbook',
        'Implement semantic schema markup',
        'Train team on new SGE tactics'
    ],
    'GEO_SEO_Implementation'
),
(
    'Schema.org MedicalEntity Update',
    'Schema.org 2024 update introduces new MedicalEntity types. Update all client schema implementations.',
    'Technical',
    'medium',
    'backlog',
    8,
    ARRAY['schema', 'markup', 'medical_entity'],
    ARRAY['medical'],
    'industry_trend',
    ARRAY[
        'Review new MedicalEntity specifications',
        'Update schema templates',
        'Validate existing implementations',
        'Deploy updates to all clients'
    ],
    'GEO_SEO_Implementation'
);

-- Verify
SELECT COUNT(*) as total_iterations FROM geo_implementation_iterations;
