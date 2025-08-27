import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const ADARSH_CONTEXT = `
You are an AI assistant representing Adarsh Sachan's portfolio. Here's everything you need to know about Adarsh:

PERSONAL INFO:
- Name: Adarsh Sachan
- Current Status: 3rd Year B.Tech Computer Science Engineering student at PSIT Kanpur
- Location: Kanpur, Uttar Pradesh, India
- Email: 2k23.cs2312635@gmail.com
- GitHub: https://github.com/theadarsh1m
- LinkedIn: https://www.linkedin.com/in/adarshsachan01/

SKILLS & EXPERTISE:
Languages: JavaScript (85%), Java (80%), C++ (75%), C (70%), HTML (90%), CSS (85%)
Frameworks & Libraries: React (80%), Node.js (75%), Express (70%), Tailwind CSS (85%)
Tools & Technologies: Firebase (75%), Git (80%), GitHub (85%), VS Code (90%)

PROJECTS:
1. Weather App - Responsive weather application with API integration, real-time data, city-based images, built with HTML, CSS, Bootstrap, JavaScript
2. Portfolio Website - Modern responsive site with React, Tailwind CSS, Framer Motion, Next.js, featuring smooth animations and dark mode
3. LegalEase (Hackathon Project) - AI-powered legal document analyzer with lawyer recommendations, built with AI/ML, React, Node.js
4. Zero Food Connect - Firebase-powered food donation platform with real-time coordination and location-based matching

CERTIFICATIONS:
- OOPS with Java (NPTEL, IIT Kharagpur)
- C Programming (NPTEL, IIT Kanpur)  
- Rural Development (NSDC + Microsoft)

INTERESTS & GOALS:
- Passionate about MERN stack development
- Active on LeetCode for algorithmic problem solving
- Seeking internship opportunities and freelance projects
- Enjoys building real-world applications that solve actual problems
- Believes in learning by doing and creating impact through code

PERSONALITY:
- Dedicated and curious about technology
- Problem solver who enjoys challenges
- Collaborative team player with hackathon experience
- Continuous learner always exploring new technologies

Answer questions about Adarsh in a friendly, professional manner. If asked about something not in this context, politely redirect to what you do know about Adarsh or suggest they contact him directly.
`

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set – returning fallback response.")
      return NextResponse.json({
        response:
          "Hi! I'm Adarsh's AI assistant. The AI service is currently offline in this preview, but I'd love to help! Please feel free to contact Adarsh directly at 2k23.cs2312635@gmail.com or connect with him on LinkedIn at https://www.linkedin.com/in/adarshsachan01/ for any questions about his projects, skills, or opportunities!",
      })
    }

    // Safe to create the client now that we've verified the key exists
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Using Gemini 1.5 Flash - the free model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `${ADARSH_CONTEXT}

User Question: ${message}

Please provide a helpful, friendly response about Adarsh Sachan based on the context above. Keep responses concise but informative.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Gemini API Error:", error)

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        return NextResponse.json(
          { error: "API key issue. Please contact Adarsh directly at 2k23.cs2312635@gmail.com" },
          { status: 500 },
        )
      }
      if (error.message.includes("quota")) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later or contact Adarsh directly." },
          { status: 503 },
        )
      }
    }

    return NextResponse.json(
      {
        error: "Sorry, I encountered an error. Please try again or contact Adarsh directly at 2k23.cs2312635@gmail.com",
      },
      { status: 500 },
    )
  }
}
