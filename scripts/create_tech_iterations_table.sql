-- Create tech_iterations table for project roadmap management
-- Other projects can read from this to drive their development

CREATE TABLE IF NOT EXISTS tech_iterations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status TEXT NOT NULL CHECK (status IN ('backlog', 'planned', 'in_progress', 'completed', 'cancelled')),
    estimated_hours INTEGER,
    actual_hours INTEGER,
    tags TEXT[] DEFAULT '{}',
    acceptance_criteria TEXT[] DEFAULT '{}',
    technical_notes TEXT,
    assigned_to TEXT,
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    project TEXT DEFAULT 'StackMatrices'
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_tech_iterations_status ON tech_iterations(status);
CREATE INDEX IF NOT EXISTS idx_tech_iterations_priority ON tech_iterations(priority);
CREATE INDEX IF NOT EXISTS idx_tech_iterations_category ON tech_iterations(category);
CREATE INDEX IF NOT EXISTS idx_tech_iterations_project ON tech_iterations(project);

-- Enable RLS
ALTER TABLE tech_iterations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access" ON tech_iterations
    FOR SELECT USING (true);

-- Authenticated users can manage
CREATE POLICY "Allow authenticated users to manage" ON tech_iterations
    FOR ALL USING (auth.role() = 'authenticated');

-- Verify creation
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'tech_iterations'
ORDER BY ordinal_position;
