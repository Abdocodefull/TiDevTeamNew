-- Verify the image_links column exists and has the correct type
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

-- Test insert to verify the column works
INSERT INTO projects (title, description, project_type, client_name, client_email, image_links)
VALUES ('Test Project', 'Test Description', 'website', 'Test Client', 'test@example.com', 'https://example.com/image1.jpg, https://example.com/image2.jpg')
ON CONFLICT DO NOTHING;

-- Verify the test data
SELECT id, title, image_links FROM projects WHERE title = 'Test Project';
