// localStorage helpers for persisting user progress
const PREFIX = 'election-guide-';

export const storage = {
  get(key) {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  },

  set(key, value) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch { /* storage full or unavailable */ }
  },

  remove(key) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(PREFIX + key);
  },

  // Specific helpers
  getProgress() {
    return this.get('progress') || { completedSteps: [], currentStep: 0, quizScores: {}, badges: [] };
  },

  saveProgress(progress) {
    this.set('progress', progress);
  },

  getTheme() {
    return this.get('theme') || 'dark';
  },

  saveTheme(theme) {
    this.set('theme', theme);
  },

  getLanguage() {
    return this.get('language') || 'en';
  },

  saveLanguage(lang) {
    this.set('language', lang);
  },

  getSimpleMode() {
    return this.get('simpleMode') || false;
  },

  saveSimpleMode(mode) {
    this.set('simpleMode', mode);
  },

  getSelectedState() {
    return this.get('selectedState') || null;
  },

  saveSelectedState(state) {
    this.set('selectedState', state);
  }
};
