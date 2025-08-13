-- Add image_links column to the projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS image_links TEXT;

-- Update the table comment
COMMENT ON COLUMN projects.image_links IS 'Comma-separated URLs of project images for showcase';

-- Create an index for better performance when filtering projects with images
CREATE INDEX IF NOT EXISTS idx_projects_with_images ON projects(image_links) WHERE image_links IS NOT NULL AND image_links != '';
