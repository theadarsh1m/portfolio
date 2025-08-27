"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { useLocomotiveScroll } from "../../hooks/use-locomotive-scroll"

export default function Hero() {
  const ref = useRef(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false)

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const { slowParallax, mediumParallax } = useLocomotiveScroll()

  // Enhanced locomotive-style zoom with smoother curves
  const nameScale = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5], [1, 1.1, 1.4, 2.2])

  const nameOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [1, 0.95, 0.7, 0.1])

  // Cinematic content movement
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-150%"])

  // Parallax background layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Monitor scroll for cinematic auto-scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.03 && !hasScrolled) {
      setHasScrolled(true)
    }

    // Trigger cinematic auto-scroll when zoom is nearly complete
    if (latest > 0.45 && !shouldAutoScroll) {
      setShouldAutoScroll(true)
    }
  })

  // Cinematic auto-scroll with locomotive timing
  useEffect(() => {
    if (shouldAutoScroll) {
      const timer = setTimeout(() => {
        const aboutSection = document.getElementById("about")
        if (aboutSection) {
          // Smooth cinematic scroll
          aboutSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 300) // Slightly longer delay for cinematic feel

      return () => clearTimeout(timer)
    }
  }, [shouldAutoScroll])

  const socialLinks = [
    { icon: Github, href: "https://github.com/theadarsh1m", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/adarshsachan01/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:2k23.cs2312635@gmail.com", label: "Email" },
  ]

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Multi-layer parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
      />

      {/* Floating particles with parallax */}
      <motion.div style={{ y: particlesY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </motion.div>

      {/* Main content with locomotive transforms */}
      <motion.div style={{ y: contentY }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="space-y-8"
        >
          {/* Cinematic name zoom */}
          <div className="relative overflow-hidden mt-16 md:mt-20">
            <motion.h1
              style={{
                scale: nameScale,
                opacity: nameOpacity,
              }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-4 origin-center will-change-transform"
            >
              <motion.span
                initial={{ opacity: 0, x: -50, rotateX: 90 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
              >
                Adarsh
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, x: 50, rotateX: -90 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Sachan
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle with staggered reveal */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]),
            }}
            className="space-y-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium"
            >
              3rd Year B.Tech CSE Student
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-lg text-gray-500 dark:text-gray-400"
            >
              PSIT Kanpur • Full-Stack Developer • MERN Stack Enthusiast
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Passionate about building innovative web solutions and solving complex problems through code
            </motion.p>
          </motion.div>

          {/* Action buttons with locomotive hover */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]),
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.6,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Get In Touch
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                scale: 1.05,
                borderColor: "rgb(59, 130, 246)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300 flex items-center gap-2"
            >
              <Download size={18} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social links with staggered locomotive animations */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]),
            }}
            className="flex items-center justify-center gap-6 pt-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  rotate: [0, -5, 5, 0],
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  rotate: { duration: 0.6 },
                }}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.8 + index * 0.1,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-1 h-3 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Cinematic progress indicator */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
        }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 origin-left"
      />
    </section>
  )
}
