import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adarsh Sachan - Full Stack Developer",
  description:
    "Portfolio of Adarsh Sachan, a passionate 3rd year B.Tech CSE student and full-stack developer specializing in MERN stack development.",
  keywords: "Adarsh Sachan, Full Stack Developer, MERN Stack, React, Node.js, Portfolio, Web Developer",
  authors: [{ name: "Adarsh Sachan" }],
  openGraph: {
    title: "Adarsh Sachan - Full Stack Developer",
    description: "Portfolio of Adarsh Sachan, a passionate full-stack developer and CSE student",
    type: "website",
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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8268053834879518" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
