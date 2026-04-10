import Link from 'next/link'
import { ArrowLeft, Download, ExternalLink, Github, Linkedin } from 'lucide-react'
import ThemeToggle from '../components/theme-toggle'

export const metadata = {
  title: 'Resume | Adarsh Sachan',
  description: 'Professional resume of Adarsh Sachan, Full Stack Developer.',
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pointer-events-auto">
      <ThemeToggle />
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <Link
            href="/"
            className="cursor-target inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <a
            href="/resume.pdf"
            download="Adarsh_Sachan_Resume.pdf"
            className="cursor-target inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>

        {/* 1. Header Section */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Adarsh Sachan</h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">Full Stack Developer</h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <span>Kanpur, Uttar Pradesh</span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:adarshsachan01@gmail.com" className="cursor-target hover:text-primary transition-colors">
              adarshsachan01@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <span>7905022056</span>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a href="https://www.linkedin.com/in/adarshsachan01/" target="_blank" rel="noopener noreferrer" className="cursor-target p-2 bg-secondary rounded-full text-muted-foreground hover:text-blue-600 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/theadarsh1m" target="_blank" rel="noopener noreferrer" className="cursor-target p-2 bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <Link href="/" className="cursor-target p-2 bg-secondary rounded-full text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink size={20} />
            </Link>
          </div>
        </div>

        {/* 2. Career Objective */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold border-b border-border pb-2 mb-4 uppercase tracking-wider text-primary">Career Objective</h3>
          <p className="text-muted-foreground leading-relaxed">
            Full Stack Developer specializing in building scalable web applications using React, Node.js, and MongoDB. Strong foundation in Data Structures and Competitive Programming. Passionate about solving real-world problems and building impactful applications.
          </p>
        </div>

        {/* 3. Education */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold border-b border-border pb-2 mb-4 uppercase tracking-wider text-primary">Education</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <h4 className="font-bold text-foreground">B.Tech CSE</h4>
                <p className="text-muted-foreground text-sm">PSIT Kanpur</p>
              </div>
              <div className="text-left sm:text-right mt-1 sm:mt-0">
                <span className="text-sm font-medium text-foreground bg-secondary px-2 py-1 rounded">2023–2027</span>
                <p className="text-muted-foreground text-sm mt-1">76.51%</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 border-t border-border/50 pt-4">
              <div>
                <h4 className="font-semibold text-foreground text-sm">Intermediate</h4>
                <p className="text-muted-foreground text-sm">88.5%</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">High School</h4>
                <p className="text-muted-foreground text-sm">89.0%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Skills */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold border-b border-border pb-2 mb-4 uppercase tracking-wider text-primary">Skills</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-1 text-foreground">Programming</h4>
              <p className="text-muted-foreground text-sm">Java, C, JavaScript, TypeScript</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-foreground">Frontend</h4>
              <p className="text-muted-foreground text-sm">React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-foreground">Backend</h4>
              <p className="text-muted-foreground text-sm">Node.js, Express.js, REST APIs, JWT Authentication</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-foreground">Database</h4>
              <p className="text-muted-foreground text-sm">MongoDB, SQL</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-foreground">Core CS</h4>
              <p className="text-muted-foreground text-sm">Data Structures & Algorithms, OOP</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-foreground">Tools</h4>
              <p className="text-muted-foreground text-sm">Git, GitHub, Firebase, Postman, VS Code</p>
            </div>
          </div>
        </div>

        {/* 5. Projects */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold border-b border-border pb-2 mb-4 uppercase tracking-wider text-primary">Projects</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground">MEDICHAIN</h4>
              </div>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 ml-1">
                <li>Full-stack healthcare platform with role-based access</li>
                <li>Built REST APIs using MongoDB and Firebase Auth</li>
                <li>Integrated AI assistant using Gemini API</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground">LEGALEASE</h4>
              </div>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 ml-1">
                <li>AI-powered legal assistant for FIR and RTI drafting</li>
                <li>Implemented RAG for accurate responses</li>
                <li>Reduced document preparation time by 50%</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-foreground">CONSOLED</h4>
              </div>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 ml-1">
                <li>Terminal UI framework inspired by React/Flutter</li>
                <li>Built component-based architecture in Go</li>
                <li>Designed event-driven UI system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6. Achievements & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold border-b border-border pb-2 mb-4 uppercase tracking-wider text-primary">Achievements</h3>
            <ul className="list-none space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                LeetCode Rating: 1823 (Top 6.2%)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Solved 1000+ DSA problems
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Hack O' Clock Hackathon Finalist
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold border-b border-border pb-2 mb-4 uppercase tracking-wider text-primary">Certifications</h3>
            <ul className="list-none space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <div>
                  <p className="font-medium text-foreground">TCS CodeVita Season 13 (Global Rank of 5667)</p>
                  <p className="text-xs">Tata Consultancy Services • 2024</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <div>
                  <p className="font-medium text-foreground">Programming in C</p>
                  <p className="text-xs">NPTEL - IIT Kanpur</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <div>
                  <p className="font-medium text-foreground">Programming in Java</p>
                  <p className="text-xs">NPTEL - IIT Kharagpur</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  )
}
