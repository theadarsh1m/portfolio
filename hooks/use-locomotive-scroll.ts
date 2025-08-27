"use client"

import { useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

export function useLocomotiveScroll() {
  const { scrollY, scrollYProgress } = useScroll()

  // Smooth spring-based scroll values for locomotive feel
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  })

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  })

  // Parallax factors for different scroll speeds
  const slowParallax = useTransform(smoothScrollY, [0, 1000], [0, -100])
  const mediumParallax = useTransform(smoothScrollY, [0, 1000], [0, -200])
  const fastParallax = useTransform(smoothScrollY, [0, 1000], [0, -400])

  return {
    scrollY: smoothScrollY,
    scrollYProgress: smoothScrollProgress,
    slowParallax,
    mediumParallax,
    fastParallax,
  }
}

export function useScrollTrigger(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > threshold && !hasTriggered) {
      setIsInView(true)
      setHasTriggered(true)
    }
  })

  return { isInView, hasTriggered }
}
