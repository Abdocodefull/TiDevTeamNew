import { supabase, supabaseConfig, getSupabaseSetupMessage } from "./supabase-config"

export interface Project {
  id?: string
  title: string
  description: string
  project_type: string
  client_name: string
  client_email: string
  client_phone?: string
  timeline?: string
  project_link?: string
  image_links?: string | null
  created_at?: string
}

// Helper function to check if Supabase is ready
function ensureSupabaseReady() {
  if (!supabase) {
    const setupMessage = getSupabaseSetupMessage()
    throw new Error(
      setupMessage ? `${setupMessage.title}: ${setupMessage.message}` : "Supabase is not configured properly",
    )
  }
  return supabase
}

export async function createProject(projectData: Omit<Project, "id" | "created_at">) {
  try {
    const client = ensureSupabaseReady()

    // Clean and format the data
    const cleanData = {
      title: projectData.title.trim(),
      description: projectData.description.trim(),
      project_type: projectData.project_type,
      client_name: projectData.client_name.trim(),
      client_email: projectData.client_email.trim(),
      client_phone: projectData.client_phone?.trim() || null,
      timeline: projectData.timeline?.trim() || null,
      project_link: projectData.project_link?.trim() || null,
      image_links: projectData.image_links?.trim() || null,
    }

    console.log("🚀 Creating project with data:", cleanData)

    const { data, error } = await client.from("projects").insert([cleanData]).select().single()

    if (error) {
      console.error("❌ Supabase error:", error)

      // Provide helpful error messages
      if (error.code === "PGRST116") {
        throw new Error("Projects table does not exist. Please run the database setup scripts first.")
      } else if (error.code === "42P01") {
        throw new Error("Database table not found. Please check your Supabase setup.")
      } else if (error.message.includes("JWT")) {
        throw new Error("Authentication error. Please check your Supabase keys.")
      }

      throw new Error(`Database error: ${error.message}`)
    }

    console.log("✅ Project created successfully:", data)
    return data
  } catch (error) {
    console.error("❌ Error creating project:", error)
    throw error
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    // If Supabase is not configured, return empty array instead of throwing
    if (!supabase) {
      console.warn("⚠️ Supabase not configured, returning empty projects array")
      return []
    }

    console.log("📡 Fetching projects...")

    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Supabase error:", error)

      // Provide helpful error messages
      if (error.code === "PGRST116") {
        console.warn("⚠️ Projects table does not exist yet. This is normal for a new setup.")
        return []
      }

      throw new Error(`Database error: ${error.message}`)
    }

    console.log("📊 Fetched projects:", data)
    console.log(
      "🖼️ Projects with images:",
      data?.filter((p) => p.image_links),
    )

    return data || []
  } catch (error) {
    console.error("❌ Error fetching projects:", error)
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    // If Supabase is not configured, return null
    if (!supabase) {
      console.warn("⚠️ Supabase not configured, cannot fetch project")
      return null
    }

    console.log("🔍 Fetching project:", id)

    const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

    if (error) {
      console.error("❌ Supabase error:", error)
      return null
    }

    console.log("📄 Fetched project:", data)
    return data
  } catch (error) {
    console.error("❌ Error fetching project:", error)
    return null
  }
}

// Real-time subscription for projects
export function subscribeToProjects(callback: (projects: Project[]) => void) {
  if (!supabase) {
    console.warn("⚠️ Supabase not configured, cannot set up real-time subscription")
    return () => {} // Return empty cleanup function
  }

  console.log("🔔 Setting up real-time subscription...")

  const subscription = supabase
    .channel("projects-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "projects",
      },
      (payload) => {
        console.log("🔄 Real-time update:", payload)
        // Refetch all projects when there's a change
        getProjects().then(callback).catch(console.error)
      },
    )
    .subscribe()

  return () => {
    console.log("🔕 Unsubscribing from real-time updates")
    subscription.unsubscribe()
  }
}

// Export the supabase client and config for direct use if needed
export { supabase, supabaseConfig }
