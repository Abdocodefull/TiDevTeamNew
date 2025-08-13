import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Smartphone,
  Globe,
  Zap,
  Users,
  Shield,
  Sparkles,
  CheckCircle,
  Award,
  Target,
  Rocket,
  Code2,
  Database,
  Palette,
  TrendingUp,
  Clock,
  HeartHandshake,
  ExternalLink,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { FloatingElements } from "@/components/floating-elements"
import { AnimatedCounter } from "@/components/animated-counter"
import { TestimonialCard } from "@/components/testimonial-card"
import { ProjectShowcase } from "@/components/project-showcase"
import { StructuredData } from "@/components/structured-data"
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TiDevTeam - Professional Software Development & Web Solutions",
  description:
    "Transform your business with cutting-edge software solutions. We create modern websites, mobile apps, and custom software that drive growth and success.",
  openGraph: {
    title: "TiDevTeam - Professional Software Development & Web Solutions",
    description:
      "Transform your business with cutting-edge software solutions. We create modern websites, mobile apps, and custom software that drive growth and success.",
    url: "https://tidevteam.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TiDevTeam - Professional Software Development",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SupabaseSetupNotice />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        {/* Header */}
        <header className="border-b border-emerald-100 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#services"
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#projects"
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#about"
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
              >
                Reviews
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            <Link href="#contact">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <FloatingElements />

          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200 to-emerald-300 rounded-full opacity-20 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-10 blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 rounded-full mb-8 border border-emerald-200 shadow-lg backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
              <span className="text-emerald-700 font-semibold">Professional Software Solutions</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              <span className="text-gray-900">Innovative</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 bg-clip-text text-transparent animate-pulse">
                Digital Solutions
              </span>
            </h1>

            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              We create cutting-edge websites and mobile applications that drive your business forward. From concept to
              deployment, we deliver excellence with modern technology and innovative design.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="#contact">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-2xl"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Start Your Project
                </Button>
              </Link>
              <Link href="#projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View Our Work
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: 150, suffix: "+", label: "Projects Completed" },
                { number: 98, suffix: "%", label: "Client Satisfaction" },
                { number: 50, suffix: "+", label: "Happy Clients" },
                { number: 24, suffix: "/7", label: "Support Available" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full opacity-30 blur-3xl"></div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 rounded-full mb-8 border border-emerald-200 shadow-lg">
                <Target className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Our Expertise</span>
              </div>
              <h2 className="text-6xl font-black text-gray-900 mb-8">
                Comprehensive
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  {" "}
                  Services
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Tailored software solutions designed to elevate your business and exceed expectations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: Globe,
                  title: "Web Development",
                  description: "Modern, responsive websites built with cutting-edge technologies",
                  features: ["Custom web applications", "E-commerce solutions", "CMS development", "API integration"],
                  gradient: "from-emerald-400 to-green-500",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Apps",
                  description: "Native and cross-platform mobile applications",
                  features: [
                    "iOS & Android apps",
                    "React Native development",
                    "App Store optimization",
                    "Maintenance & updates",
                  ],
                  gradient: "from-green-400 to-emerald-500",
                },
                {
                  icon: Zap,
                  title: "Custom Solutions",
                  description: "Tailored software solutions for unique business requirements",
                  features: ["Business automation", "Database design", "System integration", "Cloud solutions"],
                  gradient: "from-teal-400 to-emerald-500",
                },
                {
                  icon: Code2,
                  title: "Full-Stack Development",
                  description: "End-to-end development with modern frameworks",
                  features: [
                    "Frontend & Backend",
                    "Database architecture",
                    "DevOps & deployment",
                    "Performance optimization",
                  ],
                  gradient: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Database,
                  title: "Data Solutions",
                  description: "Robust data management and analytics platforms",
                  features: ["Database design", "Data migration", "Analytics dashboards", "Real-time processing"],
                  gradient: "from-green-500 to-emerald-600",
                },
                {
                  icon: Palette,
                  title: "UI/UX Design",
                  description: "Beautiful, intuitive designs that users love",
                  features: ["User research", "Wireframing & prototyping", "Visual design", "Usability testing"],
                  gradient: "from-emerald-600 to-green-500",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-3xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/30 hover:scale-105 relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="pb-6 relative z-10">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                    >
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 mb-3">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-lg leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase Section */}
        <section
          id="projects"
          className="py-32 px-4 bg-gradient-to-br from-emerald-50 to-green-50 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-100 to-emerald-200 rounded-full opacity-30 blur-3xl"></div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-emerald-200 shadow-lg">
                <Award className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Our Portfolio</span>
              </div>
              <h2 className="text-6xl font-black text-gray-900 mb-8">
                Featured
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  {" "}
                  Projects
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover our latest work and see how we've helped businesses transform their digital presence
              </p>
            </div>

            <ProjectShowcase />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 rounded-full mb-10 border border-emerald-200 shadow-lg">
                  <HeartHandshake className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Why Choose Us</span>
                </div>

                <h2 className="text-6xl font-black text-gray-900 mb-10">
                  Why Choose
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {" "}
                    TiDevTeam?
                  </span>
                </h2>

                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  With years of experience in software development, we bring expertise, innovation, and dedication to
                  every project. Our team is committed to delivering solutions that exceed expectations and drive real
                  results for your business.
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    {
                      icon: Users,
                      title: "Expert Team",
                      description: "Skilled developers and designers with proven expertise",
                      gradient: "from-emerald-400 to-green-500",
                    },
                    {
                      icon: Shield,
                      title: "Secure & Reliable",
                      description: "Enterprise-grade security and reliability standards",
                      gradient: "from-green-400 to-emerald-500",
                    },
                    {
                      icon: TrendingUp,
                      title: "Growth Focused",
                      description: "Solutions designed to scale with your business",
                      gradient: "from-teal-400 to-emerald-500",
                    },
                    {
                      icon: Clock,
                      title: "On-Time Delivery",
                      description: "Consistent delivery within agreed timelines",
                      gradient: "from-emerald-500 to-green-600",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-emerald-100 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-20 blur-2xl"></div>

                <h3 className="text-4xl font-black text-gray-900 mb-10 relative z-10">Our Process</h3>
                <div className="space-y-8 relative z-10">
                  {[
                    { step: "Discovery & Planning", description: "Understanding your vision and requirements" },
                    { step: "Design & Development", description: "Creating beautiful, functional solutions" },
                    { step: "Testing & Quality Assurance", description: "Ensuring perfection in every detail" },
                    { step: "Deployment & Support", description: "Launch and ongoing maintenance" },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-6 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-bold text-xl mb-1">{step.step}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-32 px-4 bg-gradient-to-br from-emerald-50 to-green-50 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-10 blur-3xl"></div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-emerald-200 shadow-lg">
                <Award className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Client Reviews</span>
              </div>
              <h2 className="text-6xl font-black text-gray-900 mb-8">
                What Our
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  {" "}
                  Clients Say
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Don't just take our word for it - hear from the businesses we've helped transform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO",
                  company: "TechStart Inc",
                  content:
                    "TiDevTeam transformed our vision into reality. Their attention to detail and technical expertise exceeded our expectations. The project was delivered on time and within budget.",
                  rating: 5,
                  avatar: "SJ",
                },
                {
                  name: "Michael Chen",
                  role: "Founder",
                  company: "GreenTech Solutions",
                  content:
                    "Working with TiDevTeam was a game-changer for our business. They built us a scalable platform that has helped us grow 300% in the past year. Highly recommended!",
                  rating: 5,
                  avatar: "MC",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Marketing Director",
                  company: "Creative Agency",
                  content:
                    "The team's creativity and technical skills are unmatched. They delivered a stunning website that perfectly captures our brand identity and has significantly improved our conversion rates.",
                  rating: 5,
                  avatar: "ER",
                },
                {
                  name: "David Thompson",
                  role: "CTO",
                  company: "FinanceFlow",
                  content:
                    "TiDevTeam's expertise in both frontend and backend development made them the perfect partner for our complex financial platform. Security and performance were top-notch.",
                  rating: 5,
                  avatar: "DT",
                },
                {
                  name: "Lisa Wang",
                  role: "Product Manager",
                  company: "HealthTech Pro",
                  content:
                    "From initial consultation to final deployment, the process was seamless. The mobile app they developed has received excellent user feedback and high app store ratings.",
                  rating: 5,
                  avatar: "LW",
                },
                {
                  name: "James Miller",
                  role: "Operations Manager",
                  company: "LogiCorp",
                  content:
                    "The custom automation solution TiDevTeam built for us has saved countless hours and improved our operational efficiency by 40%. Outstanding work and ongoing support.",
                  rating: 5,
                  avatar: "JM",
                },
              ].map((testimonial, index) => (
                <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-32 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full opacity-30 blur-3xl"></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-green-100 px-6 py-3 rounded-full mb-8 border border-emerald-200 shadow-lg">
                <Rocket className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Get In Touch</span>
              </div>
              <h2 className="text-6xl font-black text-gray-900 mb-8">
                Start Your
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  {" "}
                  Project Today
                </span>
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                Ready to bring your ideas to life? Let's create something amazing together.
              </p>
            </div>

            <Card className="shadow-3xl border-0 bg-gradient-to-br from-white to-emerald-50/30 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-10 blur-3xl"></div>

              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-2xl p-10 relative z-10">
                <CardTitle className="text-4xl font-black mb-4">Project Request Form</CardTitle>
                <CardDescription className="text-emerald-100 text-xl leading-relaxed">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10 relative z-10">
                <form action="https://api.web3forms.com/submit" method="POST" className="space-y-8">
                  <input type="hidden" name="access_key" value="6924a12b-7e9f-4791-b0c0-be21606bd1bb" />
                  <input type="hidden" name="to" value="tidevteam@gmail.com" />
                  <input type="hidden" name="subject" value="New Project Request from TiDevTeam Website" />

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="name" className="text-sm font-bold text-gray-700 flex items-center space-x-1">
                        <span>Full Name</span>
                        <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center space-x-1">
                        <span>Primary Email</span>
                        <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="secondary_email" className="text-sm font-bold text-gray-700">
                        Secondary Email (Optional)
                      </label>
                      <input
                        type="email"
                        id="secondary_email"
                        name="secondary_email"
                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                        placeholder="alternative@email.com"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-sm font-bold text-gray-700 flex items-center space-x-1">
                        <span>Primary Phone Number</span>
                        <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="secondary_phone" className="text-sm font-bold text-gray-700">
                        Secondary Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="secondary_phone"
                        name="secondary_phone"
                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical transition-all duration-300 text-lg"
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="request_type"
                        className="text-sm font-bold text-gray-700 flex items-center space-x-1"
                      >
                        <span>Type of Request</span>
                        <span className="text-emerald-500">*</span>
                      </label>
                      <select
                        id="request_type"
                        name="request_type"
                        required
                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                      >
                        <option value="">Select request type</option>
                        <option value="website">Website Development</option>
                        <option value="mobile_app">Mobile App Development</option>
                        <option value="web_app">Web Application</option>
                        <option value="ecommerce">E-commerce Solution</option>
                        <option value="custom_software">Custom Software</option>
                        <option value="consultation">Consultation</option>
                        <option value="maintenance">Maintenance & Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="project_description"
                      className="text-sm font-bold text-gray-700 flex items-center space-x-1"
                    >
                      <span>Project Description</span>
                      <span className="text-emerald-500">*</span>
                    </label>
                    <textarea
                      id="project_description"
                      name="project_description"
                      required
                      rows={6}
                      className="w-full px-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-vertical transition-all duration-300 text-lg"
                      placeholder="Please describe your project requirements, goals, timeline, and any specific features you need..."
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="agree_terms"
                      name="agree_terms"
                      required
                      className="h-6 w-6 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
                    />
                    <label htmlFor="agree_terms" className="text-gray-700 flex items-center space-x-1">
                      <span>I agree to be contacted regarding this project request</span>
                      <span className="text-emerald-500">*</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-xl py-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    Submit Project Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-emerald-600/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <Logo className="mb-8" />
                <p className="text-gray-400 leading-relaxed text-lg mb-8">
                  Professional software solutions for modern businesses. We turn your innovative ideas into powerful
                  digital realities that drive growth and success.
                </p>
                <div className="flex space-x-4">{/* Social media icons would go here */}</div>
              </div>
              <div>
                <h3 className="font-black mb-8 text-2xl">Quick Links</h3>
                <ul className="space-y-4 text-gray-400">
                  <li>
                    <Link href="#services" className="hover:text-emerald-400 transition-colors text-lg">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="#projects" className="hover:text-emerald-400 transition-colors text-lg">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="#about" className="hover:text-emerald-400 transition-colors text-lg">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="hover:text-emerald-400 transition-colors text-lg">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-black mb-8 text-2xl">Contact Info</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-lg">tidevteam@gmail.com</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-lg">Professional Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-lg">24/7 Availability</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-16 pt-12 text-center text-gray-400">
              <p className="text-lg">
                &copy; 2024 TiDevTeam. All rights reserved. Crafted with passion and innovation.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
