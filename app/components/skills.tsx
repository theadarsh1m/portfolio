"use client"

import React from "react"
import { motion } from "framer-motion"
import { LinkPreview } from "./link-preview"

// Skills data
const featuresData = [
  // Row 1 - Top
  {
    title: "HTML",
    icon: "https://skillicons.dev/icons?i=html",
    left: "10%", top: "5%",
    delay: 0.1,
    previewLink: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    title: "React",
    icon: "https://techstack-generator.vercel.app/react-icon.svg",
    left: "32%", top: "3%",
    delay: 0.1,
    previewLink: "https://react.dev/",
  },
  {
    title: "MongoDB",
    icon: "https://skillicons.dev/icons?i=mongodb",
    left: "55%", top: "5%",
    delay: 0.1,
    previewLink: "https://www.mongodb.com/",
  },
  {
    title: "CSS",
    icon: "https://skillicons.dev/icons?i=css",
    left: "80%", top: "3%",
    delay: 0.1,
    previewLink: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  // Row 2
  {
    title: "Bootstrap",
    icon: "https://skillicons.dev/icons?i=bootstrap",
    left: "18%", top: "18%",
    delay: 0.15,
    previewLink: "https://getbootstrap.com/",
  },
  {
    title: "Express.js",
    icon: "https://skillicons.dev/icons?i=express",
    left: "68%", top: "17%",
    delay: 0.15,
    previewLink: "https://expressjs.com/",
  },
  // Row 3
  {
    title: "Java",
    icon: "https://techstack-generator.vercel.app/java-icon.svg",
    left: "5%", top: "32%",
    delay: 0.2,
    previewLink: "https://www.java.com/",
  },
  {
    title: "Tailwind",
    icon: "https://skillicons.dev/icons?i=tailwind",
    left: "82%", top: "30%",
    delay: 0.2,
    previewLink: "https://tailwindcss.com/",
  },
  // Row 4 - beside circle
  {
    title: "Node.js",
    icon: "https://skillicons.dev/icons?i=nodejs",
    left: "12%", top: "45%",
    delay: 0.25,
    previewLink: "https://nodejs.org/",
  },
  {
    title: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    left: "78%", top: "43%",
    delay: 0.25,
    previewLink: "https://vercel.com/",
    invert: true,
  },
  // Row 5
  {
    title: "C",
    icon: "https://skillicons.dev/icons?i=c",
    left: "5%", top: "58%",
    delay: 0.3,
    previewLink: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    title: "Firebase",
    icon: "https://skillicons.dev/icons?i=firebase",
    left: "75%", top: "57%",
    delay: 0.3,
    previewLink: "https://firebase.google.com/",
  },
  // Row 6
  {
    title: "GitHub",
    icon: "https://techstack-generator.vercel.app/github-icon.svg",
    left: "18%", top: "70%",
    delay: 0.35,
    previewLink: "https://github.com/",
    invert: true,
  },
  {
    title: "Postman",
    icon: "https://skillicons.dev/icons?i=postman",
    left: "68%", top: "68%",
    delay: 0.35,
    previewLink: "https://www.postman.com/",
  },
  // Row 7 - Bottom
  {
    title: "JavaScript",
    icon: "https://techstack-generator.vercel.app/js-icon.svg",
    left: "8%", top: "83%",
    delay: 0.4,
    previewLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "Python",
    icon: "https://techstack-generator.vercel.app/python-icon.svg",
    left: "30%", top: "85%",
    delay: 0.4,
    previewLink: "https://www.python.org/",
  },
  {
    title: "Git",
    icon: "https://skillicons.dev/icons?i=git",
    left: "52%", top: "83%",
    delay: 0.4,
    previewLink: "https://git-scm.com/",
  },
  {
    title: "TypeScript",
    icon: "https://techstack-generator.vercel.app/ts-icon.svg",
    left: "78%", top: "85%",
    delay: 0.4,
    previewLink: "https://www.typescriptlang.org/",
  },
  // Near the circle
  {
    title: "MySQL",
    icon: "https://techstack-generator.vercel.app/mysql-icon.svg",
    left: "28%", top: "35%",
    delay: 0.2,
    previewLink: "https://www.mysql.com/",
  },
  {
    title: "VS Code",
    icon: "https://skillicons.dev/icons?i=vscode",
    left: "62%", top: "65%",
    delay: 0.35,
    previewLink: "https://code.visualstudio.com/",
  },
]

/* ─── Shared skill card ─── */
function SkillCard({ skill }: { skill: typeof featuresData[0] }) {
  return (
    <LinkPreview url={skill.previewLink}>
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="flex items-center gap-2 md:gap-3 bg-card/60 backdrop-blur-sm border border-border/40 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl shadow-sm hover:shadow-md hover:border-border/80 transition-all cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.icon}
          alt={skill.title}
          className="w-6 h-6 md:w-7 md:h-7 object-contain flex-shrink-0"
          style={skill.invert ? { filter: "var(--icon-invert, none)" } : undefined}
        />
        <span className="text-xs md:text-sm font-medium text-foreground/80 whitespace-nowrap">
          {skill.title}
        </span>
      </motion.div>
    </LinkPreview>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* ═══════════════════════════════════════════
          MOBILE / SMALL TABLET  (< 768px)
          Grid layout — no floating, no circle
         ═══════════════════════════════════════════ */}
      <div className="md:hidden px-4 max-w-lg mx-auto">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-center mb-8 text-foreground"
        >
          Skills
        </motion.h3>

        {/* Grid of skill cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {featuresData.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.03 * i }}
              viewport={{ once: true }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TABLET + DESKTOP  (≥ 768px)
          Floating layout with center ring
         ═══════════════════════════════════════════ */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 relative">
        <div className="relative" style={{ minHeight: "clamp(550px, 60vw, 750px)" }}>

          {/* ── Center ring ── */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: "clamp(200px, 25vw, 340px)",
              height: "clamp(200px, 25vw, 340px)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full h-full relative flex items-center justify-center"
            >
              {/* Thick dark ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    rgba(255,255,255,0.06) 0deg,
                    rgba(255,255,255,0.02) 90deg,
                    rgba(255,255,255,0.08) 180deg,
                    rgba(255,255,255,0.03) 270deg,
                    rgba(255,255,255,0.06) 360deg
                  )`,
                  border: "2px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "inset 0 0 80px 20px rgba(0,0,0,0.6), 0 0 40px 5px rgba(255,255,255,0.02)",
                }}
              />
              {/* Inner hole (donut) */}
              <div
                className="rounded-full bg-background z-10 flex items-center justify-center"
                style={{
                  width: "65%",
                  height: "65%",
                  boxShadow: "inset 0 0 30px 10px rgba(0,0,0,0.3)",
                  border: "1.5px solid rgba(255,255,255,0.06)",
                }}
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-lg md:text-2xl font-semibold text-foreground/90 tracking-wide"
                >
                  Skills
                </motion.h3>
              </div>
            </motion.div>
          </div>

          {/* ── Floating items ── */}
          {featuresData.map((skill) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: skill.delay }}
              viewport={{ once: true }}
              className="absolute z-10"
              style={{ left: skill.left, top: skill.top }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}

        </div>
      </div>

      {/* Dark-mode icon inversion */}
      <style jsx global>{`
        :root { --icon-invert: none; }
        .dark { --icon-invert: invert(1); }
      `}</style>
    </section>
  )
}
