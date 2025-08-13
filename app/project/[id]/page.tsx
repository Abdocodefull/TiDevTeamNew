import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Mail, Phone, ExternalLink } from "lucide-react"
import { getProject } from "@/lib/supabase-server"
import { Logo } from "@/components/logo"
import { ProjectImage } from "@/components/project-image"

interface ProjectPageProps {
  params: {
    id: string
  }
}

const getProjectImages = (imageLinks?: string | null) => {
  if (!imageLinks || imageLinks.trim() === "") return []

  return imageLinks
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
    .slice(0, 5) // Limit to 5 images
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  const projectImages = getProjectImages(project.image_links)
  const hasImages = projectImages.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/projects"
              className="flex items-center space-x-3 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <Logo />
            </Link>
          </div>
          <Badge
            variant="outline"
            className="text-sm bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200"
          >
            Project Details
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl p-8">
              <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
              <CardDescription className="text-emerald-100 text-lg">Project ID: {project.id}</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              {/* Project Images Section */}
              {hasImages && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg"></div>
                    <span>Project Images ({projectImages.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                          <ProjectImage
                            src={imageUrl}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-12">
                {/* Project Details */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg"></div>
                      <span>Project Information</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Calendar className="h-5 w-5 text-emerald-500" />
                        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 text-sm px-3 py-1"
                        >
                          {project.project_type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  {project.project_link && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Project Link</h4>
                      <a
                        href={project.project_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all duration-300 border border-emerald-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="break-all">Visit Project</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Client Information */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg"></div>
                      <span>Client Information</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-emerald-500" />
                        <span className="text-gray-900 font-medium">{project.client_name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-emerald-500" />
                        <span className="text-gray-600">{project.client_email}</span>
                      </div>
                      {project.client_phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-emerald-500" />
                          <span className="text-gray-600">{project.client_phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {project.timeline && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Timeline</h4>
                      <p className="text-gray-600 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-200">
                        {project.timeline}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-emerald-100">
                <div className="flex justify-center">
                  <Link href="/all-projects">
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      View All Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
