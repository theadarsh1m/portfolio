import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"

type KnowledgeSection = "website" | "resume"

interface Project {
  name: string
  summary: string
  stack: string[]
  highlights: string[]
  github?: string
  demo?: string
  status?: "live" | "in-development"
}

interface KnowledgeItem {
  id: string
  section: KnowledgeSection
  title: string
  text: string
  keywords: string[]
}

interface PreparedKnowledgeItem extends KnowledgeItem {
  normalizedText: string
  normalizedKeywords: string[]
  tokenFrequency: Record<string, number>
}

interface ScoredKnowledgeMatch {
  item: PreparedKnowledgeItem
  score: number
}

type LocalDecision =
  | {
      action: "respond-local"
      response: string
      source: string
    }
  | {
      action: "fallback-api"
      normalizedQuestion: string
    }

interface CachedFallbackResponse {
  response: string
  expiresAt: number
}

const GEMINI_MODEL_CANDIDATES = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"]
const MIN_LOCAL_MATCH_SCORE = 10
const MAX_FALLBACK_QUESTION_LENGTH = 320
const FALLBACK_CACHE_TTL_MS = 1000 * 60 * 30
const MAX_CACHE_ENTRIES = 200

const FALLBACK_RESPONSE_CACHE = new Map<string, CachedFallbackResponse>()

const CONTACT = {
  name: "Adarsh Sachan",
  role: "Full Stack Developer",
  location: "Kanpur, Uttar Pradesh, India",
  primaryEmail: "2k23.cs2312635@gmail.com",
  alternateEmail: "adarshsachan01@gmail.com",
  phone: "7905022056",
  github: "https://github.com/theadarsh1m",
  linkedin: "https://www.linkedin.com/in/adarshsachan01/",
}

const EDUCATION = [
  "B.Tech CSE at PSIT Kanpur (2023-2027), current score 76.51%.",
  "Intermediate score: 88.5%.",
  "High School score: 89.0%.",
]

const SKILLS = {
  programming: ["Java", "C", "JavaScript", "TypeScript", "Python", "C++"],
  frontend: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  databases: ["MongoDB", "SQL", "MySQL"],
  tools: ["Git", "GitHub", "Firebase", "Postman", "VS Code", "Vercel"],
  core: ["Data Structures", "Algorithms", "Object-Oriented Programming"],
}

const PROJECTS: Project[] = [
  {
    name: "MediChain",
    summary: "Full-stack healthcare platform with role-based access for patients, doctors, and hospitals.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Firebase", "Gemini AI"],
    highlights: [
      "Built secure REST APIs with MongoDB and Firebase authentication.",
      "Added AI-powered lab report analysis and telemedicine chat capabilities.",
    ],
    github: "https://github.com/theadarsh1m/MediChain",
    demo: "https://medichainreal.netlify.app/",
    status: "live",
  },
  {
    name: "LegalEase",
    summary: "AI-powered legal assistant focused on FIR and RTI drafting.",
    stack: ["Next.js", "MongoDB", "Firebase", "RAG", "Cloudinary", "Gemini AI"],
    highlights: [
      "Implemented retrieval-augmented generation for accurate legal query responses.",
      "Reduced document preparation time by around 50%.",
    ],
    github: "https://github.com/theadarsh1m/Justice-Ally.git",
    status: "live",
  },
  {
    name: "CONSOLED",
    summary: "Component-based terminal UI framework inspired by React and Flutter.",
    stack: ["Go", "ANSI Escape Codes", "Event Systems", "Layout Engines"],
    highlights: [
      "Designed an event-driven architecture for terminal interactions.",
      "Built reusable UI components and layout management patterns.",
    ],
    status: "in-development",
  },
  {
    name: "ShaadiCrasher",
    summary: "Discovery app for nearby weddings with live updates.",
    stack: ["React", "Firebase", "Cloudinary", "Ola Maps API"],
    highlights: [
      "Included Google authentication and location-based proximity sorting.",
      "Added automatic cleanup for expired wedding invites.",
    ],
    github: "https://github.com/theadarsh1m/ShaadiCrasher",
    demo: "https://shaadicrasher.netlify.app/",
    status: "live",
  },
  {
    name: "Nickly",
    summary: "URL shortener with analytics dashboard and click tracking.",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Chart.js"],
    highlights: [
      "Managed 100+ test URLs with custom short IDs.",
      "Implemented click history, pagination, and visual analytics.",
    ],
    github: "https://github.com/theadarsh1m/Nickly",
    demo: "https://nickly.onrender.com/",
    status: "live",
  },
]

