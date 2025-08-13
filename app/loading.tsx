import { Logo } from "@/components/logo"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Logo className="mx-auto" />
        </div>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-400 rounded-full animate-spin mx-auto"
            style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
          ></div>
        </div>
        <p className="text-gray-600 text-lg font-medium">Loading TiDevTeam...</p>
        <p className="text-gray-500 text-sm mt-2">Preparing your experience</p>
      </div>
    </div>
  )
}
