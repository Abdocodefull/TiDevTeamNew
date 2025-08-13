-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_type VARCHAR(100) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  budget DECIMAL(10,2),
  timeline VARCHAR(255),
  requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Create an index on project_type for filtering
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In production, you should restrict this based on your authentication needs
CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true);
