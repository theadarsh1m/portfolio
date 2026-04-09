"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LinkPreview } from "./link-preview"

// Centralizing configuration data using specific SVG icons
const featuresData = [
  {
    title: "HTML",
    icon: <img src="https://skillicons.dev/icons?i=html" alt="HTML" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[5%] top-[10%]",
    delay: 0.1,
    previewLink: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    title: "CSS",
    icon: <img src="https://skillicons.dev/icons?i=css" alt="CSS" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[5%] top-[10%]",
    delay: 0.1,
    previewLink: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    title: "JavaScript",
    icon: <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="JavaScript" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[5%] bottom-[10%]",
    delay: 0.5,
    previewLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    title: "TypeScript",
    icon: <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="TypeScript" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[5%] bottom-[10%]",
    delay: 0.5,
    previewLink: "https://www.typescriptlang.org/",
  },
  {
    title: "React",
    icon: <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[25%] top-[10%]",
    delay: 0.1,
    previewLink: "https://react.dev/",
  },
  {
    title: "MySQL",
    icon: <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="MySQL" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[25%] top-[10%]",
    delay: 0.1,
    previewLink: "https://www.mysql.com/",
  },
  {
    title: "Java",
    icon: <img src="https://techstack-generator.vercel.app/java-icon.svg" alt="Java" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[25%] bottom-[10%]",
    delay: 0.5,
    previewLink: "https://www.java.com/",
  },
  {
    title: "C",
    icon: <img src="https://skillicons.dev/icons?i=c" alt="C" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[25%] bottom-[10%]",
    delay: 0.5,
    previewLink: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    title: "Firebase",
    icon: <img src="https://skillicons.dev/icons?i=firebase" alt="Firebase" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[5%] top-[35%]",
    delay: 0.2,
    previewLink: "https://firebase.google.com/",
  },
  {
    title: "Bootstrap",
    icon: <img src="https://skillicons.dev/icons?i=bootstrap" alt="Bootstrap" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[5%] top-[35%]",
    delay: 0.2,
    previewLink: "https://getbootstrap.com/",
  },
  {
    title: "Tailwind",
    icon: <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[5%] bottom-[35%]",
    delay: 0.4,
    previewLink: "https://tailwindcss.com/",
  },
  {
    title: "Node.js",
    icon: <img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[5%] bottom-[35%]",
    delay: 0.4,
    previewLink: "https://nodejs.org/",
  },
  {
    title: "Express.js",
    icon: <img src="https://skillicons.dev/icons?i=express" alt="Express.js" className="w-6 h-6 md:w-8 md:h-8 object-contain dark:invert" />,
    position: "left-[15%] top-[20%]",
    delay: 0.15,
    previewLink: "https://expressjs.com/",
  },
  {
    title: "MongoDB",
    icon: <img src="https://skillicons.dev/icons?i=mongodb" alt="MongoDB" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "right-[15%] top-[20%]",
    delay: 0.15,
    previewLink: "https://www.mongodb.com/",
  },
  {
    title: "Git",
    icon: <img src="https://skillicons.dev/icons?i=git" alt="Git" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[15%] bottom-[20%]",
    delay: 0.45,
    previewLink: "https://git-scm.com/",
  },
  {
    title: "GitHub",
    icon: <img src="https://techstack-generator.vercel.app/github-icon.svg" alt="GitHub" className="w-6 h-6 md:w-8 md:h-8 object-contain dark:invert" />,
    position: "right-[15%] bottom-[20%]",
    delay: 0.45,
    previewLink: "https://github.com/",
  },
  {
    title: "VS Code",
    icon: <img src="https://skillicons.dev/icons?i=vscode" alt="VS Code" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[45%] top-[10%]",
    delay: 0.1,
    previewLink: "https://code.visualstudio.com/",
  },
  {
    title: "Postman",
    icon: <img src="https://skillicons.dev/icons?i=postman" alt="Postman" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[55%] top-[10%]",
    delay: 0.1,
    previewLink: "https://www.postman.com/",
  },
  {
    title: "REST API",
    icon: <img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="REST API" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[45%] bottom-[10%]",
    delay: 0.5,
    previewLink: "https://restfulapi.net/",
  },
  {
    title: "Python",
    icon: <img src="https://techstack-generator.vercel.app/python-icon.svg" alt="Python" className="w-6 h-6 md:w-8 md:h-8 object-contain" />,
    position: "left-[55%] bottom-[10%]",
    delay: 0.5,
    previewLink: "https://www.python.org/",
  },
]

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      id="skills"
      ref={containerRef}
      className="container w-full mx-auto mt-5 md:mt-0 py-12 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:20px_20px] opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      <div className="container px-4 md:px-6 relative mx-auto">
        <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
          {/* Center Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center pointer-events-none"
          >
            <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-background border border-border/50 shadow-lg flex items-center justify-center p-6 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-lg md:text-2xl font-bold mb-2">Skills</h3>
              </div>
            </div>
          </motion.div>

          {/* Floating Skills around the Orb */}
          {featuresData.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureItemProps {
  title: string
  icon: React.ReactNode
  position: string
  delay: number
  previewLink: string
}

function FeatureItem({ title, icon, position, delay, previewLink }: FeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`absolute z-10 ${position}`}
    >
      <LinkPreview url={previewLink} className="z-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-0 md:gap-3 bg-card/80 backdrop-blur-sm border border-border/50 p-2 md:p-3 rounded-lg shadow-sm hover:shadow-md hover:border-ring transition-all max-w-[150px] md:max-w-[200px]"
        >
          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white shrink-0 text-3xl bg-background">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-xs md:text-sm hidden md:flex text-foreground">
              {title}
            </h4>
          </div>
        </motion.div>
      </LinkPreview>
    </motion.div>
  )
}

