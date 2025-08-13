import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialProps {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export function TestimonialCard({ name, role, company, content, rating, avatar }: TestimonialProps) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20 hover:scale-105 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardContent className="p-8 relative z-10">
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed italic">"{content}"</p>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {avatar}
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">
              {role} at {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
