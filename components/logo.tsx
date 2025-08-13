import { Code } from "lucide-react"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Code className="h-8 w-8 text-emerald-600" />
        <div className="absolute inset-0 h-8 w-8 bg-gradient-to-br from-emerald-400 to-green-600 opacity-20 rounded-sm blur-sm"></div>
      </div>
      {showText && (
        <span className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 bg-clip-text text-transparent">
            Ti
          </span>
          <span className="text-gray-900">DevTeam</span>
        </span>
      )}
    </div>
  )
}
