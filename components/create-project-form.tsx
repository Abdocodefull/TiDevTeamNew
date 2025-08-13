"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProject } from "@/lib/supabase-client"
import { AlertCircle, CheckCircle, ImageIcon, X, RefreshCw } from "lucide-react"

interface CreateProjectFormProps {
  onProjectCreated?: () => void
}

export function CreateProjectForm({ onProjectCreated }: CreateProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [currentImageUrl, setCurrentImageUrl] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_type: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    timeline: "",
    project_link: "",
  })

  const MAX_IMAGES = 5

  const isValidImageUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return (
        (urlObj.protocol === "http:" || urlObj.protocol === "https:") &&
        /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(urlObj.pathname + urlObj.search)
      )
    } catch {
      return false
    }
  }

  const addImageUrl = () => {
    const trimmedUrl = currentImageUrl.trim()
    if (!trimmedUrl) return

    if (!isValidImageUrl(trimmedUrl)) {
      setError("Please enter a valid image URL (jpg, jpeg, png, gif, webp, svg)")
      return
    }

    if (imageUrls.includes(trimmedUrl)) {
      setError("This image URL has already been added")
      return
    }

    if (imageUrls.length >= MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed per project`)
      return
    }

    setImageUrls([...imageUrls, trimmedUrl])
    setCurrentImageUrl("")
    setError("")
  }

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const addSampleImages = () => {
    const sampleImages = [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/400/300?random=2",
      "https://picsum.photos/400/300?random=3",
    ]
    setImageUrls(sampleImages)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Prepare the project data
      const projectData = {
        ...formData,
        image_links: imageUrls.length > 0 ? imageUrls.join(", ") : null,
      }

      console.log("📝 Form submission data:", projectData)
      console.log("🖼️ Image URLs being saved:", imageUrls)

      const project = await createProject(projectData)

      if (project) {
        setSuccess(`✅ Project created successfully! ${imageUrls.length} images added.`)
        console.log("🎉 Project created with ID:", project.id)

        // Reset form
        setFormData({
          title: "",
          description: "",
          project_type: "",
          client_name: "",
          client_email: "",
          client_phone: "",
          timeline: "",
          project_link: "",
        })
        setImageUrls([])
        setCurrentImageUrl("")

        // Notify parent component to refresh
        if (onProjectCreated) {
          onProjectCreated()
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess("")
        }, 3000)
      }
    } catch (error) {
      console.error("❌ Error creating project:", error)
      setError(error instanceof Error ? error.message : "Failed to create project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear messages when user starts typing
    if (error) setError("")
    if (success) setSuccess("")
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
            Project Title *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter project title"
            required
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="project_type" className="text-sm font-semibold text-gray-700">
            Project Type *
          </Label>
          <Select value={formData.project_type} onValueChange={(value) => handleInputChange("project_type", value)}>
            <SelectTrigger className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="mobile_app">Mobile App</SelectItem>
              <SelectItem value="web_app">Web Application</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="custom_software">Custom Software</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="client_name" className="text-sm font-semibold text-gray-700">
            Client Name *
          </Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => handleInputChange("client_name", e.target.value)}
            placeholder="Enter client name"
            required
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="client_email" className="text-sm font-semibold text-gray-700">
            Client Email *
          </Label>
          <Input
            id="client_email"
            type="email"
            value={formData.client_email}
            onChange={(e) => handleInputChange("client_email", e.target.value)}
            placeholder="client@example.com"
            required
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="client_phone" className="text-sm font-semibold text-gray-700">
            Client Phone
          </Label>
          <Input
            id="client_phone"
            type="tel"
            value={formData.client_phone}
            onChange={(e) => handleInputChange("client_phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700">
            Timeline
          </Label>
          <Input
            id="timeline"
            value={formData.timeline}
            onChange={(e) => handleInputChange("timeline", e.target.value)}
            placeholder="e.g., 3 months"
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="project_link" className="text-sm font-semibold text-gray-700">
            Project Link
          </Label>
          <Input
            id="project_link"
            type="url"
            value={formData.project_link}
            onChange={(e) => handleInputChange("project_link", e.target.value)}
            placeholder="https://example.com/project"
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Image URLs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-gray-700">Project Images (Max {MAX_IMAGES})</Label>
            <Button
              type="button"
              onClick={addSampleImages}
              variant="outline"
              size="sm"
              className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              Add Sample Images
            </Button>
          </div>

          {/* Add Image URL Input */}
          <div className="flex space-x-2">
            <Input
              value={currentImageUrl}
              onChange={(e) => setCurrentImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addImageUrl()
                }
              }}
            />
            <Button
              type="button"
              onClick={addImageUrl}
              disabled={imageUrls.length >= MAX_IMAGES}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 rounded-xl"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Preview List */}
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">
                {imageUrls.length}/{MAX_IMAGES} images added
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200"
                  >
                    {/* Image Preview */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-emerald-100">
                                <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            `
                          }
                        }}
                      />
                    </div>

                    {/* URL Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate" title={url}>
                        {url}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Add up to {MAX_IMAGES} image URLs for your project</p>
            <p>• Supported formats: JPG, JPEG, PNG, GIF, WebP, SVG</p>
            <p>• Press Enter or click the + button to add each URL</p>
            <p>• Use "Add Sample Images" for quick testing</p>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
            Description *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief project description"
            rows={3}
            required
            className="border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </form>
    </div>
  )
}
