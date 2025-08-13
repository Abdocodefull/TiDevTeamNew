import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/supabase-client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tidevteam.com"

  // Get all projects for dynamic routes
  const projects = await getProjects()

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/all-projects`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]

  // Dynamic project routes
  const projectRoutes =
    projects?.map((project) => ({
      url: `${baseUrl}/project/${project.id}`,
      lastModified: new Date(project.created_at || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })) || []

  return [...staticRoutes, ...projectRoutes]
}
