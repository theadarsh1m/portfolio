"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export default function Hero() {
  const ref = useRef(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false)

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

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
        className="absolute inset-0 bg-background"
      />

      {/* Floating particles with parallax */}
      <motion.div style={{ y: particlesY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
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
      <motion.div style={{ y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 text-center lg:text-left mt-16 md:mt-20">
          {/* Left side: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex-1 space-y-8"
          >
            {/* Headline */}
            <div className="relative overflow-hidden">
              <motion.h1
                style={{
                  scale: nameScale,
                  opacity: nameOpacity,
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 origin-center lg:origin-left will-change-transform"
              >
                I enjoy building{" "}
                <span className="gradient-text">Web</span> Applications
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
                className="text-xl md:text-2xl text-muted-foreground font-medium"
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
                className="text-lg text-muted-foreground"
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
                className="text-base text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              >
                Passionate about building innovative web solutions and solving complex problems through code
              </motion.p>
            </motion.div>

            {/* Action buttons */}
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
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg transition-all duration-300"
              >
                Get In Touch
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-muted"
              >
                <Download size={18} />
                Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]),
              }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-8"
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
                    rotate: [0, -5, 5, 0],
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-card text-card-foreground border border-border rounded-full hover:bg-muted transition-all duration-300"
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

          {/* Right side: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-md mx-auto lg:mx-0 relative mb-12 lg:mb-0"
          >
            {/* Subtle glow behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-[32px] transform scale-110"></div>

            {/* Floating Image Container */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="relative rounded-[32px] bg-card text-card-foreground border border-border shadow-md backdrop-blur-lg overflow-hidden aspect-[4/5] sm:aspect-square"
            >
              <img
                src="/adarsh-photo.png"
                alt="Adarsh Sachan"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>
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
