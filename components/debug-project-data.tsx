"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/supabase-client"

export function DebugProjectData() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(data || [])
      console.log("Debug - All projects:", data)
    } catch (error) {
      console.error("Debug - Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <Card className="mt-8 border-2 border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-800">Debug: Project Data</CardTitle>
        <Button onClick={fetchProjects} disabled={loading} size="sm">
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-red-700">Total projects: {projects.length}</p>
          <p className="text-sm text-red-700">
            Projects with images: {projects.filter((p) => p.image_links && p.image_links.trim() !== "").length}
          </p>

          {projects.slice(0, 3).map((project, index) => (
            <div key={project.id || index} className="bg-white p-3 rounded border">
              <p className="font-bold text-sm">{project.title}</p>
              <p className="text-xs text-gray-600">ID: {project.id}</p>
              <p className="text-xs text-gray-600">Type: {project.project_type}</p>
              <p className="text-xs text-gray-600">Image Links: {project.image_links || "None"}</p>
              <p className="text-xs text-gray-600">
                Image Count: {project.image_links ? project.image_links.split(",").length : 0}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
