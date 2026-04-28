/**
 * Local storage helper module for persisting user progress and preferences.
 * Includes safety checks for SSR (Server-Side Rendering) environments.
 * @module storage
 */

const PREFIX = 'election-guide-';

export const storage = {
  /**
   * Retrieves and parses a JSON value from local storage.
   * @param {string} key - The storage key (without prefix)
   * @returns {any|null} The parsed value or null if not found/error
   */
  get(key) {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  },

  /**
   * Stringifies and stores a value in local storage.
   * @param {string} key - The storage key (without prefix)
   * @param {any} value - The value to store
   */
  set(key, value) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch { /* storage full or unavailable */ }
  },

  /**
   * Removes a value from local storage.
   * @param {string} key - The storage key (without prefix)
   */
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