const ACHIEVEMENTS = [
  "LeetCode rating 1823 (top 6.2%).",
  "Solved 1000+ DSA problems.",
  "Hack O' Clock Hackathon Finalist.",
]

const CERTIFICATIONS = [
  "TCS CodeVita Season 13 (2024), Global Rank 5667.",
  "Introduction to Programming in C (NPTEL, IIT Kanpur).",
  "Programming in Java (NPTEL, IIT Kharagpur).",
]

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "for",
  "of",
  "in",
  "on",
  "at",
  "is",
  "are",
  "am",
  "be",
  "about",
  "with",
  "me",
  "my",
  "his",
  "her",
  "their",
  "tell",
  "what",
  "which",
  "who",
  "how",
  "can",
  "you",
  "does",
  "do",
  "did",
  "i",
  "we",
  "they",
  "he",
  "she",
  "it",
  "this",
  "that",
  "from",
  "as",
  "into",
  "by",
  "your",
  "please",
  "want",
  "know",
])

const joinList = (items: string[]) => {
  if (items.length === 0) return ""
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`
}

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const tokenize = (value: string) =>
  normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))

const buildTokenFrequency = (tokens: string[]) => {
  const frequency: Record<string, number> = {}

  for (const token of tokens) {
    frequency[token] = (frequency[token] ?? 0) + 1
  }

  return frequency
}

const hasAnyKeyword = (normalizedQuestion: string, keywords: string[]) => {
  const questionTokens = new Set(normalizedQuestion.split(" ").filter(Boolean))

  return keywords.some((rawKeyword) => {
    const keyword = normalizeText(rawKeyword)
    if (!keyword) return false

    if (keyword.includes(" ")) {
      return normalizedQuestion.includes(keyword)
    }

    return questionTokens.has(keyword)
  })
}

const PROJECT_NAME_KEYWORDS = PROJECTS.map((project) => normalizeText(project.name))

const PORTFOLIO_SCOPE_KEYWORDS = [
  "adarsh",
  "portfolio",
  "resume",
  "skills",
  "projects",
  "education",
  "achievements",
  "certifications",
  "contact",
  "internship",
  "freelance",
  "experience",
  "career",
  "psit",
  "kanpur",
  "leetcode",
  ...PROJECT_NAME_KEYWORDS,
]

const CODE_REQUEST_PATTERNS = [
  /\b(write|generate|create|give|show|solve)\s+(me\s+)?(a\s+)?(code|program|script|function|solution)\b/,
  /\b(prime|fibonacci|factorial|leetcode|binary search|dynamic programming|sorting)\b/,
  /\b(c\+\+|python|java|javascript|typescript|go|rust)\s+(code|program|solution)\b/,
]

const isMathOnlyPrompt = (rawQuestion: string) => {
  const compact = rawQuestion.replace(/\s+/g, "")
  const isExpressionOnly =
    /^[\d()+\-*/%^=.,]+$/.test(compact) && /\d/.test(compact) && /[+\-*/%^=]/.test(compact)

  if (isExpressionOnly) return true

  const normalized = normalizeText(rawQuestion)
  const hasMathWords = /\b(solve|calculate|equation|arithmetic|math)\b/.test(normalized)
  return hasMathWords && /\d/.test(rawQuestion)
}

const isCodingRequestPrompt = (normalizedQuestion: string) =>
  CODE_REQUEST_PATTERNS.some((pattern) => pattern.test(normalizedQuestion))

const isOutOfScopePrompt = (normalizedQuestion: string) =>
  !hasAnyKeyword(normalizedQuestion, PORTFOLIO_SCOPE_KEYWORDS)

const shouldBlockWithoutApi = (rawQuestion: string, normalizedQuestion: string) =>
  isMathOnlyPrompt(rawQuestion) || isCodingRequestPrompt(normalizedQuestion)

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: "profile-overview",
    section: "website",
    title: "Profile Overview",
    text:
      "Adarsh Sachan is a Full Stack Developer and B.Tech Computer Science student at PSIT Kanpur. He focuses on building practical web applications and solving real-world problems.",
    keywords: ["profile", "about", "background", "full stack", "psit"],
  },
  {
    id: "career-objective",
    section: "resume",
    title: "Career Objective",
    text:
      "He specializes in scalable web apps using React, Node.js, and MongoDB, with a strong foundation in data structures and competitive programming.",
    keywords: ["objective", "goal", "career", "specialization", "competitive programming"],
  },
  {
    id: "availability",
    section: "website",
    title: "Availability",
    text:
      "He is actively seeking internship opportunities and freelance projects, and is open to collaborating on impactful products.",
    keywords: ["internship", "hire", "available", "freelance", "opportunity", "collaboration"],
  },
  {
    id: "education",
    section: "resume",
    title: "Education",
    text: EDUCATION.join(" "),
    keywords: ["education", "college", "btech", "psit", "scores", "academics"],
  },
  {
    id: "skills-overview",
    section: "website",
    title: "Skills Overview",
    text: `Programming: ${joinList(SKILLS.programming)}. Frontend: ${joinList(SKILLS.frontend)}. Backend: ${joinList(SKILLS.backend)}. Databases: ${joinList(SKILLS.databases)}. Tools: ${joinList(SKILLS.tools)}. Core CS: ${joinList(SKILLS.core)}.`,
    keywords: ["skills", "tech stack", "languages", "frontend", "backend", "database", "tools"],
  },
  {
    id: "achievements",
    section: "resume",
    title: "Achievements",
    text: ACHIEVEMENTS.join(" "),
    keywords: ["achievements", "leetcode", "dsa", "hackathon", "rating"],
  },
  {
    id: "certifications",
    section: "resume",
    title: "Certifications",
    text: CERTIFICATIONS.join(" "),
    keywords: ["certifications", "certificate", "nptel", "codevita", "iit"],
  },
  {
    id: "contact",
    section: "website",
    title: "Contact",
    text: `Email: ${CONTACT.primaryEmail} (alternate: ${CONTACT.alternateEmail}). Phone: ${CONTACT.phone}. GitHub: ${CONTACT.github}. LinkedIn: ${CONTACT.linkedin}. Location: ${CONTACT.location}.`,
    keywords: ["contact", "email", "phone", "github", "linkedin", "location"],
  },
  ...PROJECTS.map((project) => ({
    id: `project-${normalizeText(project.name).replace(/\s+/g, "-")}`,
    section: "website" as const,
    title: `${project.name} Project`,
    text: `${project.name} is ${project.summary} Tech stack: ${joinList(project.stack)}. Highlights: ${project.highlights.join(" ")}${project.status === "in-development" ? " It is currently in development." : ""}${project.demo ? ` Live demo: ${project.demo}.` : ""}${project.github ? ` GitHub: ${project.github}.` : ""}`,
    keywords: [
      "project",
      "portfolio",
      project.name,
      ...project.stack,
      ...(project.status === "in-development" ? ["wip", "in development"] : []),
    ],
  })),
]

const PREPARED_KNOWLEDGE: PreparedKnowledgeItem[] = KNOWLEDGE_BASE.map((item) => {
  const searchableText = `${item.title} ${item.text} ${item.keywords.join(" ")}`
  const tokens = tokenize(searchableText)

  return {
    ...item,
    normalizedText: normalizeText(searchableText),
    normalizedKeywords: item.keywords.map((keyword) => normalizeText(keyword)),
    tokenFrequency: buildTokenFrequency(tokens),
  }
})

const scoreKnowledgeItem = (
  normalizedQuestion: string,
  questionTokens: string[],
  item: PreparedKnowledgeItem,
) => {
  let score = 0

  for (const token of questionTokens) {
    const frequency = item.tokenFrequency[token]
    if (frequency) {
      score += 2 + Math.min(frequency, 3)
    }
  }

  for (const keyword of item.normalizedKeywords) {
    if (keyword && normalizedQuestion.includes(keyword)) {
      score += 4
    }
  }

  if (normalizedQuestion.length > 10 && item.normalizedText.includes(normalizedQuestion)) {
    score += 8
  }

  return score
}

const findKnowledgeMatchesWithScores = (question: string, limit = 3): ScoredKnowledgeMatch[] => {
  const normalizedQuestion = normalizeText(question)
  const questionTokens = tokenize(question)

  return PREPARED_KNOWLEDGE.map((item) => ({
    item,
    score: scoreKnowledgeItem(normalizedQuestion, questionTokens, item),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

const truncate = (value: string, maxLength = 220) => {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 3).trim()}...`
}

