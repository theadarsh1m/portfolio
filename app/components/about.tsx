"use client"

import { Code, Target, Users, Award } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import { useLocomotiveScroll } from "../../hooks/use-locomotive-scroll"
import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  const { slowParallax } = useLocomotiveScroll()

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Passionate about MERN stack development with hands-on project experience",
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Active on LeetCode, constantly improving algorithmic thinking and DSA skills",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Experience working on team projects and hackathons with innovative solutions",
    },
    {
      icon: Award,
      title: "Continuous Learning",
      description: "Multiple certifications from prestigious institutions like IIT Kharagpur & Kanpur",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div style={{ y: slowParallax }} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-blue-500/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section header with left reveal */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image with left reveal */}
            <ScrollReveal direction="left" delay={0.3}>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Image
                    src="/adarsh-photo.png"
                    alt="Adarsh Sachan - Full Stack Developer"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>

                {/* Floating elements around image */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Code className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Target className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Text content with right reveal */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                  Passionate Developer & Problem Solver
                </h3>

                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    I'm a dedicated 3rd-year Computer Science Engineering student at PSIT Kanpur, with a deep passion
                    for full-stack web development. My journey in tech is driven by curiosity and the desire to create
                    meaningful digital experiences.
                  </p>

                  <p>
                    Currently focusing on the MERN stack, I enjoy building real-world applications that solve actual
                    problems. From weather apps to food donation platforms, I believe in learning by doing and creating
                    impact through code.
                  </p>

                  <p>
                    When I'm not coding, you'll find me solving algorithmic challenges on LeetCode, exploring new
                    technologies, or collaborating on innovative projects. I'm actively seeking internships and
                    freelance opportunities to further expand my skills and contribute to exciting projects.
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                  }}
                  className="inline-block"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                    📍 Kanpur, Uttar Pradesh, India
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* Highlights grid with staggered up reveals */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {highlights.map((highlight, index) => (
              <ScrollReveal key={highlight.title} direction="up" delay={0.6 + index * 0.1}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                    >
                      <highlight.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{highlight.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{highlight.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
