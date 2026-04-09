"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Phase 1: Initial load and name animation (1.5s)
    const phase1Timer = setTimeout(() => {
      setAnimationPhase(1)
    }, 1500)

    // Phase 2: Prepare for exit (2s)
    const phase2Timer = setTimeout(() => {
      setAnimationPhase(2)
    }, 2000)

    // Phase 3: Start fade out (2.5s)
    const exitTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    // Phase 4: Complete removal (3s)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearTimeout(phase1Timer)
      clearTimeout(phase2Timer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {mounted && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          {/* Name with sophisticated animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* First name */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white tracking-wider"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <motion.span
                className="inline-block"
                animate={
                  animationPhase === 0
                    ? {
                        scale: [1, 1.05, 1],
                        textShadow: [
                          "0 0 0px rgba(59, 130, 246, 0)",
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                          "0 0 0px rgba(59, 130, 246, 0)",
                        ],
                      }
                    : animationPhase === 1
                      ? {
                          scale: [1, 1.1, 1],
                          color: ["#ffffff", "#3b82f6", "#ffffff"],
                        }
                      : {
                          scale: 1.2,
                          y: -10,
                          textShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
                        }
                }
                transition={{
                  duration: animationPhase === 2 ? 0.5 : 2,
                  repeat: animationPhase === 2 ? 0 : Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Adarsh
              </motion.span>
            </motion.h1>

            {/* Last name */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent tracking-wider"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="inline-block"
                animate={
                  animationPhase === 0
                    ? {
                        scale: [1, 1.05, 1],
                        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                      }
                    : animationPhase === 1
                      ? {
                          scale: [1, 1.1, 1],
                          filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                        }
                      : {
                          scale: 1.2,
                          y: -10,
                          filter: "brightness(1.5)",
                        }
                }
                transition={{
                  duration: animationPhase === 2 ? 0.5 : 2,
                  repeat: animationPhase === 2 ? 0 : Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                Sachan
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle that appears in phase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8"
          >
            <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide">Full-Stack Developer</p>
          </motion.div>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gradient overlay for smooth transition */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20"
          animate={animationPhase === 2 ? { opacity: [0, 1] } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
