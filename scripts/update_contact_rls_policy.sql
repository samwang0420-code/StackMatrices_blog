-- Update RLS policy for contact_submissions to allow anonymous inserts
-- This is needed because the form submits directly from the frontend

-- Drop existing insert policy if exists
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;

-- Create new policy that allows anyone to insert
-- Note: This is safe because we're only allowing INSERT, not SELECT/UPDATE/DELETE
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
    FOR INSERT 
    WITH CHECK (true);

-- Verify the policy
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'contact_submissions';

-- Test insert (optional, remove in production)
-- INSERT INTO contact_submissions (name, email, subject, message) 
-- VALUES ('Test User', 'test@example.com', 'Test', 'Testing anonymous insert');
