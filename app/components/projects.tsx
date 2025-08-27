"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Cloud, Shield, Heart, Link } from "lucide-react"
import { useState } from "react"
import ScrollReveal from "./scroll-reveal"
import { useLocomotiveScroll } from "../../hooks/use-locomotive-scroll"

export default function Projects() {
  const { fastParallax } = useLocomotiveScroll()
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const projects = [
    {
      title: "Weather App",
      description:
        "A responsive weather application with API integration for real-time weather data and dynamic city-based images. Built with vanilla JavaScript and Bootstrap for a clean, user-friendly interface.",
      tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "Weather API"],
      icon: Cloud,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Real-time weather data", "City-based images", "Responsive design", "API integration"],
      github: "https://github.com/theadarsh1m/Weather.git",
      demo: "https://weather-pfas.onrender.com/",
      livePreview: true,
    },
    {
      title: "NICKLY | Link Shortener",
      description:
        "A URL shortener web app managing 100+ test URLs, reducing link length by 80% and enhancing shareability across platforms. Features unique link generation, redirection, and database storage for analytics.",
      tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
      icon: Link,
      gradient: "from-purple-500 to-pink-500",
      features: ["URL shortening", "Analytics tracking", "Database storage", "Unique link generation"],
      github: "https://github.com/theadarsh1m/Nickly",
      demo: "https://nickly.onrender.com/",
      livePreview: true,
    },
    {
      title: "LegalEase – Hackathon Project",
      description:
        "An AI-powered legal document analyzer that helps users understand complex legal documents and provides lawyer recommendations. Developed during a hackathon with the help of AI tools like v0, focusing on accessibility and user experience.",
      tech: ["AI/ML", "React", "Node.js", "Legal APIs"],
      icon: Shield,
      gradient: "from-green-500 to-teal-500",
      features: ["AI document analysis", "Lawyer recommendations", "User-friendly interface", "Legal document parsing"],
      github: "https://github.com/theadarsh1m/Justice-Ally.git",
      demo: "Currently under development",
      livePreview: false,
    },
    {
      title: "Zero Food Connect",
      description:
        "A Firebase-powered food donation platform that connects food donors with those in need. Features real-time coordination, location-based matching, and efficient food waste reduction system. Developed using Firebase Studio AI for enhanced functionality.",
      tech: ["React", "Firebase", "Google Maps API", "Real-time Database"],
      icon: Heart,
      gradient: "from-red-500 to-orange-500",
      features: ["Real-time coordination", "Location matching", "Food waste reduction", "Community impact"],
      github: "https://github.com/theadarsh1m/Zero-Food-Connect.git",
      demo: "https://zerofoodconnect.vercel.app/",
      livePreview: true,
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Dynamic parallax background */}
      <motion.div style={{ y: fastParallax }} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section header with right reveal */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Here are some of my recent projects that showcase my skills and passion for development
              </p>
            </div>
          </ScrollReveal>

          {/* Projects grid with alternating reveals */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.4 + index * 0.2}
              >
                <motion.div
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                >
                  <motion.div
                    className={`h-2 bg-gradient-to-r ${project.gradient}`}
                    whileHover={{ height: 6 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="p-8 relative">
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`p-3 bg-gradient-to-r ${project.gradient} rounded-lg mr-4`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <project.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: featureIndex * 0.1 }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"
                              whileHover={{ scale: 1.5 }}
                            />
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgb(59, 130, 246)",
                              color: "white",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Github size={18} />
                        Code
                      </motion.a>
                      {project.demo === "Currently under development" ? (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg opacity-75 cursor-not-allowed`}
                        >
                          <ExternalLink size={18} />
                          Currently under development
                        </motion.div>
                      ) : (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => project.livePreview && setHoveredProject(project.title)}
                          onMouseLeave={() => setHoveredProject(null)}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg hover:shadow-lg transition-shadow duration-200`}
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>

                    {/* Live Preview Overlay */}
                    <AnimatePresence>
                      {hoveredProject === project.title && project.livePreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-10 overflow-hidden"
                          onMouseEnter={() => setHoveredProject(project.title)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          <div className="h-full w-full relative">
                            <div className="absolute top-4 right-4 z-20">
                              <motion.button
                                onClick={() => setHoveredProject(null)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                              >
                                ×
                              </motion.button>
                            </div>
                            <div className="absolute top-4 left-4 z-20">
                              <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Live Preview
                              </div>
                            </div>
                            <iframe
                              src={project.demo}
                              className="w-full h-full border-0 rounded-xl"
                              title={`${project.title} Live Preview`}
                              loading="lazy"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            />
                            <div className="absolute bottom-4 left-4 right-4 z-20">
                              <motion.a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200`}
                              >
                                <ExternalLink size={16} />
                                Open Full Site
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