const buildProjectsResponse = (normalizedQuestion: string) => {
  const specificProject = PROJECTS.find((project) =>
    normalizedQuestion.includes(normalizeText(project.name)),
  )

  if (specificProject) {
    return `${specificProject.name}: ${specificProject.summary} Key highlights: ${specificProject.highlights.join(" ")} Tech stack: ${joinList(specificProject.stack)}.${specificProject.demo ? ` Live demo: ${specificProject.demo}.` : ""}${specificProject.github ? ` GitHub: ${specificProject.github}.` : ""}`
  }

  const projectSummaries = PROJECTS.map((project) => {
    const statusSuffix = project.status === "in-development" ? " (in development)" : ""
    return `${project.name}${statusSuffix}: ${project.summary}`
  }).join(" ")

  return `Here are Adarsh's key projects from his website and resume: ${projectSummaries}`
}

const buildSkillsResponse = () =>
  `Adarsh's core skills are: Programming - ${joinList(SKILLS.programming)}. Frontend - ${joinList(SKILLS.frontend)}. Backend - ${joinList(SKILLS.backend)}. Databases - ${joinList(SKILLS.databases)}. Tools - ${joinList(SKILLS.tools)}. Core CS - ${joinList(SKILLS.core)}.`

const buildContactResponse = () =>
  `You can reach Adarsh at ${CONTACT.primaryEmail} (alternate: ${CONTACT.alternateEmail}) or phone ${CONTACT.phone}. GitHub: ${CONTACT.github} and LinkedIn: ${CONTACT.linkedin}. He is based in ${CONTACT.location}.`

