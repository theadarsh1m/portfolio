"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect } from "react"

interface LocomotiveContainerProps {
  children: React.ReactNode
}

export default function LocomotiveContainer({ children }: LocomotiveContainerProps) {
  useEffect(() => {
    // Enhanced smooth scrolling CSS
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 4rem;
      }
      
      body {
        overflow-x: hidden;
      }

      /* Locomotive-style smooth scrolling */
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scroll-behavior: inherit;
        }
        
        /* Enhanced momentum scrolling */
        body {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: none;
        }
      }

      /* Custom scrollbar with locomotive styling */
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        border-radius: 3px;
        transition: all 0.3s ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #2563eb, #7c3aed);
      }

      /* Locomotive-style easing */
      .locomotive-ease {
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .locomotive-ease-out {
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      }

      .locomotive-ease-in-out {
        transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="locomotive-container"
    >
      {children}
    </motion.div>
  )
}
