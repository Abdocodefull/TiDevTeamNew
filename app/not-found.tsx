import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Logo showText={false} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <CardDescription className="text-emerald-100">
            The page you're looking for doesn't exist or may have been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text mb-6">
            404
          </div>
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/all-projects">
              <Button
                variant="outline"
                className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                View Projects
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
