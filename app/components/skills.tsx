"use client"

import { motion } from "framer-motion"
import ScrollReveal from "./scroll-reveal"
import { useLocomotiveScroll } from "../../hooks/use-locomotive-scroll"

export default function Skills() {
  const { mediumParallax } = useLocomotiveScroll()

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "C", level: 70 },
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express", level: 70 },
        { name: "Bootstrap", level: 80 },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "MongoDB", level: 75 },
        { name: "Firebase", level: 75 },
        { name: "Git", level: 80 },
        { name: "GitHub", level: 85 },
        { name: "VS Code", level: 90 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: mediumParallax }} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section header with down reveal */}
          <ScrollReveal direction="down" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Skills & Technologies
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Here are the technologies and tools I work with to bring ideas to life
              </p>
            </div>
          </ScrollReveal>

          {/* Skills grid with alternating reveals */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <ScrollReveal
                key={category.title}
                direction={categoryIndex % 2 === 0 ? "left" : "right"}
                delay={0.4 + categoryIndex * 0.2}
              >
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                              duration: 1.2,
                              delay: categoryIndex * 0.3 + skillIndex * 0.1,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Certifications with up reveal */}
          <ScrollReveal direction="up" delay={0.8}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0 40px 80px rgba(59, 130, 246, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white relative overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-20 h-20 bg-white/10 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.3, 0.1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6 + Math.random() * 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4 relative z-10">Certifications</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm relative z-10">
                {[
                  { title: "OOPS with Java", org: "NPTEL, IIT Kharagpur" },
                  { title: "C Programming", org: "NPTEL, IIT Kanpur" },
                  { title: "Rural Development", org: "NSDC + Microsoft" },
                ].map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    className="bg-white/10 rounded-lg p-4"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,256,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <h4 className="font-semibold">{cert.title}</h4>
                    <p className="opacity-90">{cert.org}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
