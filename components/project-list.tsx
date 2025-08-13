"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Calendar, User, Copy, Check, ImageIcon, RefreshCw } from "lucide-react"
import { getProjects, subscribeToProjects, type Project } from "@/lib/supabase-client"

const getProjectImages = (imageLinks?: string | null) => {
  if (!imageLinks || imageLinks.trim() === "") return []

  return imageLinks
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
    .slice(0, 5)
}

interface ProjectListProps {
  refreshTrigger?: number
}

export function ProjectList({ refreshTrigger }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()

    // Set up real-time subscription
    const unsubscribe = subscribeToProjects((updatedProjects) => {
      console.log("🔄 Real-time update received")
      setProjects(updatedProjects)
    })

    return unsubscribe
  }, [])

  // Refresh when parent component triggers it
  useEffect(() => {
    if (refreshTrigger) {
      fetchProjects()
    }
  }, [refreshTrigger])

  const copyProjectLink = async (projectId: string) => {
    const link = `${window.location.origin}/project/${projectId}`
    await navigator.clipboard.writeText(link)
    setCopiedId(projectId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Loading Projects...</h3>
          <RefreshCw className="h-5 w-5 animate-spin text-emerald-600" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl"></div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ExternalLink className="h-8 w-8 text-white" />
        </div>
        <p className="text-gray-500 mb-2 text-lg font-medium">No projects found</p>
        <p className="text-sm text-gray-400">Create your first project to get started</p>
        <Button onClick={fetchProjects} variant="outline" className="mt-4 bg-transparent">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">All Projects ({projects.length})</h3>
        <Button onClick={fetchProjects} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {projects.map((project) => {
        const projectImages = getProjectImages(project.image_links)
        const hasImages = projectImages.length > 0

        return (
          <Card
            key={project.id}
            className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50/30 hover:scale-[1.02] overflow-hidden"
          >
            <div className="flex">
              {/* Image Preview */}
              {hasImages && projectImages[0] && (
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={projectImages[0] || "/placeholder.svg"}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-green-100">
                            <svg class="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        `
                      }
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-gray-900">{project.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-gray-600">
                        <span className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-emerald-500" />
                          <span>{project.client_name}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-emerald-500" />
                          <span>{new Date(project.created_at!).toLocaleDateString()}</span>
                        </span>
                      </CardDescription>
                      {hasImages && (
                        <div className="flex items-center space-x-2 text-emerald-600 text-sm">
                          <ImageIcon className="h-4 w-4" />
                          <span>
                            {projectImages.length} image{projectImages.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200"
                    >
                      {project.project_type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex items-center space-x-3">
                    <Link href={`/project/${project.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyProjectLink(project.id!)}
                      className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                    >
                      {copiedId === project.id ? (
                        <>
                          <Check className="h-3 w-3 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-2" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
