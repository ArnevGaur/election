# 🗳️ Election Guide Assistant

An interactive, educational web application that helps users understand the complete election process through step-by-step guidance, AI chat, visual timelines, and gamification.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-ff69b4)

## ✨ Features

### 🗺️ Interactive Election Journey
- 6-step guided flow: Registration → Voter ID → Candidates → Voting Day → Counting → Results
- Each step includes explanations, documents needed, "Why it matters" sections, and mini quizzes
- "Explain Like I'm 10" toggle for simplified content
- Voice narration using Web Speech API

### 🤖 AI Chat Assistant
- Floating chatbot powered by Google Gemini API
- Context-aware responses based on current page
- Quick-reply chips for common questions
- Bilingual support (English/Hindi)
- Graceful fallback when API key is not configured

### 📅 Timeline Visualization
- Horizontal timeline (desktop) / Vertical timeline (mobile)
- Clickable milestone nodes with detailed explanations
- "What happens if..." simulation scenarios
- Smooth Framer Motion animations

### 🏆 Gamification
- Progress tracking with percentage completion
- Quiz section with 10 questions and explanations
- 6 achievement badges (First Step, First-Time Voter, Quiz Starter, etc.)
- All progress saved to localStorage

### 🇮🇳 State Personalization
- Select your Indian state/UT from dropdown
- View local election authority, website, helpline, and deadlines

### ♿ Accessibility
- Simple Mode (larger text, simpler layout)
- High Contrast Mode
- Dark Mode with smooth transitions
- Voice narration per step
- Mobile-first responsive design
- Bilingual: English ↔ Hindi toggle

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Google Generative AI | Chatbot (Gemini) |
| Web Speech API | Voice narration |
| localStorage | Progress persistence |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout + providers
│   ├── page.js             # Landing page
│   ├── globals.css          # Design system
│   ├── api/chat/route.js    # Gemini API proxy
│   ├── journey/page.js      # Election journey
│   ├── timeline/page.js     # Timeline visualization
│   ├── quiz/page.js         # Quiz section
│   └── about/page.js        # About + resources
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── chat/                # ChatWidget
│   ├── personalization/     # StateSelector
│   └── ui/                  # Button, Card, Toggle, Modal, Badge
├── context/
│   ├── AppContext.jsx        # Global state
│   └── ChatContext.jsx       # Chat state
├── data/
│   ├── electionSteps.js      # Journey content
│   ├── timelineEvents.js     # Timeline + scenarios
│   ├── quizQuestions.js      # Quiz bank
│   ├── stateData.js          # Indian state mock data
│   └── badges.js             # Badge definitions
├── hooks/
│   └── useVoiceNarration.js  # Speech synthesis
└── lib/
    └── storage.js            # localStorage helpers
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
cd election

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Gemini API key (optional — chat works with fallback responses)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional | Google Gemini API key for AI chat. Get one at [AI Studio](https://aistudio.google.com/app/apikey) |

## 📝 Notes

- **Non-partisan**: This project is purely educational and does not promote any political party
- **India-focused**: Content focuses on Indian elections but the architecture is designed to be scalable to any country
- **Offline-capable**: All content works without an API key; the chat uses intelligent fallback responses
- **Progress persistence**: User progress, badges, theme, and language preferences are saved in localStorage