const buildEducationResponse = () => `Education details: ${EDUCATION.join(" ")}`

const buildAchievementsResponse = () =>
  `Achievements: ${ACHIEVEMENTS.join(" ")} Certifications: ${CERTIFICATIONS.join(" ")}`

const buildKnowledgeMatchResponse = (matches: PreparedKnowledgeItem[]) => {
  const combined = matches.map((match) => truncate(match.text)).join(" ")
  const sources = Array.from(new Set(matches.map((match) => match.section))).join(" and ")

  return `Based on Adarsh's ${sources}: ${combined}`
}

const isModelUnavailableError = (error: unknown) => {
  if (!(error instanceof Error)) return false
  const message = error.message.toLowerCase()
  return message.includes("not found") || message.includes("not supported for generatecontent")
}

const getCachedFallbackResponse = (normalizedQuestion: string) => {
  const cached = FALLBACK_RESPONSE_CACHE.get(normalizedQuestion)

  if (!cached) return null

  if (cached.expiresAt < Date.now()) {
    FALLBACK_RESPONSE_CACHE.delete(normalizedQuestion)
    return null
  }

  return cached.response
}

const setCachedFallbackResponse = (normalizedQuestion: string, response: string) => {
  if (FALLBACK_RESPONSE_CACHE.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = FALLBACK_RESPONSE_CACHE.keys().next().value
    if (oldestKey) {
      FALLBACK_RESPONSE_CACHE.delete(oldestKey)
    }
  }

  FALLBACK_RESPONSE_CACHE.set(normalizedQuestion, {
    response,
    expiresAt: Date.now() + FALLBACK_CACHE_TTL_MS,
  })
}

