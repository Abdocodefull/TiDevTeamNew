#!/usr/bin/env tsx

/**
 * Supabase Setup Script for TiDevTeam Website
 *
 * This script helps you set up your Supabase project and environment variables.
 * Run with: npx tsx scripts/setup-supabase.ts
 */

import { createClient } from "@supabase/supabase-js"

const REQUIRED_ENV_VARS = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

function checkEnvironmentVariables() {
  console.log("🔍 Checking environment variables...\n")

  const missing = REQUIRED_ENV_VARS.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:")
    missing.forEach((varName) => {
      console.error(`   - ${varName}`)
    })
    console.error("\n📝 Please create a .env.local file with the following variables:")
    console.error("   Copy .env.local.example to .env.local and fill in your Supabase credentials\n")

    console.log("🚀 How to get your Supabase credentials:")
    console.log("   1. Go to https://supabase.com/dashboard")
    console.log("   2. Create a new project or select existing one")
    console.log("   3. Go to Settings > API")
    console.log("   4. Copy the Project URL and API keys")
    console.log("   5. Add them to your .env.local file\n")

    process.exit(1)
  }

  console.log("✅ All required environment variables are set!")
  return true
}

async function testSupabaseConnection() {
  console.log("🔗 Testing Supabase connection...\n")

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test connection by trying to fetch from a system table
    const { data, error } = await supabase.from("projects").select("count", { count: "exact", head: true })

    if (error && error.code !== "PGRST116") {
      // PGRST116 = table doesn't exist (which is fine)
      throw error
    }

    console.log("✅ Supabase connection successful!")
    console.log(`📊 Database URL: ${supabaseUrl}`)

    return true
  } catch (error) {
    console.error("❌ Supabase connection failed:")
    console.error(`   Error: ${error}`)
    console.error("\n🔧 Troubleshooting:")
    console.error("   1. Check your NEXT_PUBLIC_SUPABASE_URL is correct")
    console.error("   2. Check your NEXT_PUBLIC_SUPABASE_ANON_KEY is correct")
    console.error("   3. Make sure your Supabase project is active")
    console.error("   4. Check your internet connection\n")

    return false
  }
}

async function checkProjectsTable() {
  console.log("📋 Checking projects table...\n")

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase.from("projects").select("*").limit(1)

    if (error) {
      if (error.code === "PGRST116") {
        console.log("⚠️  Projects table does not exist yet")
        console.log("📝 You need to run the database setup scripts:")
        console.log("   1. Go to your Supabase dashboard")
        console.log("   2. Open the SQL Editor")
        console.log("   3. Run the scripts from the scripts/ folder")
        console.log("   4. Or use the admin panel to create your first project\n")
        return false
      }
      throw error
    }

    console.log("✅ Projects table exists and is accessible!")
    console.log(`📊 Found ${data?.length || 0} projects in the database`)

    return true
  } catch (error) {
    console.error("❌ Error checking projects table:")
    console.error(`   Error: ${error}`)
    return false
  }
}

async function main() {
  console.log("🚀 TiDevTeam Supabase Setup\n")
  console.log("=".repeat(50) + "\n")

  // Check environment variables
  if (!checkEnvironmentVariables()) {
    return
  }

  // Test connection
  const connectionOk = await testSupabaseConnection()
  if (!connectionOk) {
    return
  }

  console.log("")

  // Check projects table
  const tableOk = await checkProjectsTable()

  console.log("")
  console.log("=".repeat(50))

  if (connectionOk && tableOk) {
    console.log("🎉 Supabase setup is complete!")
    console.log("✅ Your TiDevTeam website is ready to use!")
  } else if (connectionOk) {
    console.log("⚠️  Supabase connection works, but database setup is needed")
    console.log("📝 Next steps:")
    console.log("   1. Run the database setup scripts")
    console.log("   2. Create your first project via the admin panel")
  }

  console.log("\n🔗 Useful links:")
  console.log(`   - Supabase Dashboard: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("/rest/v1", "")}/dashboard`)
  console.log("   - Admin Panel: http://localhost:3000/projects")
  console.log("   - Documentation: https://supabase.com/docs")
}

// Run the setup
main().catch(console.error)
