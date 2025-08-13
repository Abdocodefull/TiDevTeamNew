"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User, ArrowRight, ImageIcon } from "lucide-react"
import { getProjects } from "@/lib/supabase-client"
import Link from "next/link"
import { ProjectImage } from "@/components/project-image"

interface Project {
  id: string
  title: string
  description: string
  project_type: string
  client_name: string
  client_email: string
  created_at: string
  project_link?: string
  image_links?: string
}

export function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        console.log("Fetched projects:", data) // Debug log
        console.log(
          "Projects with images:",
          data?.filter((p) => p.image_links),
        ) // Debug log
        // Show only the latest 6 projects
        setProjects((data || []).slice(0, 6))
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const getProjectImages = (imageLinks?: string | null) => {
    console.log("Processing image links:", imageLinks) // Debug log

    if (!imageLinks || imageLinks.trim() === "") return []

    const images = imageLinks
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0)
      .slice(0, 5) // Limit to 5 images

    console.log("Processed images:", images) // Debug log
    return images
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-80 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl"></div>
          </div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ExternalLink className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Projects Yet</h3>
        <p className="text-gray-600 mb-8">We're working on amazing projects that will be showcased here soon!</p>
        <Link href="#contact">
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            Start Your Project
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const projectImages = getProjectImages(project.image_links)
          const hasImages = projectImages.length > 0
          const primaryImage = hasImages ? projectImages[0] : null

          return (
            <Card
              key={project.id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20 hover:scale-105 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Project Image */}
              {hasImages && primaryImage ? (
                <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100">
                  <ProjectImage
                    src={primaryImage}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {projectImages.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1 backdrop-blur-sm">
                      <ImageIcon className="h-3 w-3" />
                      <span>+{projectImages.length - 1}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="relative h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <ExternalLink className="h-8 w-8 text-emerald-600" />
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">{project.project_type}</p>
                  </div>
                </div>
              )}

              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 text-xs px-3 py-1"
                  >
                    {project.project_type}
                  </Badge>
                  <div className="text-xs text-gray-500 flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 flex items-center space-x-2">
                  <User className="h-3 w-3 text-emerald-500" />
                  <span>{project.client_name}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 relative z-10">
                <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>

                <div className="flex items-center justify-between">
                  <Link href={`/project/${project.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent group-hover:border-emerald-400 transition-all duration-300"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-2">
                    {hasImages && (
                      <div className="flex items-center space-x-1 text-emerald-600 text-xs bg-emerald-50 px-2 py-1 rounded-full">
                        <ImageIcon className="h-3 w-3" />
                        <span>{projectImages.length}</span>
                      </div>
                    )}
                    {project.project_link && (
                      <a
                        href={project.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors p-1 hover:bg-emerald-50 rounded-full"
                        title="Visit project"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {projects.length > 0 && (
        <div className="text-center">
          <Link href="/all-projects">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
