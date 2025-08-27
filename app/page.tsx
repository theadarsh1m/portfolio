"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import Navbar from "./components/navbar"
import Hero from "./components/hero"
import About from "./components/about"
import Skills from "./components/skills"
import Projects from "./components/projects"
import Contact from "./components/contact"
import ThemeToggle from "./components/theme-toggle"
import Preloader from "./components/preloader"
import LocomotiveContainer from "./components/locomotive-container"
import Chatbot from "./components/chatbot"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!showContent) return

      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showContent])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />
  }

  return (
    <LocomotiveContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        {/* Enhanced progress bar */}
        {showContent && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 transform-origin-0 z-50"
            style={{ scaleX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        )}

        {showContent && <Navbar activeSection={activeSection} />}
        {showContent && <ThemeToggle />}
        {showContent && <Chatbot />}

        <main className="relative">
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </motion.div>
          )}
        </main>
      </motion.div>
    </LocomotiveContainer>
  )
}