const buildFallbackContext = () => {
  const projectContext = PROJECTS.map(
    (project, index) =>
      `${index + 1}. ${project.name}: ${project.summary} Stack: ${joinList(project.stack)}. Highlights: ${project.highlights.join(" ")}`,
  ).join("\n")

  return `You are Adarsh Sachan's portfolio assistant.

Use only the following profile data:
- Name: ${CONTACT.name}
- Role: ${CONTACT.role}
- Location: ${CONTACT.location}
- Email: ${CONTACT.primaryEmail}
- GitHub: ${CONTACT.github}
- LinkedIn: ${CONTACT.linkedin}
- Education: ${EDUCATION.join(" ")}
- Skills: Programming (${joinList(SKILLS.programming)}), Frontend (${joinList(SKILLS.frontend)}), Backend (${joinList(SKILLS.backend)}), Databases (${joinList(SKILLS.databases)}), Tools (${joinList(SKILLS.tools)}), Core (${joinList(SKILLS.core)})
- Achievements: ${ACHIEVEMENTS.join(" ")}
- Certifications: ${CERTIFICATIONS.join(" ")}
- Projects:\n${projectContext}

Rules:
1) Answer only portfolio/resume related questions.
2) If asked math, coding exercises, or general tasks, refuse and redirect to portfolio topics.
3) If information is not in the data above, say you don't have that detail yet and provide contact links.
4) Keep response concise and practical.`
}

const FALLBACK_CONTEXT = buildFallbackContext()

const generateApiFallbackResponse = async (question: string) => {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return "I couldn't find that exact detail in the local profile data, and external AI fallback is currently disabled. Please contact Adarsh directly at 2k23.cs2312635@gmail.com or via LinkedIn: https://www.linkedin.com/in/adarshsachan01/."
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const prompt = `${FALLBACK_CONTEXT}\n\nUser question: ${question}`

  let lastError: unknown

  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text().trim()

      if (!text) {
        throw new Error(`Model ${modelName} returned an empty response`)
      }

      return text
    } catch (error) {
      lastError = error

      if (isModelUnavailableError(error)) {
        continue
      }

      throw error
    }
  }

  throw lastError ?? new Error("No supported Gemini model is available for fallback")
}

