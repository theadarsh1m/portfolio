"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

interface Certificate {
  title: string
  issuer: string
  date: string
  gradient: string
  driveLink: string
  imageUrl: string
  description: string
}

const certificates: Certificate[] = [
  {
    title: "TCS CodeVita Season 13",
    issuer: "Tata Consultancy Services",
    date: "2024",
    gradient: "from-blue-600 to-red-600",
    driveLink:
      "https://drive.google.com/file/d/1oZX7MQppobWopJUXzXjfuxY6T9YiRlFh/view?usp=sharing",
    imageUrl: "/codevitia13.png",
    description:
      "Successfully participated in TCS CodeVita Season 13, achieving a Global Rank of 5667 in one of the world's largest competitive coding contests.",
  },
  {
    title: "Introduction to Programming in C",
    issuer: "NPTEL • IIT Kanpur",
    date: "2024",
    gradient: "from-blue-500 to-indigo-600",
    driveLink:
      "https://drive.google.com/file/d/1_ivJa5-TZCYbabGdny4GeHB_0OPAfghV/view?usp=sharing",
    imageUrl: "/C.png",
    description:
      "NPTEL certified course from IIT Kanpur covering C programming fundamentals, pointers, memory management, and data structures.",
  },
  {
    title: "Programming In Java",
    issuer: "NPTEL • IIT Kharagpur",
    date: "2024",
    gradient: "from-orange-500 to-red-600",
    driveLink:
      "https://drive.google.com/file/d/1ApawnK0xzrV7Kqsaiwn5x0xQxS1zlWQh/view?usp=sharing",
    imageUrl: "/java.png",
    description:
      "NPTEL certified course from IIT Kharagpur covering object-oriented programming, multithreading, collections, and Java frameworks.",
  },
  {
    title: "Hack O' Clock - Finalist",
    issuer: "Hackathon",
    date: "2024",
    gradient: "from-emerald-500 to-teal-600",
    driveLink:
      "https://drive.google.com/file/d/1LmbwRpRKg_GCfYHySVALmuHTOV2BgYf7/view?usp=sharing",
    imageUrl: "/Hack O Clock.png",
    description:
      "Reached the finals of the Hack O' Clock hackathon, competing against top teams to build innovative solutions under time constraints.",
  },
]

// Slide variants — direction-aware so cards slide in from the correct side
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? -8 : 8,
  }),
}

export default function Achievements() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0) // +1 = next, -1 = prev

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > current ? 1 : -1)
      setCurrent(i)
    },
    [current],
  )

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + certificates.length) % certificates.length)
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % certificates.length)
  }, [])

  const cert = certificates[current]

  return (
    <section
      id="achievements"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Header */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Achievements & Certifications
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Certifications and achievements that validate my skills and
                dedication to continuous learning
              </p>
            </div>
          </ScrollReveal>

          {/* ── Main Showcase ── */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Certificate Image Preview */}
              <div className="w-full lg:w-3/5 relative text-center" style={{ perspective: "1200px", touchAction: "pan-y" }}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border shadow-xl">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 280, damping: 28 },
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.35 },
                        rotateY: { duration: 0.4 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x
                        if (swipe < -10000) {
                          next()
                        } else if (swipe > 10000) {
                          prev()
                        }
                      }}
                      className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-full object-contain bg-white p-2 pointer-events-none"
                        loading="lazy"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                  {/* Navigation arrows */}
                  <motion.button
                    onClick={prev}
                    initial={{ y: "-50%" }}
                    whileHover={{ scale: 1.1, y: "-50%" }}
                    whileTap={{ scale: 0.9, y: "-50%" }}
                    className="cursor-target absolute left-3 top-1/2 w-10 h-10 bg-white/90 dark:bg-black/70 text-black dark:text-white border border-border rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors shadow-lg z-10"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    initial={{ y: "-50%" }}
                    whileHover={{ scale: 1.1, y: "-50%" }}
                    whileTap={{ scale: 0.9, y: "-50%" }}
                    className="cursor-target absolute right-3 top-1/2 w-10 h-10 bg-white/90 dark:bg-black/70 text-black dark:text-white border border-border rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors shadow-lg z-10"
                    aria-label="Next certificate"
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {certificates.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to certificate ${i + 1}`}
                      className={`cursor-target rounded-full transition-all duration-300 ${i === current
                        ? "w-8 h-2.5 bg-primary"
                        : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Certificate Details Panel */}
              <div className="w-full lg:w-2/5">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                    transition={{
                      duration: 0.35,
                      ease: "easeInOut",
                    }}
                    className="space-y-5"
                  >
                    {/* Title */}
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>

                    {/* View button */}
                    <a
                      href={cert.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target bg-card border border-border flex items-center justify-center w-48 rounded-2xl h-14 relative text-foreground font-semibold group shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className={`bg-gradient-to-r ${cert.gradient} rounded-xl h-12 w-12 flex items-center justify-center absolute right-1 top-[3px] group-hover:w-[184px] z-10 duration-500`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px" className="rotate-180">
                          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#ffffff" />
                          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#ffffff" />
                        </svg>
                      </div>
                      <p className="translate-x-[-15px] duration-500 text-[15px]">
                        View Certificate
                      </p>
                    </a>

                    {/* Counter */}
                    <p className="text-sm text-muted-foreground/60">
                      {current + 1} / {certificates.length}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Thumbnail strip ── */}
            <div className="mt-8 flex gap-3 justify-center">
              {certificates.map((c, i) => (
                <motion.button
                  key={c.title}
                  onClick={() => goTo(i)}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-target relative w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === current
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border opacity-50 hover:opacity-90"
                    }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
