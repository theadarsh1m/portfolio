"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Download } from "lucide-react"

const phrases = [
  "building Web Apps",
  "solving DSA problems",
  "giving contests",
  "exploring new tech",
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const socialLinks = [
    { icon: Github, href: "https://github.com/theadarsh1m", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/adarshsachan01/", label: "LinkedIn" },
    { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=2k23.cs2312635%40gmail.com", label: "Email" },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 text-center lg:text-left mt-16 md:mt-20">
          {/* Left side: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex-1 space-y-8 max-w-full z-10"
          >
            {/* Headline */}
            <div className="pt-2 pb-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-foreground mb-4"
              >
                <div className="mb-2">I enjoy</div>
                <div className="relative h-[2.9em] sm:h-[2.7em] lg:h-[1.6em] overflow-hidden w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute left-0 w-full text-[1.1em] leading-[1.2] text-center lg:text-left gradient-text inline-block break-words"
                    >
                      {phrases[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="space-y-4">
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
                B.Tech in Computer Science
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
                PSIT Kanpur • Full-Stack Developer • DSA Enthusiast
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
                Passionate about building innovative web solutions and giving regular contests to sharpen my problem solving skills
              </motion.p>
            </div>

            {/* Action buttons */}
            <motion.div
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
                className="cursor-target px-8 py-3 bg-primary text-primary-foreground rounded-lg transition-all duration-300"
              >
                Get In Touch
              </motion.a>

              <motion.a
                href="https://drive.google.com/uc?export=download&id=1bBv4948271T2v5vnH4znSA2NjoBBTbyE"
                download="Adarsh_Sachan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="cursor-target px-8 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg transition-all duration-300 flex items-center gap-2 hover:bg-muted"
              >
                <Download size={18} />
                Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
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
                  className="cursor-target p-3 bg-card text-card-foreground border border-border rounded-full hover:bg-muted transition-all duration-300"
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
            </div>
          </motion.div>

          {/* Right side: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-md mx-auto lg:mx-0 relative mb-12 lg:mb-0"
          >
            {/* Subtle glow behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-[32px] transform scale-110" />

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
      </div>

      {/* Scroll indicator */}
      <motion.div
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
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-1 h-3 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
