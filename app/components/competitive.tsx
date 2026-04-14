"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

const platforms = [
  {
    name: "LeetCode",
    link: "https://leetcode.com/u/theadarsh1m/",
    bigStat: "1832",
    statLabel: "Peak Rating",
    color: "from-amber-500 to-yellow-400",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgGlow: "bg-amber-500/10",
    meta: [
      "800+ problems solved across all difficulties",
      "Top 6.2% of users"
    ],
  },
  {
    name: "Codeforces",
    link: "https://codeforces.com/profile/theadarsh1m",
    bigStat: "Pupil",
    statLabel: "Max Rank Achieved",
    color: "from-[#77ff77] to-green-500",
    textColor: "text-[#77ff77]",
    borderColor: "border-[#77ff77]/30",
    bgGlow: "bg-[#77ff77]/10",
    meta: [
      "Consistent contest participation",
      "Ongoing rating improvement journey",
    ],
  },
]

export default function Competitive() {
  return (
    <section id="competitive" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#77ff77]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-3">
              — Competitive Programming
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Being Better with<br />
              <span className="gradient-text">Solving Problems</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {platforms.map((platform, index) => (
            <ScrollReveal key={platform.name} direction="up" delay={0.2 + index * 0.15}>
              <motion.a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="cursor-target group block relative h-full"
              >
                <div
                  className={`relative h-full bg-card border ${platform.borderColor} rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl`}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${platform.color}`} />

                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 ${platform.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative p-8">
                    {/* Platform name + link icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`text-sm font-mono font-bold tracking-widest uppercase ${platform.textColor}`}
                      >
                        {platform.name}
                      </span>
                      <ExternalLink
                        size={16}
                        className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    {/* Big stat */}
                    <div className="mb-2">
                      <motion.span
                        className={`text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      >
                        {platform.bigStat}
                      </motion.span>
                    </div>

                    {/* Stat label */}
                    <p className="text-sm text-muted-foreground font-medium mb-8">
                      {platform.statLabel}
                    </p>

                    {/* Divider */}
                    <div className={`w-12 h-px bg-gradient-to-r ${platform.color} mb-6 opacity-50`} />

                    {/* Meta rows */}
                    <ul className="space-y-3">
                      {platform.meta.map((row, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${platform.color} shrink-0`}
                          />
                          {row}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
