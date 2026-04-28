import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { storage } from '../src/lib/storage';

const PREFIX = 'election-guide-';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Core methods', () => {
    it('sets and gets a value', () => {
      storage.set('testKey', { a: 1 });
      expect(localStorage.getItem(PREFIX + 'testKey')).toBe(JSON.stringify({ a: 1 }));
      expect(storage.get('testKey')).toEqual({ a: 1 });
    });

    it('returns null for missing keys', () => {
      expect(storage.get('missing')).toBeNull();
    });

    it('handles JSON parse errors gracefully', () => {
      localStorage.setItem(PREFIX + 'badData', '{bad json');
      expect(storage.get('badData')).toBeNull();
    });

    it('removes keys', () => {
      storage.set('removeMe', 123);
      storage.remove('removeMe');
      expect(storage.get('removeMe')).toBeNull();
    });
  });

  describe('Specific helpers', () => {
    it('getProgress returns defaults if empty', () => {
      expect(storage.getProgress()).toEqual({
        completedSteps: [],
        currentStep: 0,
        quizScores: {},
        badges: []
      });
    });

    it('saves and gets progress', () => {
      const prog = { completedSteps: ['1'], currentStep: 1, quizScores: {}, badges: ['first'] };
      storage.saveProgress(prog);
      expect(storage.getProgress()).toEqual(prog);
    });

    it('gets default theme as dark', () => {
      expect(storage.getTheme()).toBe('dark');
    });

    it('saves and gets theme', () => {
      storage.saveTheme('light');
      expect(storage.getTheme()).toBe('light');
    });

    it('saves and gets language', () => {
      expect(storage.getLanguage()).toBe('en');
      storage.saveLanguage('hi');
      expect(storage.getLanguage()).toBe('hi');
    });
  });
});
