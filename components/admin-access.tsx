"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, EyeOff } from "lucide-react"

interface AdminAccessProps {
  onAuthenticated: () => void
}

export function AdminAccess({ onAuthenticated }: AdminAccessProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Simple password check - in production, use proper authentication
  const ADMIN_PASSWORD = "tidevteam2024" // You can change this

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("tidevteam_admin", "authenticated")
      onAuthenticated()
    } else {
      setError("Invalid password. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription className="text-emerald-100">
            Enter your password to access the project management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Admin Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="pr-12 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-emerald-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-emerald-800 font-medium">
              <strong>Demo Password:</strong> tidevteam2024
            </p>
            <p className="text-xs text-emerald-600 mt-1">Change this in production for security</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
