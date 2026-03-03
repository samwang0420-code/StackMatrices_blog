-- ============================================================================
-- Contact Form Submissions Table
-- For tracking contact form submissions from the website
-- ============================================================================

DROP TABLE IF EXISTS contact_submissions CASCADE;

CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    ip_address TEXT,
    user_agent TEXT,
    source TEXT DEFAULT 'website', -- website, api, etc.
    notes TEXT, -- internal notes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public insert" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON contact_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_contact_submissions_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_contact_submissions_timestamp();

-- Sample data
INSERT INTO contact_submissions (name, email, subject, message, status)
VALUES 
(
    'John Smith',
    'john@example.com',
    'General Inquiry',
    'I would like to learn more about your GEO services for my dental practice.',
    'new'
),
(
    'Sarah Johnson',
    'sarah@example.com',
    'Service Question',
    'Do you offer services for plastic surgery practices in Beverly Hills?',
    'read'
);

-- Verify
SELECT 'contact_submissions table created' as status;
SELECT COUNT(*) as total_submissions FROM contact_submissions;
