'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';
import { badges as badgeDefs } from '@/data/badges';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [language, setLanguageState] = useState('en');
  const [simpleMode, setSimpleModeState] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [selectedState, setSelectedStateState] = useState(null);
  const [progress, setProgressState] = useState({
    completedSteps: [],
    currentStep: 0,
    quizScores: {},
    badges: [],
    totalCorrectAnswers: 0
  });
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setThemeState(storage.getTheme());
    setLanguageState(storage.getLanguage());
    setSimpleModeState(storage.getSimpleMode());
    setSelectedStateState(storage.getSelectedState());
    const saved = storage.getProgress();
    if (saved) setProgressState(prev => ({ ...prev, ...saved }));
    setMounted(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('simple-mode', simpleMode);
    root.classList.toggle('high-contrast', highContrast);
  }, [theme, simpleMode, highContrast, mounted]);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    storage.saveTheme(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    storage.saveLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  const setSimpleMode = useCallback((mode) => {
    setSimpleModeState(mode);
    storage.saveSimpleMode(mode);
  }, []);

  const setSelectedState = useCallback((state) => {
    setSelectedStateState(state);
    storage.saveSelectedState(state);
  }, []);

  const t = useCallback((obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || '';
  }, [language]);

  // Progress helpers
  const completeStep = useCallback((stepId) => {
    setProgressState(prev => {
      const completed = prev.completedSteps.includes(stepId)
        ? prev.completedSteps
        : [...prev.completedSteps, stepId];
      const next = { ...prev, completedSteps: completed, currentStep: Math.max(prev.currentStep, stepId) };
      // Check badge unlocks
      const newBadges = [...(prev.badges || [])];
      badgeDefs.forEach(b => {
        if (newBadges.includes(b.id)) return;
        if (b.requirement.type === 'steps' && completed.length >= b.requirement.count) newBadges.push(b.id);
        if (b.requirement.type === 'step' && completed.includes(b.requirement.stepId)) newBadges.push(b.id);
      });
      next.badges = newBadges;
      storage.saveProgress(next);
      return next;
    });
  }, []);

  const recordQuizScore = useCallback((stepSlug, score, total) => {
    setProgressState(prev => {
      const next = {
        ...prev,
        quizScores: { ...prev.quizScores, [stepSlug]: { score, total } },
        totalCorrectAnswers: (prev.totalCorrectAnswers || 0) + score
      };
      // Check quiz badges
      const newBadges = [...(next.badges || [])];
      badgeDefs.forEach(b => {
        if (newBadges.includes(b.id)) return;
        if (b.requirement.type === 'quiz' && next.totalCorrectAnswers >= b.requirement.count) newBadges.push(b.id);
      });
      next.badges = newBadges;
      storage.saveProgress(next);
      return next;
    });
  }, []);

  const recordFullQuizScore = useCallback((score, total) => {
    setProgressState(prev => {
      const percent = (score / total) * 100;
      const newBadges = [...(prev.badges || [])];
      badgeDefs.forEach(b => {
        if (newBadges.includes(b.id)) return;
        if (b.requirement.type === 'quizScore' && percent >= b.requirement.minPercent) newBadges.push(b.id);
      });
      const next = { ...prev, badges: newBadges, fullQuizScore: { score, total } };
      storage.saveProgress(next);
      return next;
    });
  }, []);

  const progressPercent = Math.round((progress.completedSteps.length / 6) * 100);

  const value = {
    theme, setTheme, toggleTheme,
    language, setLanguage, toggleLanguage, t,
    simpleMode, setSimpleMode,
    highContrast, setHighContrast,
    selectedState, setSelectedState,
    progress, completeStep, recordQuizScore, recordFullQuizScore, progressPercent,
    mounted
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
