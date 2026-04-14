"use client"

import ScrollReveal from "./scroll-reveal"
import { motion } from "framer-motion"
import Image from "next/image"
import { Code, Target } from "lucide-react"

export default function About() {

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section header with left reveal */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
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
                    src="/adarsh.png"
                    alt="Adarsh Sachan Profile Picture - Full Stack Developer"
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
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                >
                  <Code className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-violet-400 to-violet-600 dark:from-violet-500 dark:to-violet-700 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Target className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Text content with right reveal */}
            <ScrollReveal direction="right" delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Passionate Developer & Problem Solver
                </h3>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a 3rd-year <strong className="text-foreground font-medium">Computer Science</strong> student at PSIT Kanpur, passionate about <strong className="text-foreground font-medium">competitive programming</strong> and building high-performance <strong className="text-foreground font-medium">web applications</strong>. I thrive on solving <strong className="text-foreground font-medium">complex algorithmic challenges</strong> and turning optimal logic into robust software.
                  </p>

                  <p>
                    My strong <strong className="text-foreground font-medium">DSA foundation</strong> honed on <strong className="text-foreground font-medium">LeetCode and Codeforces</strong> directly fuels my development work. I specialize in the <strong className="text-foreground font-medium">React and Next.js ecosystems</strong> to architect scalable, optimized, and impactful solutions like the MediChain platform.
                  </p>

                  <p>
                    Whether optimizing DP approaches under time constraints or designing seamless full-stack architectures, I am constantly pushing technical boundaries. I am actively seeking <strong className="text-foreground font-medium">internships and new opportunities</strong> where I can apply my <strong className="text-foreground font-medium">problem-solving skills</strong> and engineering expertise to build real-world, impactful products.
                  </p>
                </div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                  }}
                  className="inline-block"
                >
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium">
                    📍 Kanpur, Uttar Pradesh, India
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}