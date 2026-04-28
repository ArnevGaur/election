// Badge definitions for gamification
export const badges = [
  {
    id: "first-step",
    title: { en: "First Step", hi: "पहला कदम" },
    description: { en: "Completed your first journey step", hi: "अपना पहला चरण पूरा किया" },
    icon: "Footprints",
    color: "#10b981",
    requirement: { type: "steps", count: 1 }
  },
  {
    id: "first-time-voter",
    title: { en: "First-Time Voter", hi: "पहली बार मतदाता" },
    description: { en: "Completed the registration step", hi: "पंजीकरण चरण पूरा किया" },
    icon: "UserCheck",
    color: "#6366f1",
    requirement: { type: "step", stepId: 1 }
  },
  {
    id: "quiz-starter",
    title: { en: "Quiz Starter", hi: "क्विज़ स्टार्टर" },
    description: { en: "Answered your first quiz correctly", hi: "अपना पहला क्विज़ सही उत्तर दिया" },
    icon: "Zap",
    color: "#f59e0b",
    requirement: { type: "quiz", count: 1 }
  },
  {
    id: "election-enthusiast",
    title: { en: "Election Enthusiast", hi: "चुनाव उत्साही" },
    description: { en: "Completed 3 journey steps", hi: "3 चरण पूरे किए" },
    icon: "Star",
    color: "#8b5cf6",
    requirement: { type: "steps", count: 3 }
  },
  {
    id: "democracy-champion",
    title: { en: "Democracy Champion", hi: "लोकतंत्र चैंपियन" },
    description: { en: "Completed all 6 journey steps", hi: "सभी 6 चरण पूरे किए" },
    icon: "Award",
    color: "#ec4899",
    requirement: { type: "steps", count: 6 }
  },
  {
    id: "election-expert",
    title: { en: "Election Expert", hi: "चुनाव विशेषज्ञ" },
    description: { en: "Scored 80%+ on the full quiz", hi: "पूर्ण क्विज़ में 80%+ अंक" },
    icon: "GraduationCap",
    color: "#ef4444",
    requirement: { type: "quizScore", minPercent: 80 }
  }
];
