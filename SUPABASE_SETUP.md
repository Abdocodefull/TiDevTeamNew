# 🚀 Supabase Setup Guide for TiDevTeam Website

This guide will help you set up Supabase for your TiDevTeam website.

## 📋 Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js installed on your machine

## 🔧 Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `tidevteam-website`
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

## 🔑 Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 📝 Step 3: Configure Environment Variables

1. In your project root, copy `.env.local.example` to `.env.local`:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

2. Edit `.env.local` and add your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   \`\`\`

## 🗄️ Step 4: Set Up the Database

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase dashboard
2. Click on **SQL Editor** in the sidebar
3. Click **New Query**
4. Copy and paste the contents of `scripts/create-projects-table.sql`
5. Click **Run** to execute the script
6. Repeat for other SQL files in the `scripts/` folder

### Option B: Using the Setup Script

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the setup script:
   \`\`\`bash
   npx tsx scripts/setup-supabase.ts
   \`\`\`

## ✅ Step 5: Verify Your Setup

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Open http://localhost:3000
3. The website should load without errors
4. Go to http://localhost:3000/projects (use password: `tidevteam2024`)
5. Try creating a test project

## 🔍 Troubleshooting

### Error: "supabaseUrl is required"
- Check that `NEXT_PUBLIC_SUPABASE_URL` is set in your `.env.local` file
- Make sure the URL is correct and includes `https://`
- Restart your development server after adding environment variables

### Error: "Invalid API key"
- Verify your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Make sure you copied the **anon public** key, not the service role key
- Check for any extra spaces or characters

### Error: "Projects table does not exist"
- Run the database setup scripts in your Supabase SQL Editor
- Make sure the `projects` table was created successfully
- Check the **Table Editor** in your Supabase dashboard

### Error: "JWT expired" or authentication issues
- Verify your `SUPABASE_SERVICE_ROLE_KEY` is correct
- Make sure you're using the **service_role** key for server operations
- Check that your Supabase project is active and not paused

## 🔒 Security Notes

- **Never commit** your `.env.local` file to version control
- The **service_role** key has admin privileges - keep it secret!
- Use the **anon** key for client-side operations only
- In production, consider using Row Level Security (RLS) policies

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

## 🆘 Need Help?

If you're still having issues:

1. Check the browser console for error messages
2. Check the terminal/server logs for detailed errors
3. Verify all environment variables are set correctly
4. Make sure your Supabase project is active and not paused
5. Try creating a new Supabase project if issues persist

## 🚀 Production Deployment

For production deployment:

1. Set up environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Use the same Supabase project or create a separate production project
3. Make sure to set up proper database backups
4. Consider implementing Row Level Security policies
5. Monitor your Supabase usage and upgrade plan if needed
\`\`\`

Finally, let's create a simple diagnostic component to help with setup:
