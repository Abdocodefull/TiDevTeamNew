import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#059669" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tidevteam.com"),
  title: {
    default: "TiDevTeam - Professional Software Development & Web Solutions",
    template: "%s | TiDevTeam",
  },
  description:
    "Professional software development company specializing in web applications, mobile apps, and custom solutions. Transform your business with cutting-edge technology and innovative design.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "custom software",
    "web applications",
    "e-commerce solutions",
    "UI/UX design",
    "full-stack development",
    "React development",
    "Next.js development",
    "professional software solutions",
  ],
  authors: [{ name: "TiDevTeam", url: "https://tidevteam.com" }],
  creator: "TiDevTeam",
  publisher: "TiDevTeam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tidevteam.com",
    siteName: "TiDevTeam",
    title: "TiDevTeam - Professional Software Development & Web Solutions",
    description:
      "Professional software development company specializing in web applications, mobile apps, and custom solutions. Transform your business with cutting-edge technology.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TiDevTeam - Professional Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TiDevTeam - Professional Software Development",
    description:
      "Transform your business with cutting-edge software solutions. Web apps, mobile development, and custom software.",
    images: ["/og-image.jpg"],
    creator: "@tidevteam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://tidevteam.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