const evaluateLocalQuestion = (question: string): LocalDecision => {
  const normalizedQuestion = normalizeText(question)

  if (!normalizedQuestion) {
    return {
      action: "respond-local",
      response: "Please ask a question about Adarsh's portfolio or resume, and I'll help.",
      source: "local-validation",
    }
  }

  if (hasAnyKeyword(normalizedQuestion, ["hi", "hello", "hey", "namaste"])) {
    return {
      action: "respond-local",
      response:
        "Hi! I'm Adarsh's portfolio assistant. I answer using information from his website and resume only. Ask me about projects, skills, education, achievements, or contact details.",
      source: "local-greeting",
    }
  }

  if (shouldBlockWithoutApi(question, normalizedQuestion)) {
    return {
      action: "respond-local",
      response:
        "I can help only with Adarsh's portfolio and resume details. I don't process math or coding-task requests here, so your credits stay protected.",
      source: "local-credit-guard",
    }
  }

  const asksContact = hasAnyKeyword(normalizedQuestion, ["contact", "email", "phone", "linkedin", "github", "reach"])
  const asksSkills = hasAnyKeyword(normalizedQuestion, [
    "skill",
    "skills",
    "tech",
    "technologies",
    "stack",
    "language",
    "languages",
    "frontend",
    "backend",
  ])
  const asksProjects = hasAnyKeyword(normalizedQuestion, [
    "project",
    "projects",
    "built",
    "build",
    "work",
    "portfolio",
    "medichain",
    "legalease",
    "consoled",
    "shaadicrasher",
    "nickly",
  ])
  const asksEducation = hasAnyKeyword(normalizedQuestion, [
    "education",
    "college",
    "btech",
    "psit",
    "cgpa",
    "academic",
    "school",
  ])
  const asksAchievements = hasAnyKeyword(normalizedQuestion, [
    "achievement",
    "achievements",
    "certification",
    "certificate",
    "leetcode",
    "codevita",
    "hackathon",
    "dsa",
  ])
  const asksAvailability = hasAnyKeyword(normalizedQuestion, [
    "internship",
    "hire",
    "available",
    "freelance",
    "opportunity",
  ])

  if (asksContact) {
    return {
      action: "respond-local",
      response: buildContactResponse(),
      source: "local-contact",
    }
  }

  if (asksSkills) {
    return {
      action: "respond-local",
      response: buildSkillsResponse(),
      source: "local-skills",
    }
  }

  if (asksProjects) {
    return {
      action: "respond-local",
      response: buildProjectsResponse(normalizedQuestion),
      source: "local-projects",
    }
  }

  if (asksEducation && asksAchievements) {
    return {
      action: "respond-local",
      response: `${buildEducationResponse()} ${buildAchievementsResponse()}`,
      source: "local-education-achievements",
    }
  }

  if (asksEducation) {
    return {
      action: "respond-local",
      response: buildEducationResponse(),
      source: "local-education",
    }
  }

  if (asksAchievements) {
    return {
      action: "respond-local",
      response: buildAchievementsResponse(),
      source: "local-achievements",
    }
  }

  if (asksAvailability) {
    return {
      action: "respond-local",
      response:
        "Adarsh is actively looking for internship and freelance opportunities. You can contact him at 2k23.cs2312635@gmail.com or via LinkedIn: https://www.linkedin.com/in/adarshsachan01/.",
      source: "local-availability",
    }
  }

  const scoredMatches = findKnowledgeMatchesWithScores(question)

  if (scoredMatches.length > 0 && scoredMatches[0].score >= MIN_LOCAL_MATCH_SCORE) {
    return {
      action: "respond-local",
      response: buildKnowledgeMatchResponse(scoredMatches.map((match) => match.item)),
      source: "local-retrieval",
    }
  }

  if (isOutOfScopePrompt(normalizedQuestion)) {
    return {
      action: "respond-local",
      response:
        "I focus only on Adarsh's portfolio and resume. Ask me about his projects, skills, education, achievements, certifications, internships, or contact details.",
      source: "local-scope-guard",
    }
  }

  if (question.length > MAX_FALLBACK_QUESTION_LENGTH) {
    return {
      action: "respond-local",
      response:
        "Please ask a shorter portfolio question (under 320 characters). This helps keep fallback AI usage efficient.",
      source: "local-length-guard",
    }
  }

  return {
    action: "fallback-api",
    normalizedQuestion,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const message = typeof body?.message === "string" ? body.message.trim() : ""

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const localDecision = evaluateLocalQuestion(message)

    if (localDecision.action === "respond-local") {
      return NextResponse.json({
        response: localDecision.response,
        source: localDecision.source,
      })
    }

    const cachedResponse = getCachedFallbackResponse(localDecision.normalizedQuestion)
    if (cachedResponse) {
      return NextResponse.json({
        response: cachedResponse,
        source: "external-api-fallback-cache",
      })
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous"
    const rateLimit = await checkRateLimit(`chat-fallback:${ip}`)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Daily AI fallback limit reached. Ask portfolio-specific questions covered in local data, or try again later.",
        },
        { status: 429 },
      )
    }

    const fallbackResponse = await generateApiFallbackResponse(message)
    setCachedFallbackResponse(localDecision.normalizedQuestion, fallbackResponse)

    return NextResponse.json({
      response: fallbackResponse,
      source: "external-api-fallback",
    })
  } catch (error) {
    console.error("Chat route error:", error)

    return NextResponse.json(
      {
        error: "Sorry, something went wrong while processing your message. Please try again.",
      },
      { status: 500 },
    )
  }
}
