"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface StatusCheck {
  name: string
  status: "checking" | "success" | "error" | "warning"
  message: string
  details?: string
}

export function SupabaseStatus() {
  const [checks, setChecks] = useState<StatusCheck[]>([
    { name: "Environment Variables", status: "checking", message: "Checking..." },
    { name: "Supabase Connection", status: "checking", message: "Checking..." },
    { name: "Projects Table", status: "checking", message: "Checking..." },
  ])

  const runChecks = async () => {
    const newChecks: StatusCheck[] = []

    // Check 1: Environment Variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (hasUrl && hasAnonKey) {
      newChecks.push({
        name: "Environment Variables",
        status: "success",
        message: "All required environment variables are set",
      })
    } else {
      newChecks.push({
        name: "Environment Variables",
        status: "error",
        message: "Missing required environment variables",
        details: `Missing: ${!hasUrl ? "NEXT_PUBLIC_SUPABASE_URL " : ""}${!hasAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : ""}`,
      })
    }

    // Check 2: Supabase Connection
    try {
      const { error } = await supabase.from("projects").select("count", { count: "exact", head: true })

      if (error && error.code !== "PGRST116") {
        throw error
      }

      newChecks.push({
        name: "Supabase Connection",
        status: "success",
        message: "Successfully connected to Supabase",
      })
    } catch (error: any) {
      newChecks.push({
        name: "Supabase Connection",
        status: "error",
        message: "Failed to connect to Supabase",
        details: error.message,
      })
    }

    // Check 3: Projects Table
    try {
      const { data, error } = await supabase.from("projects").select("*").limit(1)

      if (error) {
        if (error.code === "PGRST116") {
          newChecks.push({
            name: "Projects Table",
            status: "warning",
            message: "Projects table does not exist",
            details: "Run the database setup scripts to create the table",
          })
        } else {
          throw error
        }
      } else {
        newChecks.push({
          name: "Projects Table",
          status: "success",
          message: `Projects table exists with ${data?.length || 0} records`,
        })
      }
    } catch (error: any) {
      newChecks.push({
        name: "Projects Table",
        status: "error",
        message: "Error accessing projects table",
        details: error.message,
      })
    }

    setChecks(newChecks)
  }

  useEffect(() => {
    runChecks()
  }, [])

  const getStatusIcon = (status: StatusCheck["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
    }
  }

  const getStatusBadge = (status: StatusCheck["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Checking</Badge>
    }
  }

  const hasErrors = checks.some((check) => check.status === "error")
  const allSuccess = checks.every((check) => check.status === "success")

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Supabase Configuration Status</span>
          {allSuccess && <CheckCircle className="h-5 w-5 text-green-500" />}
          {hasErrors && <XCircle className="h-5 w-5 text-red-500" />}
        </CardTitle>
        <CardDescription>Checking your Supabase setup and database connection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
            {getStatusIcon(check.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900">{check.name}</h4>
                {getStatusBadge(check.status)}
              </div>
              <p className="text-sm text-gray-600">{check.message}</p>
              {check.details && (
                <p className="text-xs text-gray-500 mt-1 font-mono bg-gray-50 p-2 rounded">{check.details}</p>
              )}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button onClick={runChecks} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recheck Status
          </Button>
        </div>

        {hasErrors && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Setup Required</h4>
            <p className="text-sm text-red-700 mb-3">Please follow the setup guide to configure Supabase properly.</p>
            <div className="text-xs text-red-600 space-y-1">
              <p>1. Create a Supabase project at https://supabase.com</p>
              <p>2. Copy your API keys to .env.local</p>
              <p>3. Run the database setup scripts</p>
              <p>4. Restart your development server</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
