"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Settings, FolderPlus, List, Home } from "lucide-react"
import { Logo } from "@/components/logo"

export function AdminNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Dashboard", icon: Settings },
    { href: "/projects#create", label: "Add Project", icon: FolderPlus },
    { href: "/projects#list", label: "All Projects", icon: List },
  ]

  return (
    <header className="border-b border-emerald-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-emerald-600">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-gradient-to-br from-white to-emerald-50">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-900 font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:block">
          <span className="text-sm text-emerald-700 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full border border-emerald-200 font-medium">
            Admin Dashboard
          </span>
        </div>
      </div>
    </header>
  )
}
