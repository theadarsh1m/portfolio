"use client"

import { useScroll, useTransform } from "framer-motion"

export function useScrollVelocityFactor() {
  const { scrollY } = useScroll()

  // Simple scroll-based transforms without velocity
  const scrollFactor = useTransform(scrollY, [0, 1000], [1, 1.2])
  const slowFactor = useTransform(scrollY, [0, 1000], [1, 1.1])
  const fastFactor = useTransform(scrollY, [0, 1000], [1, 1.5])

  return {
    smoothVelocity: scrollY,
    velocityFactor: scrollFactor,
    slowVelocity: slowFactor,
    fastVelocity: fastFactor,
  }
}
