-- Drop the problematic index
DROP INDEX IF EXISTS idx_projects_with_images;

-- Add image_links column to the projects table (if not exists)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS image_links TEXT;

-- Update the table comment
COMMENT ON COLUMN projects.image_links IS 'Comma-separated URLs of project images for showcase';

-- Create a simpler index that checks if the column has content (without indexing the full text)
CREATE INDEX IF NOT EXISTS idx_projects_has_images ON projects((CASE WHEN image_links IS NOT NULL AND image_links != '' THEN 1 ELSE 0 END));
