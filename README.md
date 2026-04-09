# Adarsh Sachan - Advanced Portfolio Website

A modern, high-performance, and secure portfolio website built with the latest Next.js features, featuring interactive components, AI integration, and production-grade security.

## 🌟 Key Features

- **🎨 Advanced UI/UX:**
  - **Floating Skills Showcase:** An interactive, responsive "orbit" layout featuring 20+ technologies with animated icons and central ring design.
  - **Live Link Previews:** Hovering over any skill card shows a live snapshot of the technology's website using Radix UI and Microlink.
  - **Fluid Animations:** Smooth entrance and hover effects powered by Framer Motion.
  - **Modern Theming:** Dark mode support with OKLCH-based theme tokens and dynamic icon inversion.

- **🛡️ Production-Grade Security:**
  - **Secure Contact Form:** Integrated with `Nodemailer` for reliable email delivery.
  - **Anti-Spoofing:** Backend-controlled identity verification; emails are sent from a secure system address with `Reply-To` mapped to the user.
  - **Bot Protection:** Hidden "Honeypot" fields to silently trap and reject spam bots.
  - **Persistent Rate Limiting:** Advanced IP-based blocking (3 requests per 24 hours) using **Upstash Redis**.
  - **Sliding Window Algorithm:** Prevents "window-jumping" spam attacks across rolling 24-hour periods.

- **🤖 AI Integration:**
  - **Gemini-Powered Chatbot:** Context-aware AI assistant to help visitors learn more about my projects and skills through natural conversation.

- **📱 Fully Responsive:** Optimized for everything from mobile phones up to Ultra-Wide desktop monitors.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router / Turbopack)
- **Styling:** Tailwind CSS / Vanilla CSS
- **Animations:** Framer Motion
- **Database (Security):** Upstash Redis
- **Email:** Nodemailer (Gmail App Passwords)
- **AI:** Google Gemini API
- **UI Components:** Radix UI (Hover Card), Lucide React (Icons)
- **Deployment:** Vercel / Netlify

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # AI Chatbot
   GEMINI_API_KEY=your_gemini_key

   # Email Configuration
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_16_digit_app_password

   # Redis Rate Limiting (Upstash)
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```
4. **Run the development server:** `npm run dev`
5. **Open [http://localhost:3000](http://localhost:3000)**

## 📋 Security Details

The contact form is protected by a multi-layer security system:
1. **Frontend Validation:** Regex email checking before submission.
2. **Honeypot:** Transparent-to-humans field that kills the request if filled by a bot.
3. **IP Rate Limit:** Any IP exceeding 3 submissions is blocked for **24 hours**. This block is persistent across Vercel serverless instances thanks to Redis.
4. **Generic Feedback:** Security messages are kept generic ("Too many requests") to avoid leaking internal logic to potential attackers.

## 📄 Contact & Links

- **LinkedIn:** [adarshsachan01](https://www.linkedin.com/in/adarshsachan01/)
- **GitHub:** [theadarsh1m](https://github.com/theadarsh1m)
- **Portfolio:** [theadarsh.vercel.app](https://theadarsh.vercel.app/)
- **Email:** 2k23.cs2312635@gmail.com
