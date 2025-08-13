"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, Database } from "lucide-react"
import { supabaseConfig, getSupabaseSetupMessage } from "@/lib/supabase-config"

export function SupabaseSetupNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [setupMessage, setSetupMessage] = useState<ReturnType<typeof getSupabaseSetupMessage>>(null)

  useEffect(() => {
    // Only show the notice if Supabase is not configured
    if (!supabaseConfig.isConfigured) {
      setSetupMessage(getSupabaseSetupMessage())
      setIsVisible(true)
    }
  }, [])

  if (!isVisible || !setupMessage) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <Card className="border-orange-200 bg-orange-50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800 text-sm">{setupMessage.title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-orange-600 hover:text-orange-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-orange-700 text-sm mb-3">{setupMessage.message}</CardDescription>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
              onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
            >
              <Database className="h-3 w-3 mr-1" />
              Setup Supabase
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-orange-600 hover:text-orange-800"
              onClick={() => setIsVisible(false)}
            >
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
