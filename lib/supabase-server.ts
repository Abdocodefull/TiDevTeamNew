import { supabaseAdmin, supabaseConfig, getSupabaseSetupMessage } from "./supabase-config"

// Helper function to ensure server client is ready
function ensureSupabaseServerReady() {
  if (!supabaseAdmin) {
    const setupMessage = getSupabaseSetupMessage()
    console.error("❌ Supabase server client not available:", setupMessage?.message || "Configuration missing")
    return null
  }
  return supabaseAdmin
}

export const supabaseServer = supabaseAdmin

export async function getProject(id: string) {
  try {
    const client = ensureSupabaseServerReady()
    if (!client) {
      console.warn("⚠️ Supabase server not configured, cannot fetch project")
      return null
    }

    const { data, error } = await client.from("projects").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching project:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Server error fetching project:", error)
    return null
  }
}

// Export configuration for debugging
export { supabaseConfig }
