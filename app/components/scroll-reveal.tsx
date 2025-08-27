"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  })

  const directionVariants = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: -60, opacity: 0 },
    right: { x: 60, opacity: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Locomotive easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
