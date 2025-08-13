-- First, let's check what's actually in the database
SELECT id, title, image_links, created_at 
FROM projects 
ORDER BY created_at DESC 
LIMIT 5;

-- Check the column structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'projects' AND column_name = 'image_links';

-- If the column doesn't exist, create it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'image_links'
    ) THEN
        ALTER TABLE projects ADD COLUMN image_links TEXT;
        COMMENT ON COLUMN projects.image_links IS 'Comma-separated URLs of project images for showcase';
    END IF;
END $$;

-- Clean up any test data
DELETE FROM projects WHERE title = 'Test Project';

-- Insert a test project with images to verify it works
INSERT INTO projects (title, description, project_type, client_name, client_email, image_links)
VALUES (
    'Test Project with Images', 
    'This is a test project to verify image functionality', 
    'website', 
    'Test Client', 
    'test@example.com', 
    'https://picsum.photos/400/300?random=1, https://picsum.photos/400/300?random=2, https://picsum.photos/400/300?random=3'
);

-- Verify the test data was inserted correctly
SELECT id, title, image_links FROM projects WHERE title = 'Test Project with Images';
