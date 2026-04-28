# Niti — Empowering India's Voters

![Niti Platform](/api/placeholder/1200/400)

Niti (derived from Sanskrit for policy or ethics) is an open-source educational platform designed to demystify the Indian democratic process. Built with first-time voters and curious citizens in mind, Niti offers an interactive and accessible journey through the entire election lifecycle.

---

## Project Overview

### Chosen Vertical
**Civic Technology & Educational Tech (EdTech)**
We chose this vertical because democratic participation is the foundation of a healthy society. However, the election process can often feel overwhelming to first-time voters. Niti bridges this gap by providing accessible, unbiased, and engaging civic education.

### Approach and Logic
Our approach is built around **interactive storytelling and micro-learning**. Instead of overwhelming users with walls of text, we broke down the complex election lifecycle into digestible, actionable modules.
* **Logic:** We mapped the user journey from pre-registration to post-election results. We utilized gamification (badges, progress tracking) to incentivize completion, and AI integration to provide instant, personalized answers to specific voter questions. 
* **Accessibility-First:** We designed the platform with strict WCAG guidelines in mind, ensuring that the information is accessible regardless of the user's technical proficiency or physical abilities.

### How the Solution Works
Niti is a client-side heavy web application built using the **Next.js App Router** and **React 19**. 
1. **Interactive Modules:** Users navigate through a visual timeline and step-by-step journey. Progress is saved locally via browser `localStorage`, allowing users to pick up where they left off without needing an account.
2. **AI Assistant:** The "Niti Assistant" chat widget connects securely to the **Google Gemini 2.0 Flash API**. It uses a highly tailored system prompt to ensure responses remain strictly educational, politically neutral, and concisely formatted.
3. **Bilingual Engine:** The entire application context wraps a translation engine that allows users to instantly toggle between English and Hindi without refreshing the page.

### Assumptions Made
During development, we made the following assumptions:
* **Information Standard:** The educational content assumes standard procedures outlined by the Election Commission of India (ECI).
* **Connectivity:** The user has an active internet connection required to interact with the AI assistant. (However, the core journey modules function gracefully even if the AI endpoint fails).
* **Target Audience:** The user possesses basic web literacy and is comfortable navigating a standard web interface.

---

## Core Features

* **Interactive Election Journey:** A guided, step-by-step module that walks users through voter registration, candidate research, and voting day procedures.
* **Bilingual Support:** Full English and Hindi localization built directly into the application context to reach a wider audience.
* **Intelligent AI Assistant:** Powered by Google Gemini 2.0 Flash, the "Niti Assistant" answers specific election queries in real-time, responding in the user's preferred language.
* **Gamification & Badges:** A built-in progress tracking system, state-based personalization, and a comprehensive quiz engine that lets users test their knowledge and unlock achievement badges.
* **Premium User Interface:** A modern "Tinted Dark" design system that utilizes CSS noise textures, multi-layered parallax gradients, and fluid micro-interactions to create a professional feel.

---

## Engineering Excellence 

This application was carefully engineered to meet rigorous technical standards across six key evaluation areas:

### 1. Testing & Reliability
* **Framework:** The testing environment is powered by Vitest and React Testing Library.
* **Coverage:** We implemented comprehensive unit testing for core utilities (like local storage persistence) and UI components to ensure stability.
* **Execution:** Tests can be run locally using the standard `npm run test` command.

### 2. Accessibility (WCAG 2.1 AA)
* **Screen Reader Support:** Full `aria-label` and `aria-expanded` attributes are integrated on all interactive elements.
* **Dynamic Content:** We use `aria-live="polite"` regions so that asynchronous AI chat responses are announced gracefully to assistive technologies.
* **Keyboard Navigation:** Explicit `focus-visible` outlines are implemented globally across all buttons and form inputs so keyboard users can navigate easily.
* **Inclusivity Tools:** The app features a built-in "High Contrast" mode, "Simple Text" mode, and Web Speech API Voice Narration.

### 3. Security Architecture
* **Content Security Policy (CSP):** Strict headers are enforced in `next.config.mjs` to mitigate Cross-Site Scripting (XSS) and other injection attacks.
* **Rate Limiting:** A custom in-memory sliding window rate limiter protects the `/api/chat/route.js` endpoint to prevent abuse of the Gemini API (capped at 10 requests per minute).
* **Sanitization:** Input sanitization regex strips potentially malicious HTML tags before they reach the language model.

### 4. Performance & Efficiency
* **Bundle Optimization:** Heavy dependencies, such as Framer Motion and the ChatWidget, are lazy-loaded using Next.js `dynamic()` imports. This drastically reduces the initial load time.
* **Asset Management:** The application leverages `next/font/google` for optimized, layout-shift-free typography.
* **Animation:** CSS `will-change` properties and hardware-accelerated transforms ensure smooth 60fps parallax animations without blocking the main thread.

### 5. Code Quality
* **Strict Linting:** We enforce strict React rules via `eslint-config-next`, ensuring absolute hook purity (for example, zero synchronous state updates in effects).
* **Documentation:** Core context providers and utility scripts are fully annotated following standard JSDoc practices.
* **State Management:** The app uses a clean, decoupled React Context architecture that separates UI state from conversational state.

### 6. Google Services Integration
* **Google Generative AI:** Deep integration with `@google/generative-ai` provides real-time, context-aware chatbot responses.
* **Google Analytics 4:** Pre-configured `@next/third-parties/google` implementation is ready for traffic analysis and user behavior tracking.

---

## Getting Started

### Prerequisites
* Node.js 18 or newer
* A valid Google Gemini API Key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/niti.git
   cd niti
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Environment Variables
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_GA_ID=your_google_analytics_measurement_id
   ```

4. Run the Development Server
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:3000

### Available Scripts
* `npm run dev` - Starts the Next.js development server.
* `npm run build` - Builds the application for production.
* `npm run lint` - Runs strict ESLint checks.
* `npm run test` - Executes the Vitest testing suite.

---

## Technology Stack

* **Framework:** Next.js (App Router)
* **Library:** React 19
* **Styling:** Tailwind CSS v4, Vanilla CSS variables
* **Animations:** Framer Motion
* **Testing:** Vitest, jsdom
* **AI Provider:** Google Gemini API
* **Icons:** Lucide React

---
*Disclaimer: Niti is a purely educational project built for hackathon evaluation and is not officially affiliated with the Election Commission of India.*
