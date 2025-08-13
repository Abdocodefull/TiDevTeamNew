"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-t-xl">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Something went wrong!</CardTitle>
          <CardDescription className="text-red-100">
            We encountered an unexpected error. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <Logo className="mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              Don't worry, our team has been notified and we're working to fix this issue.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
