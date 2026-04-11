import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adarsh Sachan | Full-Stack MERN Developer Portfolio",
  description:
    "Adarsh Sachan's portfolio. I am a Full-Stack MERN Developer based in Kanpur, specializing in React, Node.js, and AI integration.",
  keywords: "theadarsh, Adarsh Sachan, Full-Stack Developer, MERN stack, web development portfolio, Kanpur, MediChain, ShaadiCrasher",
  authors: [{ name: "Adarsh Sachan" }],
  openGraph: {
    title: "Adarsh Sachan | Full-Stack MERN Developer Portfolio",
    description: "Welcome to Adarsh Sachan's portfolio. View my MERN stack projects, including MediChain and ShaadiCrasher.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "7asNvLbMjMFEV3JFSwi8vbHjgSsCy9Ec3rSXRko2mmk",
  },
  generator: 'v0.dev'
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
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8268053834879518" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
