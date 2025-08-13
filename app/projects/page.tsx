"use client"

import { Suspense, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { ProjectList } from "@/components/project-list"
import { CreateProjectForm } from "@/components/create-project-form"
import { AdminNav } from "@/components/admin-nav"
import { AdminAccess } from "@/components/admin-access"

export default function ProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("tidevteam_admin")
    setIsAuthenticated(authStatus === "authenticated")
    setLoading(false)
  }, [])

  const handleProjectCreated = () => {
    console.log("🎉 Project created, triggering refresh...")
    setRefreshTrigger((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminAccess onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* AdminNav */}
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Project Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span>Add New Project</span>
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Create and manage client projects with secure sharing links
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <CreateProjectForm onProjectCreated={handleProjectCreated} />
              </CardContent>
            </Card>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="text-xl">Project Management</CardTitle>
                <CardDescription className="text-green-100">View, manage and share all client projects</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense
                  fallback={
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading projects...</p>
                    </div>
                  }
                >
                  <ProjectList refreshTrigger={refreshTrigger} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
