"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import { useLocomotiveScroll } from "../../hooks/use-locomotive-scroll"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { slowParallax } = useLocomotiveScroll()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)

    // Show success message
    alert("Message sent successfully!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "2k23.cs2312635@gmail.com",
      href: "mailto:2k23.cs2312635@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kanpur, Uttar Pradesh, India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      title: "GitHub",
      href: "https://github.com/theadarsh1m",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/adarshsachan01/",
      color: "hover:text-blue-600",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div style={{ y: slowParallax }} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 bg-blue-500/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.2, 0.05],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section header with up reveal */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                technology
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information with left reveal */}
            <ScrollReveal direction="left" delay={0.4}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    I'm currently seeking internship opportunities and freelance projects. Whether you have a project in
                    mind, want to collaborate, or just want to say hello, I'd love to hear from you!
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      whileHover={{
                        x: 12,
                        scale: 1.02,
                        boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <motion.div
                        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <info.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{info.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.title}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.15,
                          y: -5,
                          boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                          rotate: [0, -10, 10, 0],
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          rotate: { duration: 0.6 },
                        }}
                        className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-200`}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form with right reveal */}
            <ScrollReveal direction="right" delay={0.6}>
              <motion.div
                whileHover={{
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 text-gray-900 dark:text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
