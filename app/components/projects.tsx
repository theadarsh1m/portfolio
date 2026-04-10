"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import ScrollReveal from "./scroll-reveal"

const projects = [
  {
    title: "MediChain",
    subtitle: "Full-Stack Healthcare Platform",
    description:
      "Role-based healthcare platform for patients, doctors & hospitals. Features AI-powered lab report analysis via Gemini API and secure telemedicine chat.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "Firebase"],
    gradient: "from-blue-400 to-violet-400",
    accentColor: "blue",
    github: "https://github.com/theadarsh1m/MediChain",
    demo: "https://medichainreal.netlify.app/",
    image: "/medichain.png",
  },
  {
    title: "LegalEase",
    subtitle: "AI-Powered Legal Assistant",
    description:
      "Engineered an AI-powered legal assistant with RAG for accurate legal query responses. Generates FIR & RTI drafts, reducing document preparation time by 50%.",
    tech: ["Next.js", "MongoDB", "Gemini AI", "RAG", "Firebase", "Cloudinary"],
    gradient: "from-emerald-400 to-cyan-400",
    accentColor: "emerald",
    github: "https://github.com/theadarsh1m/Justice-Ally.git",
    demo: "",
    image: "/medichain.png",
  },
  {
    title: "CONSOLED",
    subtitle: "Terminal UI Framework in Go",
    description:
      "Component-based terminal UI framework inspired by React & Flutter. Features event-driven architecture for efficient state and layout management.",
    tech: ["Go", "ANSI Escape Codes", "Event Systems", "Layout Engines"],
    gradient: "from-zinc-400 to-slate-500",
    accentColor: "zinc",
    github: "https://github.com/theadarsh1m/CONSOLED",
    demo: "",
    image: "/medichain.png",
  },
  {
    title: "ShaadiCrasher",
    subtitle: "Discover Nearby Weddings",
    description:
      "Fun app to discover nearby weddings with real-time feeds. Features Google auth, Ola Maps integration, proximity sorting, and auto-cleanup of expired invites.",
    tech: ["React", "Firebase", "Cloudinary", "Ola Maps API"],
    gradient: "from-rose-400 to-pink-400",
    accentColor: "rose",
    github: "https://github.com/theadarsh1m/ShaadiCrasher",
    demo: "https://shaadicrasher.netlify.app/",
    image: "/shaadicrasher.png",
  },
  {
    title: "Nickly",
    subtitle: "URL Shortener with Analytics",
    description:
      "URL shortener managing 100+ test URLs. Features custom short IDs, analytics dashboard with Chart.js, click history tracking, and pagination.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Chart.js"],
    gradient: "from-purple-400 to-fuchsia-400",
    accentColor: "purple",
    github: "https://github.com/theadarsh1m/Nickly",
    demo: "https://nickly.onrender.com/",
    image: "/nickly.png",
  },
]

// Featured project — full-width hero card
function FeaturedProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const isEven = index % 2 === 0
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ScrollReveal direction="up" delay={0.2}>
      <div className="group relative grid md:grid-cols-12 gap-4 items-center">
        {/* Image side */}
        <motion.div
          className={`relative md:col-span-7 ${isEven ? "md:order-1" : "md:order-2"}`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <a
            href={project.demo || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-xl overflow-hidden aspect-video shadow-xl"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-all duration-700 group-hover:scale-105"
            />
            {/* Image overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply opacity-30 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Hover arrow indicator */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>

            {!project.demo && (
              <div className="absolute bottom-4 left-4">
                <span className="bg-yellow-400/90 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  In Development
                </span>
              </div>
            )}
          </a>
        </motion.div>

        {/* Content side */}
        <div className={`md:col-span-5 ${isEven ? "md:order-2 md:text-right" : "md:order-1 md:text-left"}`}>
          <p className={`text-sm font-mono tracking-wider uppercase mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
            Featured Project
          </p>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground font-medium mb-4">{project.subtitle}</p>

          {/* Floating description card */}
          <div className={`relative z-10 bg-card border border-border rounded-xl p-5 shadow-lg mb-4 ${isEven ? "md:-ml-12" : "md:-mr-12"}`}>
            <p className={`text-sm text-muted-foreground leading-relaxed text-left ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {project.description}
            </p>
            {project.description.length > 120 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-xs text-primary mt-2 font-medium hover:underline text-left"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Tech tags */}
          <div className={`flex flex-wrap gap-2 mb-5 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-muted-foreground px-2 py-1 rounded-md bg-secondary/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className={`flex items-center gap-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={22} />
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Live Demo"
              >
                <ExternalLink size={22} />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

// Grid project — compact card
function CompactProject({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ScrollReveal direction="up" delay={0.15 * index}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden group shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
      >
        {/* Image */}
        <a
          href={project.demo || project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full aspect-[16/10] shrink-0 overflow-hidden cursor-pointer"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-multiply opacity-25 group-hover:opacity-0 transition-opacity duration-500`} />

          {/* Hover overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all"
          >
            <div className="flex items-center gap-2 text-white text-sm font-medium bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <ArrowUpRight size={16} />
              {project.demo ? "View Live" : "View Code"}
            </div>
          </motion.div>

          {!project.demo && (
            <div className="absolute top-3 right-3">
              <span className="bg-yellow-400/90 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                WIP
              </span>
            </div>
          )}
        </a>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Top bar with gradient accent */}
          <div className={`w-8 h-0.5 bg-gradient-to-r ${project.gradient} rounded-full mb-3 shrink-0`} />

          <h3 className="text-lg font-bold text-foreground mb-0.5 shrink-0">{project.title}</h3>
          <p className="text-xs text-muted-foreground font-medium mb-3 shrink-0">{project.subtitle}</p>
          <div className="mb-4">
            <p className={`text-sm text-muted-foreground leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {project.description}
            </p>
            {project.description.length > 100 && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }} 
                className="text-xs text-primary mt-1 font-medium hover:underline text-left focus:outline-none"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-secondary/80"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-secondary/80">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.1 }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </motion.a>
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Live Demo"
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Projects() {
  // First 2 are "featured" full-width, rest are compact grid cards
  const featured = projects.slice(0, 2)
  const others = projects.slice(2)

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-3">
              — What I&apos;ve Built
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Featured Projects
            </h2>
          </div>
        </ScrollReveal>

        {/* Featured projects */}
        <div className="space-y-24 mb-24">
          {featured.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other projects header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-2">Other Noteworthy Projects</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto" />
          </div>
        </ScrollReveal>

        {/* Compact project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((project, index) => (
            <CompactProject key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
