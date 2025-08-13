"use client"

import type React from "react"

interface ProjectImageProps {
  src: string
  alt: string
  className?: string
  loading?: "lazy" | "eager"
  style?: React.CSSProperties
  onImageError?: () => void
}

export function ProjectImage({ src, alt, className = "", loading = "lazy", style, onImageError }: ProjectImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    const parent = target.parentElement
    if (parent) {
      parent.innerHTML = `
        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-green-100">
          <div class="text-center">
            <div class="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-2">
              <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-xs text-emerald-600">Image Preview</p>
          </div>
        </div>
      `
    }
    if (onImageError) {
      onImageError()
    }
  }

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.style.opacity = "1"
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      style={{ opacity: "0", transition: "opacity 0.3s", ...style }}
    />
  )
}
