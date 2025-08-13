-- Remove budget and requirements columns, add project_link column
ALTER TABLE projects 
DROP COLUMN IF EXISTS budget,
DROP COLUMN IF EXISTS requirements,
ADD COLUMN IF NOT EXISTS project_link VARCHAR(500);

-- Update the table comment
COMMENT ON TABLE projects IS 'Client projects with contact information and project links';
COMMENT ON COLUMN projects.project_link IS 'Optional URL link to the project or related resources';
