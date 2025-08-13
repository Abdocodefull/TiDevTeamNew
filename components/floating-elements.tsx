"use client"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div
        className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-30 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-3 h-3 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-25 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "3.5s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-5 h-5 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
      ></div>

      {/* Floating lines */}
      <div className="absolute top-1/4 left-1/4 w-20 h-0.5 bg-gradient-to-r from-emerald-300 to-transparent opacity-30 rotate-45 animate-pulse"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-16 h-0.5 bg-gradient-to-r from-green-300 to-transparent opacity-25 -rotate-45 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )
}
