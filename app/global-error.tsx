"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
          <Card className="w-full max-w-md text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-t-xl">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Application Error</CardTitle>
              <CardDescription className="text-red-100">Something went wrong with the application.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Button
                onClick={reset}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
