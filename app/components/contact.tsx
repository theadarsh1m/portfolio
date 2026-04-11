"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, MapPin, Send, Github, Linkedin, FileText, CheckCircle, AlertCircle } from "lucide-react"
import ScrollReveal from "./scroll-reveal"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Reset form on success
      setFormData({ name: "", email: "", message: "", honeypot: "" })
      setStatus("success")
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
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
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=2k23.cs2312635%40gmail.com",
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
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          {/* Section header with up reveal */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Let's Connect</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    I'm currently seeking internship opportunities and freelance projects. Whether you have a project in
                    mind, want to collaborate, or just want to say hello, I'd love to hear from you!
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{
                        x: 12,
                        scale: 1.02,
                        boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="cursor-target flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-muted transition-colors duration-200"
                      aria-label={info.title}
                    >
                      <motion.div
                        className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <info.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.title}</h4>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Follow Me</h4>
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
                        className={`cursor-target p-3 bg-secondary rounded-lg text-muted-foreground ${social.color} transition-colors duration-200`}
                        aria-label={social.title}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>

                  <div className="pt-6 mt-4 border-t border-border/50">
                    <motion.a
                      href="/resume"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="cursor-target inline-flex items-center gap-2 px-6 py-3 bg-background border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300 shadow-sm"
                      aria-label="View Resume"
                    >
                      <FileText size={18} />
                      View Resume
                    </motion.a>
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
                className="bg-card p-8 rounded-xl"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from users, visible to bots) */}
                  <input
                    type="text"
                    name="honeypot"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                  />

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg"
                    >
                      <CheckCircle size={20} className="shrink-0" />
                      <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg"
                    >
                      <AlertCircle size={20} className="shrink-0" />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
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
                      className="cursor-target w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 text-foreground"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
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
                      className="cursor-target w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 text-foreground"
                      placeholder="your.email@example.com"
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground/80">
                      * Please use your real email so I can reply to you.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted-foreground mb-2"
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
                      className="cursor-target w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200 text-foreground resize-none"
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
                    className="cursor-target w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
