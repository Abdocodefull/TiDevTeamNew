import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User, ArrowRight, ImageIcon, Home } from "lucide-react"
import { getProjects } from "@/lib/supabase-client"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { ProjectImage } from "@/components/project-image"

const getProjectImages = (imageLinks?: string | null) => {
  if (!imageLinks || imageLinks.trim() === "") return []

  return imageLinks
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
    .slice(0, 5)
}

export default async function AllProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#services"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/all-projects" className="text-emerald-600 font-medium relative">
              Projects
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500"></span>
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          <Link href="/#contact">
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200 to-emerald-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 rounded-full mb-8 border border-emerald-200 shadow-lg backdrop-blur-sm">
            <ExternalLink className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Our Portfolio</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            <span className="text-gray-900">Our</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 bg-clip-text text-transparent">
              Project Portfolio
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of successful projects. From innovative web applications to
            cutting-edge mobile solutions, discover how we've helped businesses transform their digital presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/#contact">
              <Button
                size="lg"
                className="text-lg px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-2xl"
              >
                Start Your Project
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-5 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          {projects && projects.length > 0 ? (
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  All Projects
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {" "}
                    ({projects.length})
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Browse through our complete portfolio of successful projects and client collaborations
                </p>
              </div>

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
                            <span>{new Date(project.created_at!).toLocaleDateString()}</span>
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
                              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Projects Available</h3>
              <p className="text-gray-600 mb-8 text-lg">
                We're working on amazing projects that will be showcased here soon!
              </p>
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Your Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-green-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ready to Start
            <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              {" "}
              Your Project?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our growing list of satisfied clients and let us bring your vision to life with cutting-edge technology
            and innovative design.
          </p>
          <Link href="/#contact">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-2xl"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Logo className="mb-6" />
              <p className="text-gray-400 leading-relaxed mb-6">
                Professional software solutions for modern businesses. We turn your innovative ideas into powerful
                digital realities.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-6 text-xl">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-emerald-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-emerald-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/all-projects" className="hover:text-emerald-400 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-emerald-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-6 text-xl">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>tidevteam@gmail.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Professional Support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>24/7 Availability</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TiDevTeam. All rights reserved. Crafted with passion and innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
